import { Search } from "lucide-react";
import DropDown from "@/components/common/Dropdown";
function ApplicationsToolbar({
  searchTerm,
  setSearchTerm,
  filterTerm,
  setFilterTerm,
  sortTerm,
  setSortTerm,
}) {
const statusOptions = [
  {value: "All", label: "All statuses"},
  {value: "Applied", label: "Applied"},
  {value: "Interview", label: "Interview"},
  {value: "Offer", label: "Offer"},
  {value: "Rejected", label: "Rejected"},
];

const sortOptions = [
  {value: "Company-A-Z", label: "Company-A-Z"},
  {value: "Company-Z-A", label: "Company-Z-A"},
  {value: "Newest", label: "Newest"},
  {value: "Oldest", label: "Oldest"},
]


  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <form
        className="relative w-full sm:w-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          className="h-10 w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500 sm:w-72"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <div className="grid grid-cols-2 gap-3 sm:flex">
       <DropDown value={filterTerm}
       onChange={setFilterTerm}
       options={statusOptions}
       className="sm:min-w-36"/>

      <DropDown value={sortTerm}
      onChange={setSortTerm}
      options={sortOptions}
      className="sm:min-w-36"
      />
      </div>
    </div>
  );

}
export default ApplicationsToolbar;