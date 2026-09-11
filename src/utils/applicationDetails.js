function parseSalary(value) {
  if (value == null || String(value).trim() === "") {
    return null;
  }

  const amount = Number(value);

  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error("invalidSalary");
  }

  return amount;
}

export function prepareApplicationDetails(formData) {
  const offerUrl = (formData.offerUrl ?? "").trim();
  const salaryMin = parseSalary(formData.salaryMin);
  const salaryMax = parseSalary(formData.salaryMax);

  if (offerUrl) {
    let url;

    try {
      url = new URL(offerUrl);
    } catch {
      throw new Error("invalidOfferUrl");
    }

    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("invalidOfferUrl");
    }
  }

  if (
    salaryMin !== null &&
    salaryMax !== null &&
    salaryMin > salaryMax
  ) {
    throw new Error("invalidSalaryRange");
  }

  return {
    offerUrl: offerUrl || null,
    location: (formData.location ?? "").trim() || null,
    workMode: formData.workMode || null,
    salaryMin,
    salaryMax,
    salaryCurrency: formData.salaryCurrency || null,
    salaryPeriod: formData.salaryPeriod || null,
    notes: (formData.notes ?? "").trim() || null,
  };
}

export function detailsToDatabase(details) {
  return {
    offer_url: details.offerUrl,
    location: details.location,
    work_mode: details.workMode,
    salary_min: details.salaryMin,
    salary_max: details.salaryMax,
    salary_currency: details.salaryCurrency,
    salary_period: details.salaryPeriod,
    notes: details.notes,
  };
}

export function detailsFromDatabase(data) {
  return {
    offerUrl: data.offer_url ?? null,
    location: data.location ?? null,
    workMode: data.work_mode ?? null,
    salaryMin: data.salary_min ?? null,
    salaryMax: data.salary_max ?? null,
    salaryCurrency: data.salary_currency ?? null,
    salaryPeriod: data.salary_period ?? null,
    notes: data.notes ?? null,
  };
}

export function applicationFromDatabase(data) {
  return {
    id: data.id,
    company: data.company,
    position: data.position,
    status: data.status,
    appliedAt: data.applied_at,
    createdAt: data.created_at,
    ...detailsFromDatabase(data),
    interview: data.interview_date
      ? {
          date: data.interview_date,
          time: data.interview_time,
          type: data.interview_type,
          at: data.interview_at,
        }
      : null,
  };
}
