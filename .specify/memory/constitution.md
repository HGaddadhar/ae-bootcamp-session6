<!--
Sync Impact Report
- Version change: 0.0.0 (template) -> 1.0.0
- Modified principles: placeholder principles -> five project principles
- Added sections: Additional Constraints, Development Workflow
- Removed sections: none
- Follow-up TODOs: none
-->

# Todo App Constitution

## Core Principles

### I. User-Centered Functional Scope
The application MUST implement the todo workflows defined in the functional requirements:
creating, viewing, completing, editing, and deleting todos with backend persistence. Features
outside the documented scope MUST be deferred unless the requirements are explicitly amended.
This keeps delivery focused on a reliable single-user todo experience.

### II. Simple Full-Stack Architecture
The frontend MUST remain a React application and the backend MUST remain an Express.js REST API
within the npm workspace monorepo. New behavior MUST use the existing service and component
boundaries where they apply, and changes MUST avoid unnecessary schema or infrastructure
complexity. This preserves a small, understandable system that can be developed and run locally.

### III. Behavior-First Testing
Code changes MUST be covered by tests at the narrowest useful level, with tests asserting user-
visible behavior and public contracts rather than implementation details. Unit and integration
tests MUST be isolated, descriptive, and maintainable. The project MUST target at least 80%
coverage across packages, and every critical todo workflow MUST have automated coverage.

### IV. Accessible, Consistent Interface
All interactive behavior MUST be keyboard accessible, use associated form labels, expose
descriptive names for icon controls, and maintain WCAG AA color contrast. UI changes MUST follow
the documented visual system, responsive constraints, and light/dark theme behavior. The
interface MUST communicate failures and successful operations clearly to users.

### V. Maintainable Simplicity
Each module, component, and function MUST have a focused responsibility, use descriptive names,
and follow the repository's two-space formatting and import conventions. Contributors MUST prefer
clear, direct solutions, reuse shared utilities and components, and avoid premature optimization
or duplication. Error handling MUST provide meaningful messages and user feedback.

## Additional Constraints

The application is single-user and MUST NOT introduce authentication, authorization, multi-user
isolation, advanced search/filtering, bulk operations, recurring todos, reminders, or unrelated
database schema changes without an approved requirements update. Todo titles MUST be non-empty
strings no longer than 255 characters; due dates are optional. End-to-end testing is outside the
initial scope, while unit and integration testing remain required.

## Development Workflow

Changes MUST be reviewed against this constitution and the applicable documentation before
integration. Contributors MUST run the relevant package tests, lint checks when configured, and
coverage checks for substantial changes. Pull requests MUST explain behavior changes and include
tests for new or changed contracts. Documentation MUST be updated when requirements, architecture,
or development practices change.

## Governance
<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

This constitution supersedes conflicting project practices. Amendments MUST document the affected
principles or sections, the reason for change, and any migration or test impact. Version numbers
use semantic versioning: MAJOR for incompatible governance changes, MINOR for new or materially
expanded requirements, and PATCH for clarifications or non-semantic wording changes. Every change
MUST update the last-amended date and the Sync Impact Report. Reviewers MUST verify compliance with
the principles and confirm that required tests and documentation are present.

**Version**: 1.0.0 | **Ratified**: 2026-08-21 | **Last Amended**: 2026-08-21
<!-- Example: Version: 2.1.1 | Ratified: 2025-06-13 | Last Amended: 2025-07-16 -->
