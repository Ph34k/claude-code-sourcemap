# Claude Code Architecture

The architecture of Claude Code relies on a few central concepts working in tandem to provide a reliable terminal-based AI assistant.

## Core Concepts

### Agents and Swarms (Teammates)

The CLI operates heavily on the concept of Agents. An Agent is a bounded context where Claude operates, often with specific sets of tools, system prompts, and memory.
The architecture allows for **Teammates** (Agent Swarms), enabling the primary agent to delegate tasks to sub-agents (e.g., creating a specialized agent for code review or testing).

### Tool Pool

Tools are the capabilities provided to the Model.
The main tool pool is assembled during startup, combining:

- **Built-in tools:** Primitive OS capabilities like `BashTool`, `FileReadTool`, `FileEditTool`.
- **Specialized internal tools:** `AgentTool` (for spawning teammates), `SleepTool`, `TaskOutputTool`.
- **MCP Tools:** Dynamically loaded tools from connected Model Context Protocol servers.

### Command Routing

User interaction via the terminal is routed through `commands`.
Commands can be:

- **Prompt Commands:** Executed by the model (e.g., skills).
- **Local Commands:** Executed directly by the Node/Bun environment (e.g., `/clear`, `/cost`, `/config`).
- **Local JSX Commands:** Commands that render complex interactive UI components using Ink (a React renderer for terminals).

## The Agent Swarm Coordinator

In `src/coordinator/`, the system defines the rules for how Agents interact. When a user requests a complex task, the primary Agent can use the `AgentTool` to spawn a "Teammate".

1. **Isolation:** Each Teammate gets its own isolated prompt loop, system context, and task definition.
2. **Delegation:** The parent Agent pauses its primary loop and waits for the Teammate to either complete the task, request clarification, or fail.
3. **Tool Sharing:** Permissions can be explicitly passed down. For example, a "read-only" research Agent might not be granted the `FileEditTool` or `BashTool`.

## Prompt Execution Flow

The core loop of Claude Code relies on standard language model interactions, highly optimized for tool use.

1. **User Input:** A prompt or command is entered.
2. **System Prompt Assembly:** `main.tsx` and context providers build a dense system prompt containing tool schemas, current git status, and OS environment details.
3. **Model Generation:** Anthropic's Claude generates a response. If it includes a `tool_use` block, the CLI parses it.
4. **Tool Execution:** The specific Tool (`call()` method) is executed in the local environment (e.g., executing a bash command).
5. **Feedback Loop:** The `tool_result` is appended to the message history, and control is passed back to the model to evaluate the result and determine the next steps.

## Startup Flow (`main.tsx`)

1. **Environment Setup:** Profile checkpoints, configuration parsing, pre-fetching of system context (like git status).
2. **Settings Resolution:** Load configuration from `.claude/settings.json`, environment variables, and CLI flags.
3. **MCP Configuration:** Discover and establish connections to MCP servers.
4. **Tool Permission Context:** Establish the security boundaries (which tools are allowed/denied).
5. **Session Initiation:** Boot up the Ink-based REPL UI or process a single headless query.
