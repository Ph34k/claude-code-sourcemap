# Getting Started with Claude Code CLI

Welcome to the Getting Started tutorial for Claude Code CLI. This guide will walk you through the essential steps to install, configure, and start using Anthropic's AI assistant right from your terminal.

## Prerequisites

Before installing the Claude Code CLI, ensure you have the following software installed:

- Node.js >= 18.0.0
- npm (Node Package Manager)

## Installation

The Claude Code CLI is distributed as an npm package. You can install it globally using the following command:

```bash
npm install -g @anthropic-ai/claude-code
```

## Basic Usage

### Interactive Mode

To start an interactive session where you can converse with Claude and have it assist you with coding tasks:

```bash
claude
```

This opens an interactive terminal UI built with Ink, allowing you to ask questions, run commands, and execute tools.

### Non-Interactive (Headless) Mode

If you prefer to execute a single prompt without entering the interactive UI, you can use the `-p` flag:

```bash
claude -p "Explain the contents of src/main.tsx"
```

## First Workflow: Exploring Your Project

1. Navigate to your project directory.
2. Run `claude`.
3. Ask Claude to list the files or analyze the structure. For instance:
   > "What does this repository do? Check the README and the main source files."
4. Claude will use its tools (like `FileReadTool` or `GlobTool`) to gather information and provide you with a summary.

## Next Steps

Once you are comfortable with basic commands, check out:

- [API Reference](../api/README.md) for more details on available commands and tools.
- [Configuration Reference](../reference/configuration.md) to customize your environment.
- [MCP Architecture](../mcp/README.md) to understand how Claude connects to external tools.
