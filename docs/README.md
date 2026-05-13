# Claude Code CLI Documentation

Welcome to the documentation for the Claude Code CLI, Anthropic's AI assistant right from your terminal.

This documentation is derived from a source-map restored snapshot of the `@anthropic-ai/claude-code` package (version 2.1.88).

## Overview

Claude Code can understand your codebase, edit files, run terminal commands, and handle entire workflows for you. It relies on a robust architecture featuring:

- An Agent Swarm / Teammate model for delegation.
- A Tool-based execution environment (Read, Edit, Execute Bash).
- Model Context Protocol (MCP) integrations for connecting external services and workflows.

## Table of Contents

- [Getting Started](./tutorials/getting-started.md)
- [Architecture & Design](./architecture.md)
- [Configuration Reference](./reference/configuration.md)
- [API Reference](./api/README.md)
  - [Commands API](./api/commands.md)
  - [Tools API](./api/tools.md)
- [Available Tools](./tools/built-in.md)
- [Model Context Protocol (MCP)](./mcp/README.md)
- [Contributing](./contributing.md)

## Starting a session

To start an interactive session:

```bash
claude
```

For non-interactive or scripted output:

```bash
claude -p "Your prompt here"
```

## Contributing

Since this is a snapshot repository, any contributions should take into account that the actual source control is managed by Anthropic.
