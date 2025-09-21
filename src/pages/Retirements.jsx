// import React from "react";
// import { Download } from "lucide-react";
// import creditsData from "../data/credits.json";

// const Retirements = () => {
//   // Filter only retired credits from the JSON data
//   const retirementData = creditsData.filter(
//     (credit) => credit.status && credit.status.toLowerCase() === "retired"
//   );

//   const StatusBadge = ({ status }) => (
//     <span className="bg-gray-100 text-gray-700 rounded-md px-2 py-1 text-sm font-medium">
//       {status}
//     </span>
//   );

//   const handleDownload = () => {
//     // Convert data to CSV format and trigger download
//     const headers = ["UNIC ID", "Vintage", "Status"];
//     const rows = retirementData.map((row) => [
//       row.unicId,
//       row.vintage,
//       row.status,
//     ]);

//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map((e) => e.join(",")).join("\n");

//     const link = document.createElement("a");
//     link.setAttribute("href", encodeURI(csvContent));
//     link.setAttribute("download", "retirements.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <>
//       <div className="h-22"></div>
//       <div className="min-h-screen bg-white">
//         <div className="mx-auto max-w-5xl p-6">
//           {/* Header Section */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
//             <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
//               Retirements
//             </h1>

//             <button
//               onClick={handleDownload}
//               className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 hover:text-gray-900 rounded-lg px-4 py-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <Download className="h-4 w-4" />
//               <span>Download</span>
//             </button>
//           </div>

//           {/* Table Section */}
//           <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                       UNIC ID
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                       Vintage
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                       Status Badge
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {retirementData.map((row, index) => (
//                     <tr
//                       key={index}
//                       className="hover:bg-gray-50 transition-colors duration-200"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                         <div className="text-sm sm:text-base font-medium text-gray-900">
//                           {row.unic_id}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                         <div className="text-sm sm:text-base text-gray-900">
//                           {row.vintage}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                         <div className="text-sm sm:text-base text-gray-900">
//                           {row.status}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
//                         <StatusBadge status={row.status} />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Summary Section */}
//           <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg">
//             <div className="text-sm text-gray-600 mb-2 sm:mb-0">
//               Showing {retirementData.length} retired credits
//             </div>
//             <div className="text-sm font-medium text-gray-900">
//               Total Retired: {retirementData.length} credits
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Retirements;

import React, { useState } from "react";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import creditsData from "../data/credits.json";

const Retirements = () => {
  // Filter only retired credits from the JSON data
  const retirementData = creditsData.filter(
    (credit) => credit.status && credit.status.toLowerCase() === "retired"
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  // Calculate pagination values
  const totalPages = Math.ceil(retirementData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = retirementData.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show subset of pages with current page in center
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);

      // Adjust start if we're near the end
      if (end - start < maxVisiblePages - 1) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      // Add first page and ellipsis if needed
      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push("...");
        }
      }

      // Add visible page numbers
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add last page and ellipsis if needed
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const StatusBadge = ({ status }) => (
    <span className="bg-gray-100 text-gray-700 rounded-md px-2 py-1 text-sm font-medium">
      {status}
    </span>
  );

  const handleDownload = () => {
    // Convert data to CSV format and trigger download
    const headers = ["UNIC ID", "Vintage", "Status"];
    const rows = retirementData.map((row) => [
      row.unic_id,
      row.vintage,
      row.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "retirements.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="h-22"></div>
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-5xl p-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
              Retirements
            </h1>

            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 hover:text-gray-900 rounded-lg px-4 py-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
          </div>

          {/* Table Section */}
          <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      UNIC ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Vintage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Status Badge
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.map((row, index) => (
                    <tr
                      key={startIndex + index}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        <div className="text-sm sm:text-base font-medium text-gray-900">
                          {row.unic_id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        <div className="text-sm sm:text-base text-gray-900">
                          {row.vintage}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        <div className="text-sm sm:text-base text-gray-900">
                          {row.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        <StatusBadge status={row.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Section */}
          {totalPages > 1 && (
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-gray-600 mb-4 sm:mb-0">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, retirementData.length)} of{" "}
                {retirementData.length} entries
              </div>

              <div className="flex items-center space-x-2">
                {/* Previous Button */}
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-colors duration-200 ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                      {page === "..." ? (
                        <span className="px-3 py-2 text-sm text-gray-500">
                          ...
                        </span>
                      ) : (
                        <button
                          onClick={() => goToPage(page)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors duration-200 ${
                            currentPage === page
                              ? "bg-blue-50 text-blue-600 border-blue-200"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          {page}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg border transition-colors duration-200 ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          )}

          {/* Summary Section */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 mb-2 sm:mb-0">
              Page {currentPage} of {totalPages}
            </div>
            <div className="text-sm font-medium text-gray-900">
              Total Retired: {retirementData.length} credits
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Retirements;
