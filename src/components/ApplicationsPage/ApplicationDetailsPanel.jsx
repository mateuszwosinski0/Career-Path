import { useEffect, useRef } from "react";
import { X, ExternalLink} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { formatDate } from "@/utils/formatDate";
function ApplicationDetailsPanel({ application, onClose }) {
  const dialogRef = useRef(null);
  const { t, language } = useLanguage();

  let offerUrl = null;

try {
  const url = new URL(application.offerUrl);

  if (["http:", "https:"].includes(url.protocol)) {
    offerUrl = url.href;
  }
} catch {
  offerUrl = null;
}

const statusLabels = {
  Applied: t("applications", "statusApplied"),
  Interview: t("applications", "statusInterview"),
  Offer: t("applications", "statusOffer"),
  Rejected: t("applications", "statusRejected"),
};

const workModeLabels = {
  Remote: t("applications", "workModeRemote"),
  Hybrid: t("applications", "workModeHybrid"),
  "On-site": t("applications", "workModeOnSite"),
};

const details = [
  {
    label: t("applications", "status"),
    value: statusLabels[application.status] ?? application.status,
  },
  {
    label: t("applications", "applied"),
    value: application.appliedAt
      ? formatDate(application.appliedAt)
      : null,
  },
  {
    label: t("applications", "detailsLocation"),
    value: application.location,
  },
  {
    label: t("applications", "detailsWorkMode"),
    value: workModeLabels[application.workMode] ?? application.workMode,
  },
];


  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;

    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function handleBackdropClick(event) {
    if (event.target !== event.currentTarget) return;

    const bounds = event.currentTarget.getBoundingClientRect();

    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (clickedOutside) {
      onClose();
    }
  }

  const salaryPeriodLabels = {
  Monthly: t("applications", "salaryMonthly"),
  Hourly: t("applications", "salaryHourly"),
  Yearly: t("applications", "salaryYearly"),
};

const numberFormatter = new Intl.NumberFormat(
  { pl: "pl-PL", en: "en-US", es: "es-ES" }[language], {
  maximumFractionDigits: 2,
});

const hasSalaryMin =
  application.salaryMin != null && application.salaryMin !== "";

const hasSalaryMax =
  application.salaryMax != null && application.salaryMax !== "";

let salaryText = t("applications", "notSpecified");

if (hasSalaryMin && hasSalaryMax) {
  salaryText =
    `${numberFormatter.format(application.salaryMin)} – ` +
    numberFormatter.format(application.salaryMax);
} else if (hasSalaryMin) {
  salaryText =
    `${t("applications", "salaryFrom")} ` +
    numberFormatter.format(application.salaryMin);
} else if (hasSalaryMax) {
  salaryText =
    `${t("applications", "salaryTo")} ` +
    numberFormatter.format(application.salaryMax);
}

const salaryDescription = [
  application.salaryCurrency,
  salaryPeriodLabels[application.salaryPeriod],
]
  .filter(Boolean)
  .join(" · ");


  const interviewTypeLabels = {
  Online: t("interviewTypes", "online"),
  "On-site": t("interviewTypes", "onSite"),
  Phone: t("interviewTypes", "phone"),
};

const interviewDetails = [
  {
    label: t("applications", "interviewDate"),
    value: application.interview?.date
      ? formatDate(application.interview.date)
      : null,
  },
  {
    label: t("applications", "interviewTime"),
    value: application.interview?.time?.slice(0, 5),
  },
  {
    label: t("applications", "interviewType"),
    value:
      interviewTypeLabels[application.interview?.type] ??
      application.interview?.type,
  },
];

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="application-details-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={handleBackdropClick}
      className="application-details-panel fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-white p-0 text-gray-900 shadow-xl backdrop:bg-black/50 dark:bg-gray-900 dark:text-gray-100 sm:max-w-lg"
    >
      <div className="flex min-h-full flex-col">
        <header className="flex items-start justify-between gap-4 border-b border-gray-200 p-6 dark:border-gray-800">
          <div className="min-w-0">
            <h2
              id="application-details-title"
              className="break-words text-xl font-bold"
            >
              {application.company}
            </h2>

            <p className="mt-1 break-words text-gray-500 dark:text-gray-400">
              {application.position}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t("applications", "closeDetails")}
            className="shrink-0 cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </header>

     <div className="flex-1 space-y-6 p-6">
  <section>
    <h3 className="mb-4 text-sm font-semibold">
      {t("applications", "details")}
    </h3>

    <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {details.map((detail) => (
        <div key={detail.label} className="min-w-0">
          <dt className="text-sm text-gray-500 dark:text-gray-400">
            {detail.label}
          </dt>

          <dd className="mt-1 break-words font-medium">
            {detail.value || t("applications", "notSpecified")}
          </dd>
        </div>
      ))}
    </dl>
  </section>

  <section className="border-t border-gray-200 pt-6 dark:border-gray-800">
  <h3 className="mb-3 text-sm font-semibold">
    {t("applications", "detailsOfferUrl")}
  </h3>

  {offerUrl ? (
    <a
      href={offerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded text-sm font-medium text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-blue-400"
    >
      {t("applications", "openOffer")}
      <ExternalLink size={16} aria-hidden="true" />
    </a>
  ) : (
    <p className="text-sm text-gray-500 dark:text-gray-400">
      {t("applications", "notSpecified")}
    </p>
  )}
</section>

<section className="border-t border-gray-200 pt-6 dark:border-gray-800">
  <h3 className="mb-3 text-sm font-semibold">
    {t("applications", "detailsSalary")}
  </h3>

  <p className="break-words text-lg font-semibold">
    {salaryText}
  </p>

  {salaryDescription && (
    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
      {salaryDescription}
    </p>
  )}
</section>

{application.status === "Interview" && (
  <section className="border-t border-gray-200 pt-6 dark:border-gray-800">
    <h3 className="mb-4 text-sm font-semibold">
      {t("applications", "interviewDetails")}
    </h3>

    <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {interviewDetails.map((detail) => (
        <div key={detail.label} className="min-w-0">
          <dt className="text-sm text-gray-500 dark:text-gray-400">
            {detail.label}
          </dt>

          <dd className="mt-1 break-words font-medium">
            {detail.value || t("applications", "notSpecified")}
          </dd>
        </div>
      ))}
    </dl>
  </section>
)}

<section className="border-t border-gray-200 pt-6 dark:border-gray-800">
  <h3 className="mb-3 text-sm font-semibold">
    {t("applications", "detailsNotes")}
  </h3>

  <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-gray-700 dark:text-gray-300">
    {application.notes?.trim() ||
      t("applications", "notSpecified")}
  </p>
</section>

</div>

      </div>
    </dialog>
  );
}

export default ApplicationDetailsPanel;
