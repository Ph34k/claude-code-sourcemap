# Tools Reference

The `claude-code` CLI is equipped with a vast array of tools that the language model can invoke to interact with its environment, manage tasks, and gather information.

These tools are located in the `restored-src/src/tools/` directory.

## File System & Search Tools

These tools allow the agent to explore and modify the local file system.

-   **`BashTool` / `PowerShellTool`**: Execute arbitrary shell commands in a persistent session. Crucial for building, testing, and interacting with Git.
-   **`FileReadTool`**: Read the contents of a specific file.
-   **`FileWriteTool`**: Create a new file or overwrite an existing one entirely.
-   **`FileEditTool`**: Perform targeted search-and-replace operations within an existing file. Uses a diff-like format.
-   **`GlobTool`**: Find files matching a specific glob pattern within a directory.
-   **`GrepTool`**: Search for specific text patterns across files.
-   **`NotebookEditTool`**: Specialized tool for modifying Jupyter notebooks.

## Task & State Management

Tools for managing the agent's internal task list and operational modes.

-   **`TaskCreateTool`, `TaskGetTool`, `TaskListTool`, `TaskUpdateTool`, `TaskStopTool`**: A suite of tools for the agent to break down complex instructions into manageable, trackable sub-tasks.
-   **`EnterPlanModeTool`, `ExitPlanModeTool`**: Toggle the agent between a planning phase (where it outlines steps) and an execution phase.
-   **`EnterWorktreeTool`, `ExitWorktreeTool`**: Tools for managing isolated workspaces (git worktrees) to avoid disrupting the main branch while experimenting.

## Network & External Integration

Tools for gathering information from the web or other external services.

-   **`WebFetchTool`**: Fetch and extract text content from a given URL.
-   **`WebSearchTool`**: Perform a web search to find up-to-date information.

## Model Context Protocol (MCP)

These tools facilitate interaction with external tools and data sources defined via the Model Context Protocol.

-   **`MCPTool`**: A generic wrapper to invoke an external tool exposed by an MCP server.
-   **`ListMcpResourcesTool`**: List resources available through connected MCP servers.
-   **`ReadMcpResourceTool`**: Read the contents of a specific MCP resource.
-   **`McpAuthTool`**: Handle authentication flows for MCP servers that require it.

## Communication & Interaction

Tools for interacting with the user or other agents.

-   **`AskUserQuestionTool`**: Explicitly prompt the human user for input, clarification, or approval before proceeding.
-   **`AgentTool`, `TeamCreateTool`, `TeamDeleteTool`**: Tools used in coordinator mode to spawn sub-agents or create teams of agents to tackle specific parts of a problem.
-   **`SendMessageTool`**: Send messages to other agents or output.

## Miscellaneous

-   **`ConfigTool`**: Manage CLI configuration settings.
-   **`LSPTool`**: Interact with Language Server Protocols to get intelligent code analysis (definitions, references, diagnostics).
-   **`REPLTool`**: Execute code in a Read-Eval-Print Loop for quick testing (e.g., Python or Node.js).
-   **`SkillTool`**: Invoke higher-level, pre-defined "skills".
-   **`SleepTool`**: Pause execution for a specified duration.
-   **`ToolSearchTool`**: Allows the agent to search the available tools if it's unsure which one to use.
