"use client";

import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useAllServices, useUpdateService, useDeleteService } from "@/lib/api/hooks";
import { Service, ApiResponseWithServices } from "@/lib/api/client";

export default function ServiceManagement() {
  const { data: servicesResponse } = useAllServices();
  const updateServiceMutation = useUpdateService();
  const deleteServiceMutation = useDeleteService();

  const services: Service[] = 
    servicesResponse && 'results' in servicesResponse && Array.isArray(servicesResponse.data)
      ? servicesResponse.data
      : [];

  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || service.slug === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleToggleStatus = (serviceId: string) => {
    console.log(`Toggling service ${serviceId} status`);
    // For now, we'll implement this as a simple toggle of isRecommended
    const service = services.find(s => s._id === serviceId);
    if (service) {
      updateServiceMutation.mutate({
        id: serviceId,
        updates: { isRecommended: !service.isRecommended }
      });
    }
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setShowModal(true);
  };

  const handleCreateService = () => {
    setEditingService(null);
    setShowModal(true);
  };

  const handleDeleteService = (serviceId: string) => {
    if (confirm("Are you sure you want to delete this service? This action cannot be undone.")) {
      deleteServiceMutation.mutate(serviceId);
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
              <option value="all">All Services</option>
              <option value="web-development">Web Development</option>
              <option value="data-analysis">Data Analysis</option>
              <option value="automation-services">Automation Services</option>
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
          <div key={service._id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Service Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-sm text-gray-500">{service.slug}</p>
                </div>
                <div className="flex gap-1">
                  {service.isRecommended && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      Recommended
                    </span>
                  )}
                  {service.isMostPopular && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Popular
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {service.summary}
              </p>

              {/* Pricing Info */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Starting Price:</span>
                  <span className="font-medium">
                    ₦{service.pricingPackage.pricingPlans[0]?.price.ngn.toLocaleString() || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Plans:</span>
                  <span className="font-medium">{service.pricingPackage.pricingPlans.length}</span>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1 mb-4">
                {service.whyWork.reasons.slice(0, 3).map((reason, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                  >
                    {reason.title}
                  </span>
                ))}
                {service.whyWork.reasons.length > 3 && (
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                    +{service.whyWork.reasons.length - 3} more
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
                  onClick={() => handleToggleStatus(service._id)}
                  className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                    service.isRecommended
                      ? "bg-red-50 hover:bg-red-100 text-red-700"
                      : "bg-green-50 hover:bg-green-100 text-green-700"
                  }`}
                >
                  {service.isRecommended ? "Unrecommend" : "Recommend"}
                </button>
                <button
                  onClick={() => handleDeleteService(service._id)}
                  disabled={deleteServiceMutation.isPending}
                  className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleteServiceMutation.isPending ? 'Deleting...' : <Trash2 className="w-4 h-4" />}
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
              {/* Service Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Name
                </label>
                <input
                  type="text"
                  defaultValue={editingService?.name || ""}
                  placeholder="Enter service name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Summary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summary
                </label>
                <input
                  type="text"
                  defaultValue={editingService?.summary || ""}
                  placeholder="Brief summary of the service"
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
                  placeholder="Detailed service description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  defaultValue={editingService?.slug || ""}
                  placeholder="service-slug-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Flags */}
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={editingService?.isRecommended || false}
                    className="mr-2"
                  />
                  Recommended
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={editingService?.isMostPopular || false}
                    className="mr-2"
                  />
                  Most Popular
                </label>
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