import React, { useState } from "react";
import { Search, ChevronDown, User } from "lucide-react";

const CarbonCreditsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [vintageFilter, setVintageFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const statsData = [
    { title: "Total credits", value: "9,842" },
    { title: "Active", value: "7,567" },
    { title: "Retired", value: "2,275" },
    { title: "Retired in last 30 days", value: "230" },
  ];

  const tableData = [
    {
      unicId: "CC-0001-VERA-2022-001",
      projectName: "Andhra Reforestation Project",
      vintage: "2022",
      status: "Active",
    },
    {
      unicId: "CC-0002-GOLD-2023-002",
      projectName: "Sunrise Solar Farm",
      vintage: "2023",
      status: "Active",
    },
    {
      unicId: "CC-0003-VERA-2023-003",
      projectName: "Mangrove Conservation Project",
      vintage: "2023",
      status: "Retired",
    },
    {
      unicId: "CC-0004-KAAA-2023-004",
      projectName: "Wind Power Expansion",
      vintage: "2023",
      status: "Retired",
    },
    {
      unicId: "CC-0005-VERE-2024-001",
      projectName: "Kayapa Blogas Project",
      vintage: "2023",
      status: "Active",
    },
    {
      unicId: "CC-0006-SURP-2023-002",
      projectName: "Prairie Wind Project",
      vintage: "2023",
      status: "Active",
    },
    {
      unicId: "CC-0007-JANG-2024-003",
      projectName: "Cambodia Clean Water Initiative",
      vintage: "2023",
      status: "Retired",
    },
    {
      unicId: "CC-0008-POLE-2024-004",
      projectName: "Poosica Trave Reserve",
      vintage: "2023",
      status: "Retired",
    },
  ];

  const clearFilters = () => {
    setSearchTerm("");
    setVintageFilter("");
    setStatusFilter("");
  };

  const StatusBadge = ({ status }) => {
    const isActive = status === "Active";
    return (
      <span
        className={` rounded-[10px] text-sm font-medium px-[15px] py-[6px] ${
          isActive ? "bg-[#5b9d63] text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        {status}
      </span>
    );
  };

  const StatsCard = ({ title, value }) => (
    <div className="bg-white rounded-[5px] p-4 md:p-6 border border-gray-300 ">
      <div className="text-xs text-gray-500 uppercase font-medium mb-2">
        {title}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );

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

  return (
    <>
      <div className="h-18"></div>
      <div className="min-h-screen bg-white p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
              Carbon Credits Dashboard
            </h1>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* User Dropdown */}
              {/* <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <User className="h-4 w-4" />
                <span>User</span>
                <ChevronDown className="h-4 w-4" />
              </button> */}
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
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name or vintage"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <Dropdown
              placeholder="Vintage"
              value={vintageFilter}
              onChange={setVintageFilter}
              options={["2022", "2023", "2024"]}
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
                  {tableData.map((row, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition-colors duration-200`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {row.unicId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {row.projectName}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarbonCreditsDashboard;
