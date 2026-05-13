# CLI Reference

This document provides a comprehensive reference for configuring and running the Claude Code CLI, including environment variables, settings, and built-in local commands.

## Environment Variables

Claude Code can be configured using standard environment variables:

- `ANTHROPIC_API_KEY`: Your API key for connecting to Anthropic's models.
- `CLAUDE_LOG_LEVEL`: Adjust the internal logging level (`debug`, `info`, `warn`, `error`).

## Settings Configuration

The CLI manages settings primarily via the `.claude/settings.json` file in your repository, or user-level config files.

You can modify settings directly via the CLI:

```bash
claude config set <key> <value>
```

Settings dictate behavior like MCP server connections, theme preferences, and default tools.

## Local Commands

Local commands execute directly in the node environment (bypassing the model entirely) to perform system or CLI-level actions. They are prefixed with `/` when used inside the interactive REPL.

### Core Commands

- `/clear`: Clears the REPL output screen.
- `/cost`: Displays the cost tracking for the current session.
- `/config`: Interactive interface or sub-commands to manage your `.claude/settings.json`.
- `/help`: Shows a summary of available commands, both local and model-driven (Skills).

### Task and State Management

- `/task`: (If task tools are enabled) Interacts with the active Task system.
- `/agent`: Monitors or spawns background teammates.

_Note: Some commands are implemented as `LocalJSXCommand` types, which utilize Ink to render complex, interactive React-based UI components directly in your terminal._
