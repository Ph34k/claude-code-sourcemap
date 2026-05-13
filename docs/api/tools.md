# Tool API Reference

Tools provide the model with its capabilities (reading files, running bash, etc.).

The `Tool` interface is defined in `src/Tool.ts`.

## The `Tool` Interface

A `Tool` defines how Claude interacts with the system. It handles input validation, execution, and rendering of the result in the terminal UI.

```typescript
export type Tool<Input = AnyObject, Output = unknown, P = ToolProgressData> = {
  name: string
  aliases?: string[]

  // Defines the expected arguments from the model
  readonly inputSchema: Input

  // The actual execution logic of the tool
  call(args: z.infer<Input>, context: ToolUseContext, canUseTool: CanUseToolFn, parentMessage: AssistantMessage, onProgress?: ToolCallProgress<P>): Promise<ToolResult<Output>>

  // A natural language description of what the tool does, injected into the system prompt
  description(input: z.infer<Input>, options: { ... }): Promise<string>

  // Checks if the tool should be available
  isEnabled(): boolean

  // Security and concurrency flags
  isConcurrencySafe(input: z.infer<Input>): boolean
  isReadOnly(input: z.infer<Input>): boolean
  isDestructive?(input: z.infer<Input>): boolean

  // UI Rendering functions (for the Ink REPL)
  renderToolUseMessage(input: Partial<z.infer<Input>>, options: { ... }): React.ReactNode
  renderToolResultMessage?(content: Output, progressMessagesForMessage: ProgressMessage<P>[], options: { ... }): React.ReactNode

  // ... and many other lifecycle methods
}
```

## Tool Assembly (`tools.ts`)

The `getTools(permissionContext)` function returns the active set of built-in tools based on the current context (e.g., headless mode vs REPL mode).

The `assembleToolPool(permissionContext, mcpTools)` function creates the final deduplicated list of tools sent to the model, merging built-in tools and tools provided via MCP servers.
