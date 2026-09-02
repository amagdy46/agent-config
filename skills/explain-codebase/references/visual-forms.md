# Visual forms

Use the smallest view that makes the key point clear, and place it next to the sentence it supports. Prefer one or two forms; never all of them.

- **Pseudocode** for logic or an algorithm:

  ```text
  on(save)
    if content is unchanged
      return cached result
    write new content
    return fresh result
  ```

- **Call tree** for runtime control flow:

  ```text
  submitForm
    createSession
      persistPrompt
      launchAgent
    navigateToSession
  ```

- **Component tree** for UI structure, including the state hooks and module boundaries that matter:

  ```text
  <SessionPage> (routes/session)
    useSessionEvents()
    <SessionToolbar>
      <RunSkillButton> (shared ui package)
  ```

- **Shallow file tree** for file responsibility or a broad refactor, one phrase per directory.

- **Sequence or flow diagram** for interaction, control flow, or data flow across boundaries. Use Mermaid when the host renders it; otherwise keep it as an indented list.

- **Diff-shaped sketch** when the point is what changes and the surrounding shape already exists. Match the diff to the topic: a component tree diff for a UI change, a file-tree diff for a layout change, a call-tree diff for a flow change, a pseudocode diff for a state change.

  ```diff
   on(save)
  -  write content
  +  if content is unchanged
  +    return cached result
  +  write new content
  ```

- **Whole block** when most of it is new, when omitted context would hide ownership or order, or when the user needs a copyable target shape.

Keep only the calls, files, props, states, and boundaries needed to answer the current question. For a dense visual comparison that none of these forms carry, a standalone diagram artifact is a separate request; do not create files on disk from within an explanation.
