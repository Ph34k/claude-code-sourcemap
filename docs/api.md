# API Documentation

Welcome to the API Documentation for Claude Code. This guide explains the core entrypoints, exported APIs, and internal services that make up the system.

## Core Entrypoints

### `main.tsx`
The primary entrypoint for the CLI application. It handles:
- **Initialization**: Command-line argument parsing and setup.
- **Bootstrapping**: Fetching user settings and loading MCP configurations.
- **Execution Mode Detection**: Determines if the session is interactive (TUI via Ink) or non-interactive/scripted (headless).

## Sub-systems and Services

### Services (`src/services/`)
- **MCP (`src/services/mcp/`)**: Manages the Model Context Protocol logic, server connections, and request handling. Allows integration with other tools seamlessly.
- **Analytics (`src/services/analytics/`)**: Handles tracking and sending analytical metrics for session diagnostics.
- **API Interfaces (`src/services/api/`)**: Central place for external API interactions (Anthropic backend APIs).

### Tools (`src/tools/`)
Contains definitions for all available built-in tools such as `Bash`, `Edit`, and synthetic output tools that enhance the CLI's capability.

## Extending the API

If you wish to add new tools or modify the core functionality, ensure you look into the `Tool` and `Task` abstractions located in the `src/` root level.

## Example usage

```typescript
import { main } from '@anthropic-ai/claude-code';

// Starts the CLI application
main();
```
