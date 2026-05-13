# Contributing

Thank you for your interest in contributing! This document outlines the standard workflows for modifying or extending the documentation and codebase.

> **Note**: This repository represents a source-map restored snapshot of the `@anthropic-ai/claude-code` package. Any contributions should keep in mind that the original source of truth is maintained internally by Anthropic.

## Pull Request Guidelines

1. **Keep it focused**: PRs should address a single issue or implement a single feature.
2. **Commit Messages**: Use clear, descriptive commit messages.
3. **Tests**: When appropriate, include test cases or update documentation to reflect the changes.

## Documentation Guidelines

We strive for clear, concise, and accurate documentation. When adding to the `docs/` folder, please ensure:

- Proper Markdown formatting.
- The tone is professional and developer-friendly.
- Links to internal files (e.g., API references) are correctly resolved.

## Code Formatting

This project enforces strict code styling using Prettier. Before submitting a PR, ensure you format your files:

```bash
npx prettier --write "**/*.md"
```

## Running Local Builds

Currently, the source code is a snapshot located in `restored-src/src`. Ensure that any architectural observations or edits correctly reference the snapshot structure rather than standard Anthropic repositories.
