# Model Context Protocol (MCP)

Model Context Protocol (MCP) is a system that allows external servers to provide context, tools, and capabilities to Claude Code.

## Architecture Integration

In Claude Code, MCP is tightly integrated into the startup flow and command routing.

1. **Configuration (`mcp-config`)**: MCP servers are defined via CLI flags (`--mcp-config`), global settings, or project-local `.mcp.json` files.
2. **Discovery (`main.tsx`)**: During startup, `getClaudeCodeMcpConfigs` resolves these configurations.
3. **Connection (`services/mcp/client.ts`)**: `prefetchAllMcpResources` connects to the defined servers via standard IO (stdio) or HTTP transports.
4. **Tool Merging (`tools.ts`)**: `assembleToolPool` merges the tools exposed by MCP servers with Claude Code's built-in tools.

## Supported Capabilities from MCP

MCP servers can expose:

- **Tools**: New functions the model can call (e.g., querying a database, interacting with an API).
- **Resources**: Data sources that provide context to the model (e.g., log files, live dashboards).
- **Commands**: New slash commands (`/command`) that users can execute in the REPL.

## Enterprise and Policy Limits

Claude Code includes logic in `services/mcp/config.ts` (`filterMcpServersByPolicy`) to ensure that MCP servers comply with enterprise policies, allowing organizations to restrict or allowlist specific MCP servers.
