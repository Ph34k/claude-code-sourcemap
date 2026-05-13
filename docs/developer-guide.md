# Developer Guide

This guide is intended for developers who wish to explore, understand, or build upon the restored `claude-code` sourcemap codebase.

## Prerequisites

-   **Node.js**: The project relies heavily on modern Node.js features.
-   **TypeScript**: The source is written in TypeScript. A solid understanding of TS types, interfaces, and asynchronous programming is required.
-   **React & Ink**: The terminal UI is built using [Ink](https://github.com/vadimdemedes/ink), a React renderer for building CLI apps. Familiarity with React hooks (`useState`, `useEffect`, `useContext`) is essential for understanding the UI layer.

## Navigating the Codebase

The primary entry point is `restored-src/src/main.tsx`. This file initializes the application state, sets up the telemetry, and mounts the root Ink component (`<App />` or similar).

### Key Subsystems to Explore

1.  **The Main Loop (`query.ts` / `QueryEngine.ts`)**: Look here to understand how a user prompt is processed, sent to the LLM, and how tool calls are intercepted and executed. This is the heart of the agentic loop.
2.  **Tool Implementation (`tools/`)**: If you want to understand how a specific capability works (e.g., how the agent runs bash commands), look at the corresponding file in `tools/` (e.g., `BashTool.ts`). Notice how tools define their input schemas using `zod` and implement an `execute` function.
3.  **Terminal UI (`components/`)**: Explore this directory to see how Ink is used to render interactive elements like progress spinners, markdown output, and input prompts in the terminal.

## Understanding the Build Process (Context)

It is important to remember the origin of this code:

1.  This is a **restoration** from a sourcemap (`cli.js.map`).
2.  The original code was likely bundled using a tool like esbuild or Webpack before being published to npm.
3.  The restored code in `restored-src/src/` represents the *original source files* as they existed before bundling, preserving file structure and TypeScript typing.

Because this is a restored snapshot, there is no provided build script (e.g., `npm run build`) to re-compile this source back into a working executable in this specific repository structure. The purpose of this repository is primarily educational and for analysis.

## Extending the System (Conceptual)

If you were to adapt this code for your own use, the most common areas of extension would be:

-   **Adding New Tools**: Create a new file in `tools/`, define the Zod schema for its arguments, implement the execution logic, and register it with the main tool registry.
-   **Creating MCP Servers**: Instead of building tools directly into the CLI, you can build external MCP servers (in any language) and configure the CLI to connect to them. This is the recommended approach for extending capabilities.
-   **Customizing the Prompt (`prompts/` or inline)**: The behavior of the agent is heavily influenced by its system prompt. Modifying this prompt can change its persona or operational constraints.
