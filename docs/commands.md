# Claude Code Commands

Commands in Claude Code are interactive slash-commands (e.g., `/help`, `/login`) that users can type in the interactive REPL. Unlike tools (which are used by the AI model), commands are executed directly by the application on behalf of the user.

Command definitions are managed centrally in `restored-src/src/commands.ts` and implemented in the `restored-src/src/commands/` directory.

## Core User Commands

These are standard commands available in most local interactive sessions:

- `/help` - Displays help information about available commands and usage.
- `/clear` - Clears the current terminal screen or session transcript.
- `/cost` - Displays the accumulated cost of API calls in the current session.
- `/status` - Shows the status of the current environment (e.g., Git status, working directory).
- `/compact` - Compresses or truncates the session transcript to save tokens.
- `/copy` - Copies the last model output to the system clipboard.
- `/config` - Opens or edits the local/global configuration settings.
- `/theme` - Changes the UI theme of the terminal interface.
- `/login` / `/logout` - Manages authentication with the Anthropic API or other providers.

## Session & Environment Commands

- `/session` - Shows details about the current session (e.g., Session ID, URL for remote access).
- `/resume` - Resumes a previous session by ID.
- `/model` - Changes the underlying AI model for the current session.
- `/mcp` - Manages Model Context Protocol (MCP) servers (e.g., adding or removing server connections).
- `/files` - Lists tracked files in the current context.

## Specialized / Workflow Commands

Depending on features flags and user type (e.g., internal developers vs external users), other commands might be enabled:

- `/review` / `/ultrareview` - Triggers a codebase or PR review.
- `/plan` - Toggles "plan mode" (where Claude thinks and outlines steps without executing tools).
- `/ide` - Integrates with or opens a local IDE.
- `/doctor` - Runs diagnostics on the local environment.
- `/release-notes` - Shows recent updates to the CLI.

## Command Execution

When a user types a message starting with `/` (e.g., `/cost`), the REPL intercepts it. It looks up the command in the memoized command registry (which merges built-in commands, dynamic skills, plugin commands, and workflows). If found, the command's local action runs immediately. If it's a "prompt" type command (a Skill), its defined prompt text is injected into the conversation and sent to the model.
