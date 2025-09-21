import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import creditsData from "../data/credits.json";

const CarbonCreditsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [vintageFilter, setVintageFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCredit, setSelectedCredit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    { title: "Retired in last 30 days", value: "2" },
  ];

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setVintageFilter("");
    setStatusFilter("");
    setCurrentPage(1);
  };

  // Open modal with credit details
  const openModal = (credit) => {
    setSelectedCredit(credit);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCredit(null);
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

  // Modal component
  const Modal = () => {
    if (!isModalOpen || !selectedCredit) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 transition-opacity"
          onClick={closeModal}
        ></div>

        {/* Modal */}
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Carbon Credit Details
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* UNIC ID and Status */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {selectedCredit.unic_id}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {selectedCredit.project_name}
                  </p>
                </div>
                <StatusBadge status={selectedCredit.status} />
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      UNIC ID
                    </h5>
                    <p className="mt-1 text-gray-900">
                      {selectedCredit.unic_id}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Project Name
                    </h5>
                    <p className="mt-1 text-gray-900">
                      {selectedCredit.project_name}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Vintage
                    </h5>
                    <p className="mt-1 text-gray-900">
                      {selectedCredit.vintage}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </h5>
                    <p className="mt-1 text-gray-900">
                      {selectedCredit.status}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Display any additional fields that exist in your JSON data */}
                  {Object.entries(selectedCredit).map(([key, value]) => {
                    // Skip the fields we're already displaying
                    if (
                      ["unic_id", "project_name", "vintage", "status"].includes(
                        key
                      )
                    ) {
                      return null;
                    }

                    // Format the field name for display
                    const fieldName = key
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase());

                    return (
                      <div key={key}>
                        <h5 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                          {fieldName}
                        </h5>
                        <p className="mt-1 text-gray-900">{value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Download Certificate
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Apply filters
  const filteredData = creditsData.filter((row) => {
    return (
      (searchTerm === "" ||
        row.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.unic_id.toLowerCase().includes(searchTerm.toLowerCase())) &&
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
    <>
      <div className="h-18"></div>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-[url('/hex.jpg')] bg-fit h-[400px] bg-center opacity-[6%]"></div>
        <div className="relative z-10 p-4 md:p-6 ">
          <div className="max-w-7xl mx-auto ">
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => openModal(row)}
                            className="text-black hover:text-gray-700 hover:underline cursor-pointer"
                          >
                            {row.unic_id}
                          </button>
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
      </div>

      {/* Modal */}
      <Modal />
    </>
  );
};

export default CarbonCreditsDashboard;
