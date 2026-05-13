# Claude Code Architecture

This document describes the high-level architecture of the Claude Code sourcemap restoration project.

## Core Concepts

The system is built around several core abstractions:

1.  **Coordinator:** The central mechanism managing execution flow, routing requests, and managing state across different agents or sub-tasks.
2.  **Tasks:** Representations of work to be done. A complex instruction might be broken down into multiple discrete tasks.
3.  **Tools:** Functional units that the LLM (Claude) can invoke. These range from file system operations (read/write) to running shell commands (bash) and interacting with web services.
4.  **Skills:** Higher-level workflows or capabilities built on top of tools.
5.  **Agents:** Represent different roles or operational modes (e.g., a "Coder" agent, an "Architect" agent).
6.  **Context & State:** Mechanisms for maintaining memory (MemDir), conversation history, and project-specific onboarding data.

## Directory Structure Overview (`restored-src/src/`)

-   `main.tsx` / `setup.ts`: Entry points for the CLI. Sets up the environment, initializes Ink (the terminal UI framework), and starts the main loop.
-   `coordinator/`: Contains the logic for the Coordinator mode, managing multi-agent interactions and task delegation.
-   `tools/`: The directory where individual Tool implementations reside (e.g., `BashTool`, `FileEditTool`, `MCPTool`).
-   `commands/`: Implementations for CLI slash commands (e.g., `/help`, `/clear`).
-   `services/`: Background services providing API communication (Anthropic API), MCP (Model Context Protocol) management, telemetry, and more.
-   `tasks/`: Logic for creating, managing, and tracking Tasks.
-   `components/` & `screens/` & `ink/`: React components used by Ink to render the terminal UI.
-   `utils/`: Helper functions and common utilities used across the application.
-   `plugins/` & `skills/`: Extensible capabilities allowing the system to perform specific pre-defined actions.

## Execution Flow

1.  **Initialization:** The CLI starts, parses arguments, and initializes the state (loading `.claude.json` configuration, preparing MCP servers).
2.  **User Input:** The user provides a prompt or command.
3.  **Query Engine:** The `QueryEngine.ts` processes the input, formats it for the LLM, and manages the conversation turns.
4.  **LLM Interaction:** The prompt is sent to the Anthropic API.
5.  **Tool Execution:** If the LLM decides to use a tool, the request is intercepted, the specific tool in `tools/` is invoked, and the result is fed back into the conversation context.
6.  **Response:** The final output from the LLM (or the result of a tool execution) is rendered to the terminal via Ink components.

## Model Context Protocol (MCP) Integration

A key feature of the architecture is its deep integration with the Model Context Protocol (MCP). This allows the CLI to dynamically discover and use external tools and data sources. The `services/mcp/` directory (if present, or related MCP logic) handles the connection to MCP servers defined in the user's configuration.

## Telemetry & Cost Tracking

The system includes built-in cost tracking (`cost-tracker.ts`) to monitor token usage and provide feedback to the user regarding the expense of their queries.
