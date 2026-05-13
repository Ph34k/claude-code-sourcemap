# Context API Reference

The Context API provides the shared state, initialization, and environment details injected into the model's system and user prompts during the execution of Claude Code.

The context definitions are located in `src/context.ts`.

## Core System Context

The system context represents static or slowly changing information about the environment.

### `getSystemContext()`

This function generates context that is prepended to each conversation and cached for the duration of the conversation.

It provides:
- **Git Status (`getGitStatus()`)**: A snapshot of the current Git repository state, including:
  - Current branch
  - Default/Main branch
  - Git user name
  - Commit log (`--oneline -n 5`)
  - A truncated (max 2000 chars) output of `git status --short`.
- **System Prompt Injections**: Experimental cache-breaking mechanisms.

## Core User Context

The user context provides the model with localized awareness about the project specifics.

### `getUserContext()`

This function provides the dynamic context that includes user-provided documentation and temporal awareness.

It provides:
- **Project Specific Documents (`getClaudeMds()`)**: Discovers, reads, and parses `.claude.md` or similar markdown instructional files present in the current project repository. These act as custom instructions for the model on a per-project basis.
- **Current Date**: Exposes the system's current localized date to give the model temporal awareness (`Today's date is ...`).
