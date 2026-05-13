# Claude Code Architecture

Claude Code is an agentic coding tool that lives in the terminal, built by Anthropic. It uses Claude to understand codebases, edit files, and execute terminal commands.

## Code Organization

The source code (restored from source maps in `restored-src/src/`) is organized into several key modules:

- **CLI & Core (`main.tsx`, `cli/`)**: Handles startup, parsing flags, checking environment variables, and establishing the main runloop.
- **Commands (`commands/`, `commands.ts`)**: Defines interactive slash-commands (e.g., `/help`, `/login`, `/cost`, `/status`, `/clear`, `/compact`). Commands can be user-facing or internal.
- **Tools (`tools/`, `tools.ts`)**: Defines the capabilities given to the Claude agent (e.g., `BashTool`, `FileEditTool`, `FileReadTool`, `AgentTool`, `WebFetchTool`).
- **Coordinator & Agent (`coordinator/`, `assistant/`)**: Manages sub-agents and cooperative task execution (Swarms).
- **Plugins & Skills (`plugins/`, `skills/`)**: Dynamic loading of external capabilities.
- **Services (`services/`)**: Background services, including API abstraction, Model Context Protocol (MCP) clients, telemetry, and rate-limiting.
- **Utils (`utils/`)**: General helper functions for FS, formatting, git operations, shell abstractions.

## How it works

1. **Initialization:** On startup, the CLI checks authentication (e.g., Anthropic API keys or OAuth), loads settings, and initializes telemetry and local permissions.
2. **Context Gathering:** It assesses the local directory, reads `CLAUDE.md` if present, gathers `git` information, and formulates the initial system prompt.
3. **Agent Loop:** The user inputs a prompt or a command. Commands are executed immediately locally. Prompts are passed to Claude alongside the defined **Tools**.
4. **Tool Execution:** When Claude wants to run a shell command or read/edit a file, it issues a Tool call. The application intercepts it, applies permission checks (e.g., Auto Mode vs Interactive Confirmation), executes the action, and returns the result to the model.

## Model Context Protocol (MCP)

Claude Code supports integrating with external Model Context Protocol (MCP) servers. The architecture parses `mcp.json` or command-line flags and merges MCP-provided tools with the built-in system tools.

## Extensibility

- **Skills:** Additional prompt-based capabilities or custom system prompts.
- **Workflows:** Bundled or user-defined sequences.
- **Plugins:** External additions extending local capabilities.
