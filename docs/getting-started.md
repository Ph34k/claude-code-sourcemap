# Getting Started

Welcome to Claude Code! This guide will help you get started with the CLI assistant right from your terminal.

## Installation

As this repository is a source-mapped snapshot of `@anthropic-ai/claude-code`, the official way to install the tool (if you have access) is via npm:

```bash
npm install -g @anthropic-ai/claude-code
```

## Basic Usage

You can start an interactive session by simply running:

```bash
claude
```

This command will boot up the Ink-based REPL (Read-Eval-Print Loop) UI, where you can chat with Claude, ask questions about your codebase, and execute commands.

### Headless Mode

If you want to use Claude Code in scripts or non-interactive environments, use the `-p` (prompt) flag:

```bash
claude -p "Explain the contents of src/main.tsx"
```

## First Commands

Once inside the interactive session, try these basic commands to get familiar with the system:

- `/help` - View a list of available local and prompt commands.
- `/clear` - Clear the current terminal session.
- `/cost` - View cost tracking metrics for the current session.
- `/config` - Manage your CLI configuration.

## Next Steps

Now that you've started using Claude Code, check out the following guides to learn more:

- [API and Tool Reference](./api/README.md) - Learn what tools are available to the model.
- [CLI Reference](./cli-reference.md) - Deep dive into environment variables and local commands.
- [Plugins and Skills](./plugins-and-skills.md) - Learn how the system's architecture supports extensibility.
