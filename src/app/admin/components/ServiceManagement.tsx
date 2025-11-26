"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  status: "active" | "inactive";
  sales: number;
  rating: number;
  image?: string;
  tags: string[];
  paymentPlans: string[];
}

export default function ServiceManagement() {
  const [services] = useState<Service[]>([
    {
      id: 1,
      title: "Web Development Service",
      description: "Complete web development solution from design to deployment",
      price: 350000,
      category: "Development",
      status: "active",
      sales: 45,
      rating: 4.8,
      tags: ["React", "Node.js", "MongoDB"],
      paymentPlans: ["Full Payment", "50/50 Split", "Monthly"]
    },
    {
      id: 2,
      title: "Data Analysis Service",
      description: "Professional data analysis and business intelligence",
      price: 150000,
      category: "Analytics",
      status: "active",
      sales: 32,
      rating: 4.6,
      tags: ["Python", "Tableau", "SQL"],
      paymentPlans: ["Full Payment", "Monthly"]
    },
    {
      id: 3,
      title: "Automation Setup",
      description: "Business process automation and workflow optimization",
      price: 200000,
      category: "Automation",
      status: "active",
      sales: 28,
      rating: 4.7,
      tags: ["Zapier", "API", "Workflows"],
      paymentPlans: ["Full Payment", "50/50 Split"]
    },
    {
      id: 4,
      title: "UI/UX Design",
      description: "User interface and experience design services",
      price: 120000,
      category: "Design",
      status: "inactive",
      sales: 19,
      rating: 4.9,
      tags: ["Figma", "Adobe XD", "Prototyping"],
      paymentPlans: ["Full Payment"]
    }
  ]);

  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const categories = ["all", "Development", "Analytics", "Automation", "Design"];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || service.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleToggleStatus = (serviceId: number) => {
    console.log(`Toggling service ${serviceId} status`);
    // Here you would typically make an API call
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setShowModal(true);
  };

  const handleCreateService = () => {
    setEditingService(null);
    setShowModal(true);
  };

  const handleDeleteService = (serviceId: number) => {
    if (confirm("Are you sure you want to delete this service? This action cannot be undone.")) {
      console.log(`Deleting service ${serviceId}`);
      // Here you would typically make an API call
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Service Management</h2>
          <p className="text-gray-600 mt-1">
            Create, edit, and manage platform services
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleCreateService}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Service
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Services
            </label>
            <input
              type="text"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Service Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                  <p className="text-sm text-gray-500">{service.category}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  service.status === "active" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}>
                  {service.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {service.description}
              </p>

              {/* Price and Stats */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Price:</span>
                  <span className="font-medium">₦{service.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Sales:</span>
                  <span className="font-medium">{service.sales}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Rating:</span>
                  <div className="flex items-center">
                    <span className="font-medium">{service.rating}</span>
                    <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {service.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                  >
                    {tag}
                  </span>
                ))}
                {service.tags.length > 3 && (
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                    +{service.tags.length - 3} more
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditService(service)}
                  className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleToggleStatus(service.id)}
                  className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                    service.status === "active"
                      ? "bg-red-50 hover:bg-red-100 text-red-700"
                      : "bg-green-50 hover:bg-green-100 text-green-700"
                  }`}
                >
                  {service.status === "active" ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => handleDeleteService(service.id)}
                  className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingService ? "Edit Service" : "Create New Service"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-4">
              {/* Service Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Title
                </label>
                <input
                  type="text"
                  defaultValue={editingService?.title || ""}
                  placeholder="Enter service title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  defaultValue={editingService?.description || ""}
                  placeholder="Enter service description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Price and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₦)
                  </label>
                  <input
                    type="number"
                    defaultValue={editingService?.price || ""}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    defaultValue={editingService?.category || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Category</option>
                    <option value="Development">Development</option>
                    <option value="Analytics">Analytics</option>
                    <option value="Automation">Automation</option>
                    <option value="Design">Design</option>
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  defaultValue={editingService?.tags.join(", ") || ""}
                  placeholder="React, Node.js, MongoDB"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Payment Plans */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Plans (comma separated)
                </label>
                <input
                  type="text"
                  defaultValue={editingService?.paymentPlans.join(", ") || ""}
                  placeholder="Full Payment, 50/50 Split, Monthly"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingService ? "Update Service" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}