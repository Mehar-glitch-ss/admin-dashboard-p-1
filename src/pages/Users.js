// src/pages/Users.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/slices/userSlice";
import {
  Search,
  Eye,
  Ban,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Users = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.users);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // ✅ Fetch users when component mounts
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // ✅ Filter users dynamically
  useEffect(() => {
    if (Array.isArray(list)) {
      const filtered = list.filter(
        (user) =>
          user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
      setCurrentPage(1); // reset to first page when search changes
    }
  }, [list, searchTerm]);

  // ✅ Pagination setup
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Management</h2>

      {/* 🔍 Search Bar */}
      <div className="flex items-center bg-white p-3 rounded-xl shadow-md w-full max-w-md mb-6">
        <Search className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full outline-none text-gray-700"
        />
      </div>

      {/* 🔄 Loading/Error States */}
      {loading && <p className="text-gray-600">Loading users...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {/* 📋 Users Table */}
      {!loading && currentUsers.length > 0 ? (
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {user.name}
                  </td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.role}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center flex items-center justify-center gap-3">
                    <button
                      className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200"
                      title="View"
                    >
                      <Eye className="text-blue-600 w-5 h-5" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200"
                      title="Suspend"
                    >
                      <Ban className="text-yellow-600 w-5 h-5" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-red-100 hover:bg-red-200"
                      title="Delete"
                    >
                      <Trash2 className="text-red-600 w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 🔢 Pagination Controls */}
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
            </div>

            {/* Rows per page dropdown */}
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
      ) : (
        !loading && (
          <div className="p-4 text-center text-gray-500">No users found.</div>
        )
      )}
    </div>
  );
};

export default Users;
