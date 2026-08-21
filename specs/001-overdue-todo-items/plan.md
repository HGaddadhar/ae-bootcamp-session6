# Implementation Plan: Support for Overdue Todo Items

**Branch**: `001-overdue-todos` | **Date**: 2026-08-21 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-overdue-todo-items/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Add a derived overdue presentation state for incomplete todos whose valid due date is
earlier than the user's current calendar date. Implement the comparison in a small
frontend utility that accepts an injectable reference date for deterministic tests, use it
from `TodoCard`, and add a high-contrast border plus the text label "Overdue" while
preserving all existing todo content and actions.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: JavaScript, React 18, Node.js workspace

**Primary Dependencies**: React, Express.js, Jest, React Testing Library

**Storage**: Existing backend persistence; unchanged

**Testing**: Jest with React Testing Library; existing frontend and backend suites

**Target Platform**: Browser UI served by the existing React/Express application

**Project Type**: Full-stack web application; this feature changes the frontend only

**Performance Goals**: O(1) overdue calculation per rendered todo; no additional requests

**Constraints**: Calendar-date semantics in local time; invalid or missing dates are not overdue;
existing light and dark themes must retain WCAG AA contrast and existing interactions

**Scale/Scope**: Existing single-user todo list and its current create, edit, complete,
delete, and persistence workflows

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

All gates pass. The design keeps React and Express boundaries intact, adds no persistence
or infrastructure complexity, covers the derived behavior with focused Jest tests, and
uses the existing accessible component and theme patterns.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
packages/
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── TodoCard.js          # derive and render overdue state
│       │   └── __tests__/TodoCard.test.js
│       ├── services/
│       │   └── __tests__/todoService.test.js
│       ├── utils/
│       │   └── overdue.js            # pure calendar-date predicate
│       ├── App.css                    # overdue theme styles
│       └── styles/theme.css           # existing theme variables
│       └── __tests__/App.test.js
└── backend/
  └── __tests__/app.test.js         # regression coverage only; no API changes
```

**Structure Decision**: Preserve the existing npm-workspace full-stack layout. The overdue
predicate belongs in a reusable frontend utility, the presentation belongs in `TodoCard`,
and styles remain in the existing CSS/theme files. The backend is intentionally unchanged
because overdue state is derived at render time and does not alter the Todo record.

## Design Details

- Parse only the date portion of a valid `YYYY-MM-DD` due date and compare normalized local
  calendar dates, avoiding time-of-day and timezone shifts.
- Return false for missing, malformed, or impossible dates and for completed todos.
- Add an overdue class and a visible `Overdue` label with non-color text semantics; keep title,
  due date, checkbox, edit action, and delete action unchanged.
- Add deterministic utility tests for past, today, future, completed, undated, and invalid
  dates, plus component tests asserting overdue and non-overdue rendering and class changes.
- Verify both existing light and dark theme rules provide sufficient border/label contrast.

## Constitution Re-check

The design continues to pass all gates: it is scoped to the documented workflow, uses existing
React/component boundaries, adds behavior-first coverage, preserves keyboard-accessible controls,
and introduces no new abstraction beyond one focused date predicate.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
