# Quickstart: Validate Overdue Todo Items

## Prerequisites

- Node.js and npm are installed.
- Dependencies are installed from the repository root with `npm install`.

## Automated validation

Run the focused frontend suite:

```bash
npm test --workspace=frontend -- --runInBand
```

The overdue predicate tests must cover:

- valid due date before today;
- due date equal to today;
- due date after today;
- completed todo with a past due date;
- missing due date; and
- malformed or impossible due date.

The `TodoCard` tests must verify that an overdue todo renders both the `Overdue` text and
its overdue class/border state, while today, future, completed, undated, and invalid-date
todos do not render the overdue treatment. Existing title, due-date, checkbox, edit, and
delete behavior must remain covered.

Run the backend regression suite as well:

```bash
npm test --workspace=backend -- --runInBand
```

Run coverage when checking the project-wide quality gate:

```bash
npm test --workspaces -- --coverage --runInBand
```

## Manual validation

1. Start the existing application using the repository's normal development command.
2. Create or edit todos with a past date, today's date, a future date, and no date.
3. Confirm only the incomplete past-date todo shows the accent border and `Overdue` label.
4. Mark that todo complete and confirm the overdue treatment disappears while the completed style remains.
5. Change an overdue todo to today or a future date and confirm the treatment disappears.
6. Repeat the visual check in both light and dark themes, including keyboard use of the existing controls.

The entity and derived-state rules are documented in [data-model.md](data-model.md); no API
contract artifact is needed because this feature does not change the existing backend interface.
