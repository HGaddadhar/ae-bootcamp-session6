# Research: Overdue Todo Items

## Decision: Derive overdue state in the frontend at render time

- **Decision**: Calculate overdue status from the existing `completed` and `dueDate` fields in a small pure frontend utility used by `TodoCard`.
- **Rationale**: Overdue state is explicitly derived presentation state. Computing it locally avoids changing the API, persistence schema, or synchronization contract and updates immediately after completion or due-date edits.
- **Alternatives considered**: Adding an `overdue` field to backend responses was rejected because it duplicates transient calendar state and would require persistence/API changes; putting the calculation inline in JSX was rejected because it makes date edge cases harder to test and reuse.

## Decision: Compare local calendar dates without time-of-day semantics

- **Decision**: Normalize the due date and reference date to local calendar-date values, then treat a todo as overdue only when the due date is strictly earlier than today.
- **Rationale**: The specification says that due today is current and that time of day must not affect classification. A deterministic reference date parameter makes tests independent of the machine clock.
- **Alternatives considered**: Comparing `Date` timestamps directly was rejected because ISO date parsing can introduce timezone shifts and incorrectly classify dates around midnight.

## Decision: Treat invalid and unavailable dates as not overdue

- **Decision**: Validate the supplied date before comparison and return false for missing, malformed, or impossible dates.
- **Rationale**: The requirements explicitly preserve usability and normal presentation when a date cannot be used for classification.
- **Alternatives considered**: Allowing JavaScript's date parser to decide validity was rejected because it accepts formats beyond the application's date-input contract and can produce timezone-dependent behavior.

## Decision: Use both structural and textual visual treatment

- **Decision**: Add an overdue class with a high-contrast accent border and a visible `Overdue` label, while retaining all existing todo content and controls.
- **Rationale**: This directly satisfies the clarified requirement and ensures the state is understandable without relying on color alone. Existing light/dark theme variables should supply contrasting values.
- **Alternatives considered**: A color-only border or icon was rejected because it does not meet the non-color communication requirement.

## Decision: Keep validation in existing Jest patterns

- **Decision**: Add focused unit coverage for the predicate and React Testing Library coverage for `TodoCard` display, then run existing frontend and backend suites as regression checks.
- **Rationale**: This matches the repository's current test organization and the constitution's behavior-first testing principle.
- **Alternatives considered**: End-to-end browser tests were rejected because they are outside the project's initial testing scope.
