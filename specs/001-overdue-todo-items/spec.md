# Feature Specification: Support for Overdue Todo Items

**Feature Branch**: `001-overdue-todo-items`

**Created**: 2026-08-21

**Status**: Draft

**Input**: User description: "As a todo application user, I want to easily identify and distinguish overdue tasks in my todo list so that I can prioritize my work and quickly see which tasks are past their due date. Users need a clear, visual way to identify todos that have not been completed by their due date. This feature must include automated tests covering the overdue determination logic and its display, following the existing Jest patterns in the repository."

## Clarifications

### Session 2026-08-21

- Q: How should an incomplete overdue todo be visually distinguished from other todos? -> A: A high-contrast accent border plus a visible "Overdue" text label.

The overdue treatment MUST combine a high-contrast accent border with a visible "Overdue" text label so that the distinction remains understandable without relying on color alone.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Identify overdue work at a glance (Priority: P1)

When a user views their todo list, unfinished todos whose due date has passed are visibly distinguished from other todos. This lets the user recognize work requiring attention without manually comparing each due date with today.

**Why this priority**: Quickly identifying past-due work is the core value of the feature and directly supports prioritization.

**Independent Test**: Create or view a list containing overdue, current/future, completed, and undated todos, then verify that only the unfinished overdue todo receives the overdue treatment and that the other todos retain their normal or completed presentation.

**Acceptance Scenarios**:

1. **Given** an incomplete todo with a due date before today, **When** the user views the todo list, **Then** the todo is visibly identified as overdue.
2. **Given** an incomplete todo with a due date today, **When** the user views the todo list, **Then** the todo is not identified as overdue.
3. **Given** an incomplete todo with a due date in the future, **When** the user views the todo list, **Then** the todo is not identified as overdue.
4. **Given** a completed todo with a due date before today, **When** the user views the todo list, **Then** the todo is not identified as overdue and its completed presentation remains clear.
5. **Given** a todo without a due date, **When** the user views the todo list, **Then** the todo is not identified as overdue.

### Edge Cases

- A due date exactly matching today's calendar date is not overdue.
- Overdue determination uses calendar dates, not the time of day, so an item due yesterday remains overdue throughout today.
- An invalid or unavailable due date does not cause a todo to be identified as overdue; the todo remains usable and is presented without overdue treatment.
- If the user marks an overdue todo complete, its overdue treatment is removed while the completed presentation is shown.
- If the user changes a todo's due date from a past date to today or a future date, its overdue treatment is removed after the change is reflected.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST determine whether a todo is overdue using its due date and the current calendar date.
- **FR-002**: The system MUST identify a todo as overdue only when it has a valid due date before today and is incomplete.
- **FR-003**: The system MUST NOT identify todos due today, due in the future, completed before or after their due date, or without a due date as overdue.
- **FR-004**: The todo list MUST provide a high-contrast accent border and a visible "Overdue" text label for overdue todos in both supported color themes.
- **FR-005**: The overdue distinction MUST preserve the todo's title, due date, completion status, and existing actions.
- **FR-006**: The overdue distinction MUST be removed when an overdue todo is completed or its due date is changed so that it is no longer overdue.
- **FR-007**: The system MUST continue to support existing todo creation, viewing, editing, completion, deletion, and persistence behavior.
- **FR-008**: Automated tests MUST cover overdue determination for past, present, future, completed, undated, and invalid-date inputs.
- **FR-009**: Automated tests MUST cover the visible display of overdue and non-overdue todos using the repository's established Jest testing patterns.

### Key Entities

- **Todo**: An existing task record with a title, optional due date, and completion status. The feature derives an overdue state from these attributes and the current calendar date; it does not add a user-facing workflow or separate task type.
- **Overdue state**: A derived presentation state indicating that an incomplete todo has a valid due date earlier than the current calendar date.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In a list of mixed-status todos, users can identify every overdue incomplete todo without manually comparing dates, with 100% of overdue items receiving the defined visual distinction.
- **SC-002**: Users can distinguish overdue todos from non-overdue todos within 5 seconds of viewing the list in both light and dark themes.
- **SC-003**: Automated tests cover all six overdue determination categories: past due, due today, future due, completed past due, undated, and invalid date.
- **SC-004**: Existing todo workflows remain functional, with the existing automated test suites passing after the feature is added.

## Assumptions

- The application remains single-user and uses the existing Todo data and persistence model.
- Due dates represent calendar dates in the user's local context; time-of-day precision is not part of overdue classification.
- A todo due today is considered current until the next calendar date.
- The existing light and dark themes are the supported presentation contexts.
- No filtering, sorting, notifications, reminders, or bulk operations are introduced by this feature.
- Existing repository Jest conventions are sufficient for testing the derived overdue behavior and its user-visible presentation.
