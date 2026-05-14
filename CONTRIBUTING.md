# Contributing Guide

First off, thank you for considering contributing to Claude Code! This guide explains the developer workflow, setting up the environment, and guidelines for contributing code and documentation.

## Developer Workflow

### Prerequisites

Ensure you have the following installed:
- **Node.js**: (Version >=18.0.0 is recommended, matching `package.json`).
- **npm / yarn**: For package management.

### Setup

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd claude-code
   ```
2. Install dependencies:
   ```bash
   cd package
   npm install
   ```

## Development Cycle

1. **Create a branch**: Please create a new branch from `main` or the root branch.
2. **Make your changes**: Write clear and descriptive commit messages.
3. **Write tests**: Make sure all tests pass and your code is covered.

## Documentation Guidelines

- **Keep it up-to-date**: Update related documentation when changing API behavior or CLI arguments.
- **Clear Examples**: Ensure that any code snippets provided are tested and accurate.
- **Linting**: If available, run Markdown linters on any changed `.md` files.

## Submitting a Pull Request

1. Push your changes to your fork.
2. Submit a Pull Request targeting the primary branch.
3. Request a review from maintaining engineers.
4. Ensure CI checks (if any) pass successfully.

Thank you for contributing!
