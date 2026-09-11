const STORAGE_KEY = "careerpath:guest-applications";

export function readGuestApplications() {
  const storedValue = localStorage.getItem(STORAGE_KEY);

  if (storedValue === null) {
    return [];
  }

  const applications = JSON.parse(storedValue);

  if (!Array.isArray(applications)) {
    throw new Error("Invalid guest applications data");
  }

  return applications;
}

export function writeGuestApplications(applications) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(applications),
  );
}