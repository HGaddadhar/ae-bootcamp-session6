const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

function parseCalendarDate(value) {
  if (typeof value !== 'string') return null;

  const match = value.match(DATE_PATTERN);
  if (!match) return null;

  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day)
  ) {
    return null;
  }

  return date;
}

function normalizeReferenceDate(referenceDate) {
  if (referenceDate instanceof Date) {
    if (Number.isNaN(referenceDate.getTime())) return null;
    return new Date(
      referenceDate.getFullYear(),
      referenceDate.getMonth(),
      referenceDate.getDate()
    );
  }

  return parseCalendarDate(referenceDate);
}

export function isOverdue(todo, referenceDate = new Date()) {
  if (!todo || todo.completed === 1 || todo.completed === true) return false;

  const dueDate = parseCalendarDate(todo.dueDate);
  const today = normalizeReferenceDate(referenceDate);

  return dueDate !== null && today !== null && dueDate < today;
}