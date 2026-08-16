import { useState } from "react";
import { X } from "lucide-react";
import DropDown from "@/components/common/Dropdown";
function ScheduleInterviewModal({
    application,
    onClose,
    onSave,
}) {
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        type: "Online",
    });

    function handleChange(e) {
        const {name,value} = e.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    }
async function handleSubmit(e) {
  e.preventDefault();

  await onSave(formData);
}

    if (!application) return null;

    return(

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">

                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold">
                            Schedule interview
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            {application.company} — {application.position}
                        </p>
                    </div>

                    <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <X size={20}/>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium">
                            Interview date
                        </span>

                        <input type="date" name="date" value={formData.date} onChange={handleChange} required
                        className="rounded-lg border border-gray-300 bg-transparent px-3 py-2 dark:border-gray-700"/>
                    </label>

                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium">
                            Interview time
                        </span>

                        <input type="time" name="time" value={formData.time} onChange={handleChange} required
                        className="rounded-lg border border-gray-300 bg-transparent px-3 py-2 dark:border-gray-700"/>
                    </label>

                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium">
                            Interview type
                        </span>

                        <DropDown
  value={formData.type}
  onChange={(value) =>
    setFormData((current) => ({
      ...current,
      type: value,
    }))
  }
  options={[
    { value: "Online", label: "Online" },
    { value: "On-site", label: "On-site" },
    { value: "Phone", label: "Phone" },
  ]}
/>
                    </label>

                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 text-sm dark:border-gray-700">
                            Cancel
                        </button>

                        <button type="submit"  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                            Schedule interview
                        </button>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default ScheduleInterviewModal;