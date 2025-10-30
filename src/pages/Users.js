import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/slices/userSlice"; // adjust path if needed
import { ChevronLeft, ChevronRight } from "lucide-react";

const Users = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.users);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Inputs (controlled live)
  const [searchInput, setSearchInput] = useState("");
  const [roleInput, setRoleInput] = useState("all");
  const [statusInput, setStatusInput] = useState("all");

  // Applied filters (triggered by button)
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Fetch users on mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Filtering logic (applied only after button click)
  const filteredUsers = useMemo(() => {
    if (!Array.isArray(list)) return [];

    // If no filters are applied, don’t show anything yet
    if (
      searchTerm.trim() === ""
      // selectedRole === "all" &&
      // selectedStatus === "all"
    ) {
      return [];
    }

    return list.filter((user) => {
      const matchesSearch =
        searchTerm.trim() === "" ||
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = selectedRole === "all" || user.role === selectedRole;

      const matchesStatus =
        selectedStatus === "all" || user.status === selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [list, searchTerm, selectedRole, selectedStatus]);

  // Handlers
  const handleApplyFilters = () => {
    setSearchTerm(searchInput);
    setSelectedRole(roleInput);
    setSelectedStatus(statusInput);
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setRoleInput("all");
    setStatusInput("all");
    setSearchTerm("");
    setSelectedRole("all");
    setSelectedStatus("all");
  };

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  return (
    <div className="p-6 m-0 h-screen bg-purple-200 rounded-lg">
      <div className="sticky top-0 z-10 bg-purple-100 mt-0 h-12 border-b border-purple-500 flex items-start shadow-md rounded">
        <h2 className=" font-semibold  mt-2 text-sm text-normal text-center ml-4 ">
          User Management
        </h2>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-6 mt-2 sticky top-0 z-2">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border p-2 rounded w-60"
        />

        <select
          value={roleInput}
          onChange={(e) => setRoleInput(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <select
          value={statusInput}
          onChange={(e) => setStatusInput(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button
          onClick={handleApplyFilters}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Apply Filters
        </button>

        <button
          onClick={handleClearFilters}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Clear
        </button>
      </div>

      {/* Loading and Error States */}
      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {/* Render Filtered Users */}
      {!loading && filteredUsers.length > 0 ? (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 rounded">
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.role}</td>
                  <td className="border p-2">{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between p-4 bg-gray-50">
            <div className="text-gray-600 text-sm">
              Page <strong>{currentPage}</strong> of{" "}
              <strong>{totalPages}</strong>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white border hover:bg-gray-100"
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white border hover:bg-gray-100"
                }`}
              >
                <ChevronRight size={18} />
              </button>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Rows:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border rounded-lg px-2 py-1 outline-none"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>
          </div>
        </>
      ) : (
        !loading && (
          <p className="text-gray-500 text-center mt-4">
            {searchTerm.trim() === "" &&
            selectedRole === "all" &&
            selectedStatus === "all"
              ? "Use filters and click 'Apply Filters' to see results."
              : "No users found for the selected filters."}
          </p>
        )
      )}
    </div>
  );
};

export default Users;
