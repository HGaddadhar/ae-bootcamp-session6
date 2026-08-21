# Data Model: Overdue Todo Items

## Todo

Existing entity; no stored fields or backend schema changes are introduced.

| Field | Existing type | Role in overdue state | Validation / behavior |
|---|---|---|---|
| `id` | number | Identifies the todo | Existing API behavior is unchanged |
| `title` | non-empty string | Preserved in overdue presentation | Existing maximum length of 255 characters remains |
| `dueDate` | string or `null` | Compared as a local calendar date | Optional; valid `YYYY-MM-DD` dates only participate; missing or invalid values are not overdue |
| `completed` | number/boolean-compatible status | Excludes completed todos | Any completed todo is not overdue, regardless of due date |

## Derived Overdue State

`isOverdue(todo, today)` returns a boolean and is not persisted.

Rules:

1. Return `false` when `todo.completed` is complete.
2. Return `false` when `todo.dueDate` is missing, malformed, or invalid.
3. Return `true` only when the normalized due date is strictly earlier than the normalized local calendar date in `today`.
4. Return `false` when the due date equals today or is later than today.

## Presentation State

When `isOverdue` is true, `TodoCard` adds the overdue styling state and renders the visible text label `Overdue`. The title, formatted due date, completion checkbox, edit control, and delete control remain available. Completing the todo or changing its due date causes the derived state to recalculate from the updated todo.
