import { Search } from "lucide-react";

function ApplicationsToolbar({
  searchTerm,
  setSearchTerm,
  filterTerm,
  setFilterTerm,
  sortTerm,
  setSortTerm,
}) {
  return (
    <div className="flex items-center gap-4">
      <form
        className="relative"
        onSubmit={(e) => e.preventDefault()}
      >
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          className="w-64 rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm outline-none transition-colors focus:border-gray-400"
          type="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <select
        value={filterTerm}
        onChange={(e) => setFilterTerm(e.target.value)}
      >
        <option value="All">All statuses</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      <select
  value={sortTerm}
  onChange={(e) => setSortTerm(e.target.value)}
>
  <option value="">Sort by</option>
  <option value="Company A-Z">Company A-Z</option>
  <option value="Company Z-A">Company Z-A</option>
  <option value="Newest">Newest</option>
  <option value="Oldest">Oldest</option>
</select>
    </div>
  );
}

export default ApplicationsToolbar;