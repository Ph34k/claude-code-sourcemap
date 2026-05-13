# Core Services API

The Claude Code CLI relies on a set of foundational services located in `restored-src/src/services/`. These services manage telemetry, long-running agent tasks, documentation generation, and integrations with external contexts.

## Key Services

### `analytics`

The Analytics Service handles event logging across the CLI.

- **Purpose:** Centralized queuing and dispatch of telemetry events.
- **Design:** Implemented with zero dependencies to avoid import cycles during startup. Events generated early in the CLI lifecycle are queued and drained asynchronously via `queueMicrotask` once `attachAnalyticsSink` is called.
- **Privacy:** Includes explicit marker types (`AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS`) to force developers to verify that sensitive code or file paths are not accidentally sent. It also filters PII data based on strict column routing logic.

### `AgentSummary`

The Agent Summary Service is responsible for monitoring long-running sub-agents.

- **Purpose:** Periodic background summarization for coordinator-mode sub-agents (Teammates).
- **Execution:** It forks the sub-agent's conversation every ~30 seconds using `runForkedAgent()`.
- **Output:** It prompts the model to generate a very short (3-5 word) present-tense action description (e.g., "Reading runAgent.ts"). This summary updates the UI in real-time, providing visibility into the sub-agent's progress.

### `MagicDocs`

The Magic Docs Service automatically maintains documentation files based on conversation context.

- **Purpose:** Keeps markdown files updated with new learnings from the developer's conversation with Claude.
- **Activation:** It detects a special header (`# MAGIC DOC: [title]`) when files are read via the `FileReadTool`.
- **Execution:** Uses a post-sampling hook (`registerPostSamplingHook`). When the CLI is idle (no tool calls in the last turn), it spins up a background agent restricted exclusively to the `FILE_EDIT_TOOL_NAME` to silently update the tracked documents with the newly discussed context.
