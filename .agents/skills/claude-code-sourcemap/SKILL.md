```markdown
# claude-code-sourcemap Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `claude-code-sourcemap` TypeScript repository. It covers file organization, code style, commit message standards, and testing approaches to ensure consistency and maintainability across the codebase.

## Coding Conventions

### File Naming
- Use **camelCase** for all file names.
  - Example: `sourceMapParser.ts`, `generateMappings.ts`

### Imports
- Use **relative import paths** for modules within the repository.
  - Example:
    ```typescript
    import { parseSourceMap } from './sourceMapParser';
    ```

### Exports
- Use **named exports** for all modules.
  - Example:
    ```typescript
    export function generateMappings(...) { ... }
    export const SOURCE_MAP_VERSION = 3;
    ```

### Commit Messages
- Follow the **Conventional Commits** standard.
- Use prefixes like `docs:` for documentation changes.
- Keep commit messages concise (average ~61 characters).
  - Example:
    ```
    docs: update README with usage examples
    ```

## Workflows

### Documentation Updates
**Trigger:** When updating or adding documentation files.
**Command:** `/update-docs`

1. Make your documentation changes in the relevant `.md` or doc files.
2. Stage and commit your changes using the `docs:` prefix.
    ```
    git add SKILL.md
    git commit -m "docs: update SKILL.md with coding conventions"
    ```
3. Push your changes to the repository.

### Code Contribution
**Trigger:** When adding or modifying TypeScript source files.
**Command:** `/contribute-code`

1. Create or update `.ts` files using camelCase naming.
2. Use relative imports and named exports.
3. Write clear, conventional commit messages.
    ```
    git add newFeature.ts
    git commit -m "feat: add new feature for source map parsing"
    ```
4. Push your branch and open a pull request.

### Testing
**Trigger:** When writing or updating tests.
**Command:** `/run-tests`

1. Create test files matching the `*.test.*` pattern (e.g., `sourceMapParser.test.ts`).
2. Implement tests for your modules.
3. Run your tests using the project's test runner (framework not specified; check project scripts).
4. Commit your test changes with a relevant message.
    ```
    git add sourceMapParser.test.ts
    git commit -m "test: add tests for sourceMapParser"
    ```

## Testing Patterns
- Test files are named using the `*.test.*` convention, such as `moduleName.test.ts`.
- The specific testing framework is not defined; refer to project documentation or scripts for details.
- Place tests alongside or near the modules they cover.

## Commands
| Command         | Purpose                                      |
|-----------------|----------------------------------------------|
| /update-docs    | Update or add documentation files            |
| /contribute-code| Add or modify TypeScript source files        |
| /run-tests      | Write, update, and execute test files        |
```