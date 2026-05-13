# Claude Code Tools

Tools represent the capabilities provided to the Claude model to interact with the user's environment. They are the mechanisms by which Claude Code transforms from a passive chat interface into an active, agentic coding assistant.

The tool definitions can be found in `restored-src/src/tools.ts` and the `restored-src/src/tools/` directory.

## Core Tools

The following tools are generally available to the agent (depending on configuration, environment, and user permissions):

- **`BashTool`**: Executes shell commands. This is one of the most powerful and frequently used tools. It is heavily guarded by the permission system.
- **`FileReadTool`**: Reads the contents of files from the local filesystem.
- **`FileEditTool`**: Edits local files. It often operates by applying targeted diffs or rewriting files.
- **`FileWriteTool`**: Creates and writes complete contents to new or existing files.
- **`GlobTool`**: Searches the filesystem using glob patterns to find specific files.
- **`GrepTool`**: Searches for text patterns within files using grep (or an embedded fast alternative like ugrep).

## specialized & Contextual Tools

- **`AgentTool`**: Spawns and delegates tasks to sub-agents (used for complex, multi-step operations or swarms).
- **`TaskCreateTool` / `TaskGetTool` / `TaskUpdateTool` / `TaskListTool`**: Manages internal to-do tasks and plans.
- **`TaskStopTool`**: Allows an agent to signify it has completed its assigned task.
- **`WebFetchTool`**: Fetches content from a URL.
- **`WebSearchTool`**: Performs web searches for information gathering.
- **`WebBrowserTool`**: (Feature flagged) Interacts more fully with web pages.
- **`AskUserQuestionTool`**: Explicitly stops execution to ask the user a clarifying question.
- **`SkillTool`**: Invokes specific predefined "skills" loaded from directories or plugins.
- **`LSPTool`**: Interacts with Language Server Protocols for advanced code intelligence (e.g., go-to-definition, find-references).

## Tool Selection and Permissions

Not all tools are always active. Tool availability is determined dynamically based on:

1. **Permission Context**: Users can explicitly allow or deny tools (e.g., via `--allowedTools` or `--disallowedTools` CLI flags).
2. **Environment**: Some tools are environment-specific (e.g., `REPLTool` for interactive sessions, Ant-only internal tools).
3. **Feature Flags**: Tools like `WebBrowserTool` or `WorkflowTool` may be gated by GrowthBook feature flags or environment variables.
4. **MCP (Model Context Protocol)**: External tools provided by MCP servers are merged dynamically with the built-in pool.

## The Tool Execution Flow

1. The Claude model outputs a structured Tool Use block.
2. The application intercepts the request.
3. The system checks if the tool is permitted (Step 1a check).
4. If the user is in interactive mode (and the tool is dangerous, like `BashTool`), the user is prompted to confirm or deny.
5. The tool executes its underlying logic (e.g., spawning a bash subprocess).
6. The output (stdout/stderr or file contents) is returned to the model as a Tool Result block.
