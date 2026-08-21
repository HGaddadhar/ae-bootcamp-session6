---

description: "Implementation tasks for overdue todo item identification"
---

# Tasks: Support for Overdue Todo Items

**Input**: Design documents from `/specs/001-overdue-todo-items/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `quickstart.md`

**Tests**: Required by the feature specification. Tests use the existing Jest and React Testing Library patterns.

**Organization**: Tasks are grouped by the single user story so it can be implemented and tested independently.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the existing frontend test and styling surfaces needed by the feature.

- [ ] T001 Inspect existing TodoCard, frontend test, and theme conventions in `packages/frontend/src/components/TodoCard.js`, `packages/frontend/src/components/__tests__/TodoCard.test.js`, `packages/frontend/src/App.css`, and `packages/frontend/src/styles/theme.css`
- [ ] T002 Confirm the focused frontend test command from `packages/frontend/package.json` and the repository workspace test commands in `package.json`

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the reusable date-classification surface before adding presentation behavior.

- [ ] T003 Create the frontend utility module path `packages/frontend/src/utils/overdue.js` for a pure, injectable-reference-date overdue predicate
- [ ] T004 Define strict local calendar-date validation and normalization rules in `packages/frontend/src/utils/overdue.js`, returning false for missing, malformed, impossible, or completed todo values

**Checkpoint**: The shared overdue predicate contract is ready for story implementation and deterministic tests.

## Phase 3: User Story 1 - Identify overdue work at a glance (Priority: P1) 🎯 MVP

**Goal**: Show a high-contrast border and visible `Overdue` label only for incomplete todos with a valid due date before today, while preserving all existing content and actions.

**Independent Test**: Render a mixed list containing past, today, future, completed, undated, and invalid-date todos, then verify only the incomplete past-date todo has the overdue label and class while all other presentations and actions remain unchanged.

### Tests for User Story 1

- [ ] T005 [P] [US1] Add deterministic unit tests for past, today, future, completed, undated, and invalid due dates in `packages/frontend/src/utils/__tests__/overdue.test.js`
- [ ] T006 [P] [US1] Extend TodoCard rendering tests to assert the `Overdue` label and overdue class for eligible todos and no overdue treatment for today, future, completed, undated, and invalid-date todos in `packages/frontend/src/components/__tests__/TodoCard.test.js`
- [ ] T007 [US1] Add regression assertions that overdue presentation preserves title, due date, completion control, edit action, and delete action in `packages/frontend/src/components/__tests__/TodoCard.test.js`

### Implementation for User Story 1

- [ ] T008 [US1] Implement the exported overdue predicate in `packages/frontend/src/utils/overdue.js` using strict `YYYY-MM-DD` validation, local calendar-date comparison, and incomplete-status handling
- [ ] T009 [US1] Integrate the overdue predicate into `packages/frontend/src/components/TodoCard.js` so completion and due-date changes recalculate the derived state without changing existing actions
- [ ] T010 [US1] Render the visible `Overdue` text label and overdue styling class from `packages/frontend/src/components/TodoCard.js` without removing existing title, due-date, completion, edit, or delete UI
- [ ] T011 [US1] Add high-contrast overdue border and label styles for both light and dark themes in `packages/frontend/src/App.css` and `packages/frontend/src/styles/theme.css`
- [ ] T012 [US1] Run the focused frontend Jest suite from `packages/frontend/package.json` and resolve any regressions in the overdue utility or TodoCard tests

**Checkpoint**: User Story 1 is independently functional, accessible without color alone, and covered by deterministic logic and display tests.

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Validate the feature against existing workflows and documented quality gates.

- [ ] T013 [P] Run the backend regression suite using `packages/backend/jest.config.js` and confirm no API or persistence behavior changed
- [ ] T014 [P] Run the full workspace Jest suites with coverage from `package.json` and confirm the project coverage target remains satisfied
- [ ] T015 Run the manual light-theme and dark-theme scenarios from `specs/001-overdue-todo-items/quickstart.md`, including completion and due-date changes

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately.
- **Foundational (Phase 2)**: Depends on Setup and blocks the user story.
- **User Story 1 (Phase 3)**: Depends on the foundational utility surface; tests should be written before implementation and initially fail.
- **Polish (Phase 4)**: Depends on completion of User Story 1.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Phase 2; no dependency on other user stories.

### Within User Story 1

- T005 and T006 can be written in parallel before implementation.
- T007 depends on the existing TodoCard test setup and can follow T006.
- T008 depends on T003-T004 and must precede T009.
- T009 and T010 are sequential component integration steps; T011 can proceed after the overdue class contract is chosen.
- T012 follows T005-T011 and is the story validation checkpoint.

### Parallel Opportunities

- T005 and T006 can run in parallel because they touch separate test concerns/files.
- T013 and T014 can run in parallel after the story implementation is complete.
- T011 can be developed alongside T009 once the class name and label markup are established.

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phases 1 and 2.
2. Write the utility and TodoCard tests in Phase 3.
3. Implement the predicate, component integration, markup, and theme styles.
4. Run T012 and verify the independent test criteria.

### Incremental Delivery

1. Finish the shared predicate foundation.
2. Deliver the overdue display as the P1 MVP.
3. Run backend, workspace coverage, and manual theme regression checks.
