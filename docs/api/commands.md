# Command API Reference

Commands in Claude Code define how user input (often prefixed with `/`) is routed and executed.

The core type for a command is `Command` (found in `src/types/command.ts`), which is a union of `PromptCommand`, `LocalCommand`, and `LocalJSXCommand`.

## `CommandBase`

Every command implements `CommandBase`, which contains metadata about the command:

```typescript
type CommandBase = {
  name: string;
  description: string;
  aliases?: string[];
  isEnabled?: () => boolean;
  isHidden?: boolean;
  availability?: CommandAvailability[];
  userFacingName?: () => string;
  // ... other metadata
};
```

## Command Types

### 1. `PromptCommand`

These commands (often called **Skills**) expand into prompts that are sent to the AI model. They instruct the model to perform a specific action using its tools.

```typescript
type PromptCommand = {
  type: "prompt";
  progressMessage: string;
  contentLength: number;
  context?: "inline" | "fork";
  getPromptForCommand(
    args: string,
    context: ToolUseContext,
  ): Promise<ContentBlockParam[]>;
  // ...
};
```

### 2. `LocalCommand`

These commands execute traditional code (TypeScript/Node) in the local environment and return text or state modifications, bypassing the AI model entirely.

```typescript
type LocalCommand = {
  type: "local";
  load: () => Promise<{
    call: (
      args: string,
      context: LocalJSXCommandContext,
    ) => Promise<LocalCommandResult>;
  }>;
};
```

### 3. `LocalJSXCommand`

These commands execute local code but render an interactive User Interface in the terminal using the `Ink` React framework.

```typescript
type LocalJSXCommand = {
  type: "local-jsx";
  load: () => Promise<{
    call: (
      onDone: LocalJSXCommandOnDone,
      context: ToolUseContext & LocalJSXCommandContext,
      args: string,
    ) => Promise<React.ReactNode>;
  }>;
};
```

## Command Registration

Commands are gathered and memoized in `src/commands.ts`. The `getCommands(cwd)` function merges built-in commands, dynamic skills, and plugin/MCP commands into a single pool used by the REPL typeahead and routing logic.
