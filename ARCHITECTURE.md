# Architecture Guide

This document provides a high-level overview of the Claude Code architecture and its sub-systems.

## Overview

Claude Code is structured as a terminal-based AI assistant. It integrates a rich CLI experience with background coordinating systems to provide an agentic feel.

### Key Components

1. **CLI / TUI Layer**
   The application extensively uses `Ink` (React for CLIs) to render a robust terminal user interface. The primary entrypoint `main.tsx` initializes this view.

2. **Coordinator and Assistant Systems**
   - **Coordinator (`src/coordinator/`)**: Handles multi-agent and complex workflows where tasks are delegated and combined.
   - **Assistant (`src/assistant/`)**: Manages the KAIROS conversational assistant functionality, processing messages and forming agent replies.

3. **MCP Integration**
   - **`src/services/mcp/`**: Implements the **Model Context Protocol**, making Claude Code extensible. This allows dynamic integration of external tools by fetching available MCP configuration locally or from an enterprise registry.

4. **Skills and Plugins**
   - **`src/skills/` & `src/plugins/`**: Built-in mechanisms that inject new commands and features into the CLI. They are modularized and dynamically discovered during the bootstrap phase.

5. **State and Context**
   - **`src/state/` & `src/context/`**: Manage the session state, historical interactions, telemetry, and environment variable overrides securely.

## Execution Flow

1. **Bootstrap (`src/bootstrap/` & `main.tsx`)**: Resolves configurations, permissions, and validates API states.
2. **Setup (`setup.ts`)**: Binds tools, pre-fetches commands and establishes the environment structure (e.g., git context).
3. **Execution**: Based on the flag (`-p` / `--print`), it launches a full Ink UI or executes headless logic directly.
4. **Cleanup (`cleanupRegistry.ts`)**: On exit or crash, resources like spawned tool shells and event handlers are safely terminated.

## Future Extensibility

Adding new capabilities generally involves implementing a new `Tool` or a `Skill`, modifying the context injection loop, or providing a new MCP server.
