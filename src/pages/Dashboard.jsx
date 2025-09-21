// import React, { useState } from "react";
// import { Search, ChevronDown } from "lucide-react";
// import creditsData from "../data/credits.json";

// const CarbonCreditsDashboard = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [vintageFilter, setVintageFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");

//   // Stats data dynamically calculated
//   const statsData = [
//     { title: "Total credits", value: creditsData.length },
//     {
//       title: "Active",
//       value: creditsData.filter((c) => c.status === "Active").length,
//     },
//     {
//       title: "Retired",
//       value: creditsData.filter((c) => c.status === "Retired").length,
//     },
//     { title: "Retired in last 30 days", value: "230" }, // Placeholder, can make dynamic later
//   ];

//   // Clear all filters
//   const clearFilters = () => {
//     setSearchTerm("");
//     setVintageFilter("");
//     setStatusFilter("");
//   };

//   // Status badge component
//   const StatusBadge = ({ status }) => {
//     const isActive = status === "Active";
//     return (
//       <span
//         className={`rounded-[10px] text-sm font-medium px-[15px] py-[6px] ${
//           isActive ? "bg-[#5b9d63] text-white" : "bg-gray-200 text-gray-700"
//         }`}
//       >
//         {status}
//       </span>
//     );
//   };

//   // Stats card component
//   const StatsCard = ({ title, value }) => (
//     <div className="bg-white rounded-[5px] p-4 md:p-6 border border-gray-300">
//       <div className="text-xs text-gray-500 uppercase font-medium mb-2">
//         {title}
//       </div>
//       <div className="text-2xl font-bold text-gray-900">{value}</div>
//     </div>
//   );

//   // Dropdown component
//   const Dropdown = ({ placeholder, value, onChange, options = [] }) => (
//     <div className="relative">
//       <select
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//       >
//         <option value="">{placeholder}</option>
//         {options.map((option) => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//       <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
//     </div>
//   );

//   // Apply filters
//   const filteredData = creditsData.filter((row) => {
//     return (
//       (searchTerm === "" ||
//         row.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         row.unicId.toLowerCase().includes(searchTerm.toLowerCase())) &&
//       (vintageFilter === "" || row.vintage === vintageFilter) &&
//       (statusFilter === "" || row.status === statusFilter)
//     );
//   });

//   return (
//     <div className="min-h-screen bg-white p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//           <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
//             Carbon Credits Dashboard
//           </h1>

//           {/* Search Bar */}
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//           {statsData.map((stat, index) => (
//             <StatsCard key={index} title={stat.title} value={stat.value} />
//           ))}
//         </div>

//         {/* Filters Row */}
//         <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
//           <Dropdown
//             placeholder="Vintage"
//             value={vintageFilter}
//             onChange={setVintageFilter}
//             options={[...new Set(creditsData.map((c) => c.vintage))]}
//           />

//           <Dropdown
//             placeholder="Status"
//             value={statusFilter}
//             onChange={setStatusFilter}
//             options={["Active", "Retired"]}
//           />

//           <button
//             onClick={clearFilters}
//             className="text-gray-500 hover:underline cursor-pointer whitespace-nowrap"
//           >
//             Clear filters
//           </button>
//         </div>

//         {/* Table */}
//         <div className="bg-white shadow rounded-lg overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     UNIC ID
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Project name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Vintage
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredData.map((row, index) => (
//                   <tr
//                     key={index}
//                     className={`${
//                       index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                     } hover:bg-gray-100 transition-colors duration-200`}
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {row.unic_id}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {row.project_name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {row.vintage}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <StatusBadge status={row.status} />
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <button className="text-blue-600 hover:underline cursor-pointer text-sm">
//                         Download Retirement Certificate
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             {filteredData.length === 0 && (
//               <div className="p-6 text-center text-gray-500">
//                 No records found
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarbonCreditsDashboard;

import React, { useState } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import creditsData from "../data/credits.json";

const CarbonCreditsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [vintageFilter, setVintageFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Stats data dynamically calculated
  const statsData = [
    { title: "Total credits", value: creditsData.length },
    {
      title: "Active",
      value: creditsData.filter((c) => c.status === "Active").length,
    },
    {
      title: "Retired",
      value: creditsData.filter((c) => c.status === "Retired").length,
    },
    { title: "Retired in last 30 days", value: "230" }, // Placeholder, can make dynamic later
  ];

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setVintageFilter("");
    setStatusFilter("");
    setCurrentPage(1);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const isActive = status === "Active";
    return (
      <span
        className={`rounded-[10px] text-sm font-medium px-[15px] py-[6px] ${
          isActive ? "bg-[#5b9d63] text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        {status}
      </span>
    );
  };

  // Stats card component
  const StatsCard = ({ title, value }) => (
    <div className="bg-white rounded-[5px] p-4 md:p-6 border border-gray-300">
      <div className="text-xs text-gray-500 uppercase font-medium mb-2">
        {title}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );

  // Dropdown component
  const Dropdown = ({ placeholder, value, onChange, options = [] }) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  );

  // Apply filters
  const filteredData = creditsData.filter((row) => {
    return (
      (searchTerm === "" ||
        row.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.unicId.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (vintageFilter === "" || row.vintage === vintageFilter) &&
      (statusFilter === "" || row.status === statusFilter)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, vintageFilter, statusFilter]);

  // Pagination component
  const Pagination = () => {
    if (filteredData.length <= recordsPerPage) return null;

    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;

      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push("...");
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push("...");
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages);
        }
      }

      return pages;
    };

    return (
      <div className="flex items-center justify-between px-6 py-3 bg-white border-t border-gray-200">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(endIndex, filteredData.length)}
              </span>{" "}
              of <span className="font-medium">{filteredData.length}</span>{" "}
              results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === "..." ? (
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                    </span>
                  ) : (
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(currentPage + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
            Carbon Credits Dashboard
          </h1>

          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {statsData.map((stat, index) => (
            <StatsCard key={index} title={stat.title} value={stat.value} />
          ))}
        </div>

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <Dropdown
            placeholder="Vintage"
            value={vintageFilter}
            onChange={setVintageFilter}
            options={[...new Set(creditsData.map((c) => c.vintage))]}
          />

          <Dropdown
            placeholder="Status"
            value={statusFilter}
            onChange={setStatusFilter}
            options={["Active", "Retired"]}
          />

          <button
            onClick={clearFilters}
            className="text-gray-500 hover:underline cursor-pointer whitespace-nowrap"
          >
            Clear filters
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    UNIC ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Project name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Vintage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((row, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors duration-200`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.unic_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.project_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.vintage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-blue-600 hover:underline cursor-pointer text-sm">
                        Download Retirement Certificate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredData.length === 0 && (
              <div className="p-6 text-center text-gray-500">
                No records found
              </div>
            )}
          </div>

          {/* Pagination */}
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default CarbonCreditsDashboard;
