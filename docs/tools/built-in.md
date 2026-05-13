# Built-in Tools

Claude Code comes with a comprehensive set of built-in tools (found in `src/tools.ts`) that form the foundation of its capabilities.

## System & OS Interaction

- **`BashTool`**: Executes commands in a stateful Bash shell.
- **`FileReadTool`**: Reads the contents of files from the filesystem.
- **`FileEditTool`**: Performs targeted edits on files using a search-and-replace block format.
- **`FileWriteTool`**: Creates or overwrites files entirely.
- **`GlobTool`**: Searches for files by path patterns (often aliased to fast native tools like `bfs` if available).
- **`GrepTool`**: Searches for text within files across the repository (often aliased to `ugrep` or `ripgrep`).

## Delegation & Planning

- **`AgentTool`**: Spawns a sub-agent (teammate) with specific instructions and context to solve sub-tasks.
- **`TaskCreateTool` / `TaskGetTool` / `TaskUpdateTool`**: Manages explicit Todo/Task lists for the model to keep track of its goals.
- **`EnterPlanModeTool` / `ExitPlanModeV2Tool`**: Toggles planning mode to outline steps before execution.
- **`TaskStopTool`**: Signals that an assigned task or sub-task has been completed or failed.

## Task & Task Tracking

- **`TaskCreateTool`**: Creates a new task.
- **`TaskGetTool`**: Gets information about a specific task.
- **`TaskListTool`**: Lists all active tasks.
- **`TaskUpdateTool`**: Updates an existing task.
- **`TaskOutputTool`**: Manages the output of a task.
- **`TaskStopTool`**: Signals that an assigned task or sub-task has been completed or failed.
- **`TodoWriteTool`**: Tool for managing quick to-dos.

## Connectivity & Context

- **`WebFetchTool`**: Fetches content from URLs.
- **`WebSearchTool`**: Searches the web for information (if enabled/configured).
- **`AskUserQuestionTool`**: Pauses execution to explicitly ask the user for input or clarification.

## Specialized / Environment Specific

- **`BriefTool`**: Tool for creating summaries or briefs.
- **`ConfigTool`**: Tool for updating Claude Code configuration.
- **`NotebookEditTool`**: Specialized tool for editing Jupyter notebooks.
- **`PowerShellTool`**: Tool for executing PowerShell commands (Windows environments).
- **`REPLTool`**: A tool available when Claude runs inside an interactive REPL environment.
- **`LSPTool`**: Integrates with Language Server Protocols to provide code intelligence to the model.
- **`EnterWorktreeTool` / `ExitWorktreeTool`**: Manages git worktrees for safe, isolated code modifications.

## MCP Integrations

- **`MCPTool`**: Core tool for Model Context Protocol integrations.
- **`McpAuthTool`**: Handles authentication for MCP servers.
- **`ListMcpResourcesTool`**: Lists resources available from connected MCP servers.
- **`ReadMcpResourceTool`**: Reads resources from connected MCP servers.
