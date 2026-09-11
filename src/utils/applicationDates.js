export function getTodayDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function isValidDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);

  return (
    Number(value.slice(0, 4)) > 0 &&
    Number.isFinite(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}

export function isValidAppliedDate(value) {
  return isValidDate(value) && value <= getTodayDate();
}

export function isValidInterviewDateTime(
  date,
  time,
  required = false,
) {
  if (!date) {
    return !required && !time;
  }

  if (!isValidDate(date)) {
    return false;
  }

  if (!time) {
    return !required;
  }

  if (
    typeof time !== "string" ||
    !/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(time)
  ) {
    return false;
  }

  const dateTime = new Date(`${date}T${time}`);

  return (
    Number.isFinite(dateTime.getTime()) &&
    dateTime.getFullYear() === Number(date.slice(0, 4)) &&
    dateTime.getMonth() + 1 === Number(date.slice(5, 7)) &&
    dateTime.getDate() === Number(date.slice(8, 10)) &&
    dateTime.getHours() === Number(time.slice(0, 2)) &&
    dateTime.getMinutes() === Number(time.slice(3, 5))
  );
}