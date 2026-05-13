# Tasks API Reference

The Task API provides the core abstractions for running background processes, spawned agents, and local shell execution in Claude Code.

The main types and logic are found in `src/Task.ts`.

## Core Concepts

### Task Types

Tasks are categorized by their `TaskType`, determining how they run and what capabilities they have.

- `local_bash`: Runs a local bash shell command.
- `local_agent`: Spawns a local sub-agent.
- `remote_agent`: Interfaces with a remote agent.
- `in_process_teammate`: A teammate running in the same process space.
- `local_workflow`: Executes a local workflow script.
- `monitor_mcp`: Monitors an MCP server.
- `dream`: A specialized internal task type.

### Task Statuses

Tasks transition through a set of predefined `TaskStatus` values:

- `pending`: Task created but not yet executing.
- `running`: Task currently executing.
- `completed`: Task successfully finished.
- `failed`: Task encountered an error.
- `killed`: Task forcibly terminated.

A task is considered in a terminal state if its status is `completed`, `failed`, or `killed`.

## The `Task` Interface

A `Task` defines the executable entity that manages the lifecycle of a task process.

```typescript
export type Task = {
  name: string
  type: TaskType
  kill(taskId: string, setAppState: SetAppState): Promise<void>
}
```

## `TaskStateBase`

Every task maintains a state record, representing its current configuration and outputs.

```typescript
export type TaskStateBase = {
  id: string
  type: TaskType
  status: TaskStatus
  description: string
  toolUseId?: string
  startTime: number
  endTime?: number
  totalPausedMs?: number
  outputFile: string
  outputOffset: number
  notified: boolean
}
```

## Task Generation

Tasks are identified by a pseudo-random unique ID consisting of a prefix indicating the task type and an 8-character random string.

Example ID for a local bash task: `b4c9f1k0a`
