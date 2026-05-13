# Configuration Reference

Claude Code CLI offers flexible configuration options to customize your assistant's behavior, environment, and integrations.

## Global Configuration

The primary configuration is managed in `.claude/settings.json`, typically located in your home directory or within a specific project repository.

### Common Settings

- **`theme`**: Defines the visual theme for the terminal UI (e.g., "dark", "light").
- **`logLevel`**: Controls the verbosity of the internal logger (e.g., "debug", "info", "warn", "error").

## Environment Variables

You can also control behavior via standard environment variables:

- `CLAUDE_API_KEY`: Your Anthropic API key to authenticate requests.
- `CLAUDE_LOG_LEVEL`: Override the `logLevel` defined in `settings.json`.
- `AUTHORIZED`: Used during the package publication or specific elevated workflows.

## MCP Configuration

The Model Context Protocol (MCP) servers can be configured in a project-local file named `.mcp.json` or globally.

Example `.mcp.json`:

```json
{
  "servers": {
    "local-db": {
      "transport": "stdio",
      "command": "node",
      "args": ["path/to/mcp/server.js"]
    }
  }
}
```

This configuration tells the CLI to automatically discover and connect to external capabilities during startup.
