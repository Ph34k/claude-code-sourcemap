# Developer Workflow

This guide provides an overview of how to navigate and understand the restored source code for Claude Code CLI. Because this repository is a source-mapped restoration from a published package, understanding the directory structure is essential.

## Navigating the Restored Source

The main application code resides in `restored-src/src/`. This represents the snapshot of the `@anthropic-ai/claude-code` CLI.

### Key Directories

- **`cli/` & `entrypoints/`**: Contains the main CLI entry points. Start exploring from `main.tsx` to understand the initialization and main event loop.
- **`commands/`**: Contains all slash-commands (e.g., `/help`, `/branch`, `/cost`). Commands are divided into LocalCommands (Node.js context), LocalJSXCommands (Ink UI), and PromptCommands (Skills sent to the model).
- **`tools/`**: Defines the capabilities available to Claude (e.g., `BashTool`, `FileReadTool`). Each tool follows the `Tool` interface which governs execution and terminal UI rendering.
- **`services/`**: Core background and foundational services that power the CLI, such as telemetry/analytics, Model Context Protocol (MCP) clients, and feature managers.
- **`coordinator/` & `assistant/`**: Logic managing Agent Swarms, teammates, and the primary model interaction context.
- **`ink/` & `components/`**: React components used by the Ink renderer to build the Terminal UI.
- **`utils/`**: Shared infrastructure, parsing, and helper functions.

## Mental Model

When modifying or analyzing the code:

1. **Understand the UI boundary:** The CLI uses Ink (React for CLI). Standard `console.log` can disrupt the UI. Look for specialized logging or UI components to render output.
2. **Tools vs. Commands:** Tools provide the _model_ with capabilities to solve user requests. Commands provide the _user_ with direct controls over the CLI.
3. **Agent Delegation:** Complex tasks may be delegated by the main agent to sub-agents (Teammates). Context is often shared or explicitly copied using caching mechanisms to save tokens.

## Running the Code

Currently, this repository is intended for research and archival purposes. Native execution of the restored source requires careful resolution of dependencies and build steps which may not be fully intact without the original Anthropic monorepo context.
