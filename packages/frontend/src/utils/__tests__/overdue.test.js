import { isOverdue } from '../overdue';

describe('isOverdue', () => {
  const referenceDate = new Date(2025, 11, 25);

  const makeTodo = (overrides = {}) => ({
    dueDate: '2025-12-25',
    completed: 0,
    ...overrides,
  });

  it('returns true for an incomplete todo due before today', () => {
    expect(isOverdue(makeTodo({ dueDate: '2025-12-24' }), referenceDate)).toBe(true);
  });

  it('returns false for a todo due today', () => {
    expect(isOverdue(makeTodo(), referenceDate)).toBe(false);
  });

  it('returns false for a todo due in the future', () => {
    expect(isOverdue(makeTodo({ dueDate: '2025-12-26' }), referenceDate)).toBe(false);
  });

  it('returns false for a completed todo due in the past', () => {
    expect(isOverdue(makeTodo({ dueDate: '2025-12-24', completed: 1 }), referenceDate)).toBe(false);
  });

  it('returns false for an undated todo', () => {
    expect(isOverdue(makeTodo({ dueDate: null }), referenceDate)).toBe(false);
  });

  it.each(['2025-02-29', '2025-13-01', 'not-a-date'])('returns false for invalid due date %s', (dueDate) => {
    expect(isOverdue(makeTodo({ dueDate }), referenceDate)).toBe(false);
  });
});