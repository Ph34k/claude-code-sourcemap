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

## Available Built-in Commands

While Claude Code is highly extensible, the core system provides a rich set of built-in commands. You can find these organized in `src/commands/`.

### Core REPL & Utility Commands

- **`/clear`**: Clears the REPL terminal.
- **`/help`**: Shows available commands and help information.
- **`/exit`**: Exits the Claude Code session.
- **`/cost`**, **`/usage`**, **`/stats`**: Provides session cost, token usage, and telemetry statistics.
- **`/config`**, **`/theme`**, **`/color`**, **`/output-style`**: Manages UI and configuration preferences.
- **`/version`**, **`/upgrade`**: Checks or manages the CLI version.
- **`/release-notes`**: Displays release notes.

### AI & Agent Operations

- **`/agents`**: Interface for interacting with active background agents (teammates).
- **`/plan`**, **`/ultraplan`**: Initiates or visualizes complex planning modes.
- **`/review`**, **`/security-review`**: Triggers code review operations.
- **`/skills`**: Lists and manages installed Prompt Commands (Skills).
- **`/model`**: Switches the active underlying Claude model.
- **`/thinkback`**, **`/thinkback-play`**: Advanced debugging or playback for session history.

### Repository & File System Commands

- **`/files`**: Interactive UI for browsing and selecting files.
- **`/diff`**: Shows current repository diff.
- **`/branch`**, **`/commit`**, **`/commit-push-pr`**: Integrated Git operations.
- **`/add-dir`**: Command for adding directories to the current context.

### Integration & Plugin Commands

- **`/mcp`**: Manages Model Context Protocol servers.
- **`/plugin`**, **`/reload-plugins`**: Manages Claude Code plugins.
- **`/login`**, **`/logout`**, **`/oauth-refresh`**: Handles authentication with Anthropic and external services.
- **`/install-github-app`**, **`/install-slack-app`**: Integrates with external platforms.

_Note: For the full up-to-date list of commands, you can always use the `/help` command inside the CLI._
