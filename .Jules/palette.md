## 2024-05-15 - [Add layout gap for Spinner text]
**Learning:** Components like `Spinner` do not inherently render with side margins. By placing `<Spinner />` and `<Text>` directly as siblings without a container, the text can feel squished.
**Action:** Always wrap `<Spinner />` and companion `<Text>` inside a `<Box flexDirection="row" gap={1}>` to ensure consistent and clean spacing in the CLI layout. This matches the project's memory instructions for side-by-side elements in the Ink UI.
