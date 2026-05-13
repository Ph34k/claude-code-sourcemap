# Claude Code Architecture & Documentation

Welcome to the documentation for the Claude Code sourcemap restoration project.

This documentation serves to explain the structure of the restored codebase, the architecture of the system, and how to navigate and use the project.

## Table of Contents

- [Architecture Guide](architecture.md): Overview of the system components, including the coordinator, tasks, agents, and overall flow.
- [Tools Reference](tools.md): Detailed information on the various tools available within the system (e.g., file manipulation, testing, web integration).
- [Developer Guide](developer-guide.md): Instructions on navigating the restored source code, understanding the CLI structure, and contribution concepts.

## Overview

The `claude-code` CLI is a complex agentic system designed to interact with a local filesystem, execute commands, and coordinate multiple AI models or agents to complete tasks. It uses an internal coordinator-worker model, along with a rich toolset (Tools and Skills) and memory systems.

The source code in this repository was extracted from the `cli.js.map` sourcemap of the `@anthropic-ai/claude-code` npm package version `2.1.88`.
