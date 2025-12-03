"use client";

import { useState } from "react";
import { Search, Filter, Eye, Trash2, UserCheck } from "lucide-react";
import { useAllUsers, useDeleteUser } from "../../../lib/api/hooks";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: "user" | "freelancer" | "admin";
  joinDate: string;
  status: "active" | "inactive";
  totalSpent: number;
  consultations: number;
  avatar: string;
  photo: string;
}

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const { data: usersResponse, isLoading, error } = useAllUsers();
  const deleteUserMutation = useDeleteUser();

  const users: User[] = usersResponse?.data?.data?.map((user) => ({
    id: user._id || user.id, // Use _id as string for uniqueness
    name: user.name,
    email: user.email,
    username: user.username,
    role: user.role as "user" | "freelancer" | "admin",
    joinDate: user.passwordChangedAt ? new Date(user.passwordChangedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    status: "active" as "active" | "inactive", // Assume active
    totalSpent: 0, // API doesn't provide
    consultations: user.serviceOrders?.length || 0,
    avatar: user.name.split(" ").map(n => n[0]).join("").toUpperCase(),
    photo: user.photo || 'default.jpg'
  })) || [];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleRoleChange = (userId: string, newRole: string) => {
    console.log(`Changing user ${userId} role to ${newRole}`);
    // TODO: Implement API call to update user role
    // Example: apiClient.updateUserRole(userId, newRole)
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        await deleteUserMutation.mutateAsync(userId);
      } catch (error) {
        // Error is handled by the mutation
      }
    }
  };

  const openUserView = (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-100 text-red-800";
      case "freelancer": return "bg-purple-100 text-purple-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading users: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600 mt-1">
            Manage user roles, permissions, and view user activities
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Total Users: {users.length}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Users
            </label>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="user">Normal Users</option>
              <option value="freelancer">Freelancers</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                          {user.avatar}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      disabled={true} // Temporarily disable until role update API is implemented
                      className={`text-xs font-medium px-2 py-1 rounded-full border-0 ${getRoleBadgeColor(user.role)}`}
                    >
                      <option value="user">User</option>
                      <option value="freelancer">Freelancer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>₦{user.totalSpent.toLocaleString()}</div>
                    <div>{user.consultations} consultations</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openUserView(user)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={deleteUserMutation.isPending}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deleteUserMutation.isPending ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">User Dashboard View</h3>
              <button
                onClick={() => setShowUserModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6">
              {/* User Profile */}
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-medium">
                  {selectedUser.avatar}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h4>
                  <p className="text-gray-600">{selectedUser.email}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(selectedUser.role)}`}>
                    {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                  </span>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-semibold text-gray-900">₦{selectedUser.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Data not available</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Service Orders</p>
                  <p className="text-2xl font-semibold text-gray-900">{selectedUser.consultations}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="text-2xl font-semibold text-gray-900">{new Date(selectedUser.joinDate).toLocaleDateString()}</p>
                </div>
              </div>

              {/* User Information */}
              <div className="space-y-4">
                <h5 className="font-medium text-gray-900">Account Details</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Username</p>
                    <p className="font-medium">{selectedUser.username}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Role</p>
                    <p className="font-medium capitalize">{selectedUser.role}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-medium capitalize">{selectedUser.status}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Photo</p>
                    <p className="font-medium">{selectedUser.photo}</p>
                  </div>
                </div>

                {selectedUser.consultations > 0 && (
                  <div>
                    <h5 className="font-medium text-gray-900">Service Orders ({selectedUser.consultations})</h5>
                    <p className="text-sm text-gray-600">This user has active service orders. Detailed transaction history is not available in this view.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}