# Plugins and Skills

Claude Code is designed to be highly extensible. The architecture relies on an integrated system of Plugins, Skills, and Tools that can be expanded easily.

## Overview

- **Tools** give the model specific abilities (like reading files or running bash).
- **Skills** (also known as `PromptCommand`s) are predefined sets of instructions and prompt templates that help the model perform common workflows using its tools.
- **Plugins** are modules that bundle custom Commands, Tools, and Skills to provide specialized capabilities (e.g., framework-specific integrations).

## Skills

A Skill acts as an alias or shortcut for a complex model prompt. When a user runs a skill (e.g., `/refactor`), the CLI intercepts it and wraps the user's intent into a structured system prompt, often pointing the model toward using specific tools.

### Skill Anatomy

```typescript
type PromptCommand = {
  type: "prompt";
  progressMessage: string; // The message displayed in the UI while executing
  contentLength: number;
  context?: "inline" | "fork";
  getPromptForCommand(
    args: string,
    context: ToolUseContext,
  ): Promise<ContentBlockParam[]>;
};
```

When writing a skill, you define how to translate the user's input (`args`) and the current CLI state (`ToolUseContext`) into a `ContentBlockParam[]` that Anthropic's model API understands.

## Plugins

Plugins are a way to bundle tools and skills. While the `restored-src` implies a plugin system structure (`src/plugins/`), the primary mechanism for robust, external extensibility in Claude Code is the **Model Context Protocol (MCP)**.

For custom internal features, a plugin is typically implemented as an object that registers itself into the global command and tool pools during startup in `main.tsx`.

## Teammate Agents

An advanced architectural feature connected to skills is the Teammate (Sub-agent) model. The `AgentTool` allows the primary instance of Claude to spawn a separate, isolated context (with its own prompt and constrained toolset) to accomplish sub-tasks. Skills can be designed to heavily utilize these teammates to delegate code review, test generation, or specific framework debugging.
