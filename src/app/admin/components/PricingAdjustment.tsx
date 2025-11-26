"use client";

import { useState } from "react";

interface ServicePricing {
  id: number;
  title: string;
  currentPrice: number;
  category: string;
  sales: number;
  trend: "up" | "down" | "stable";
  lastUpdated: string;
}

interface Promotion {
  id: number;
  title: string;
  description: string;
  discount: number;
  type: "percentage" | "fixed";
  startDate: string;
  endDate: string;
  applicableServices: string[];
  status: "active" | "scheduled" | "expired";
}

export default function PricingAdjustment() {
  const [selectedTab, setSelectedTab] = useState("pricing");
  const [selectedService, setSelectedService] = useState<ServicePricing | null>(null);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showPromotionModal, setShowPromotionModal] = useState(false);

  const [services] = useState<ServicePricing[]>([
    {
      id: 1,
      title: "Web Development Service",
      currentPrice: 350000,
      category: "Development",
      sales: 45,
      trend: "up",
      lastUpdated: "2024-11-01"
    },
    {
      id: 2,
      title: "Data Analysis Service",
      currentPrice: 150000,
      category: "Analytics",
      sales: 32,
      trend: "stable",
      lastUpdated: "2024-10-15"
    },
    {
      id: 3,
      title: "Automation Setup",
      currentPrice: 200000,
      category: "Automation",
      sales: 28,
      trend: "up",
      lastUpdated: "2024-10-20"
    },
    {
      id: 4,
      title: "UI/UX Design",
      currentPrice: 120000,
      category: "Design",
      sales: 19,
      trend: "down",
      lastUpdated: "2024-09-30"
    },
    {
      id: 5,
      title: "Mobile App Development",
      currentPrice: 500000,
      category: "Development",
      sales: 15,
      trend: "stable",
      lastUpdated: "2024-11-05"
    }
  ]);

  const [promotions] = useState<Promotion[]>([
    {
      id: 1,
      title: "Black Friday Sale",
      description: "50% off all development services",
      discount: 50,
      type: "percentage",
      startDate: "2024-11-24",
      endDate: "2024-11-30",
      applicableServices: ["Web Development Service", "Mobile App Development"],
      status: "active"
    },
    {
      id: 2,
      title: "New Year Promotion",
      description: "₦25,000 off analytics services",
      discount: 25000,
      type: "fixed",
      startDate: "2024-12-15",
      endDate: "2025-01-15",
      applicableServices: ["Data Analysis Service"],
      status: "scheduled"
    }
  ]);

  const [newPrice, setNewPrice] = useState("");
  const [priceReason, setPriceReason] = useState("");

  const handlePriceUpdate = () => {
    if (selectedService && newPrice) {
      console.log(`Updating ${selectedService.title} price to ₦${parseInt(newPrice).toLocaleString()}`);
      console.log(`Reason: ${priceReason}`);
      setShowPriceModal(false);
      setSelectedService(null);
      setNewPrice("");
      setPriceReason("");
    }
  };

  const openPriceModal = (service: ServicePricing) => {
    setSelectedService(service);
    setNewPrice(service.currentPrice.toString());
    setPriceReason("");
    setShowPriceModal(true);
  };

  const handlePromotionToggle = (promotionId: number) => {
    console.log(`Toggling promotion ${promotionId}`);
  };

  const handlePromotionDelete = (promotionId: number) => {
    if (confirm("Are you sure you want to delete this promotion?")) {
      console.log(`Deleting promotion ${promotionId}`);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return (
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case "down":
        return (
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "expired": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Pricing Adjustment</h2>
        <p className="text-gray-600 mt-1">
          Manage service pricing, promotions, and discount strategies
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setSelectedTab("pricing")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              selectedTab === "pricing"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Service Pricing
          </button>
          <button
            onClick={() => setSelectedTab("promotions")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              selectedTab === "promotions"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Promotions
          </button>
        </nav>
      </div>

      {/* Service Pricing Tab */}
      {selectedTab === "pricing" && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Service Price Management</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sales
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trend
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {services.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{service.title}</div>
                          <div className="text-sm text-gray-500">{service.category}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₦{service.currentPrice.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {service.sales}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getTrendIcon(service.trend)}
                          <span className="ml-1 text-sm text-gray-900 capitalize">{service.trend}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(service.lastUpdated).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openPriceModal(service)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Update Price
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Bulk Price Adjustment</h4>
              <p className="text-sm text-blue-700 mb-4">Apply price changes to multiple services at once</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Bulk Update
              </button>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Inflation Adjustment</h4>
              <p className="text-sm text-green-700 mb-4">Adjust prices based on inflation rate</p>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Apply Inflation
              </button>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Competitive Analysis</h4>
              <p className="text-sm text-purple-700 mb-4">Compare your prices with market rates</p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Analyze Market
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Promotions Tab */}
      {selectedTab === "promotions" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Active Promotions</h3>
            <button
              onClick={() => setShowPromotionModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Create Promotion
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promotions.map((promotion) => (
              <div key={promotion.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{promotion.title}</h4>
                    <p className="text-sm text-gray-600">{promotion.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(promotion.status)}`}>
                    {promotion.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Discount:</span>
                    <span className="font-medium">
                      {promotion.type === "percentage" ? `${promotion.discount}%` : `₦${promotion.discount.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Start Date:</span>
                    <span>{new Date(promotion.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">End Date:</span>
                    <span>{new Date(promotion.endDate).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 block mb-2">Applicable Services:</span>
                    <div className="flex flex-wrap gap-1">
                      {promotion.applicableServices.map((service, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handlePromotionToggle(promotion.id)}
                    className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                      promotion.status === "active"
                        ? "bg-red-50 hover:bg-red-100 text-red-700"
                        : "bg-green-50 hover:bg-green-100 text-green-700"
                    }`}
                  >
                    {promotion.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => handlePromotionDelete(promotion.id)}
                    className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Update Modal */}
      {showPriceModal && selectedService && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Update Service Price</h3>
              <button
                onClick={() => setShowPriceModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900">{selectedService.title}</h4>
                <p className="text-sm text-gray-600">Current Price: ₦{selectedService.currentPrice.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Sales: {selectedService.sales}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Price (₦)
                </label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="Enter new price"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Price Change
                </label>
                <textarea
                  value={priceReason}
                  onChange={(e) => setPriceReason(e.target.value)}
                  rows={3}
                  placeholder="Explain why this price change is necessary (e.g., inflation, competitive pricing, value increase)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {newPrice && selectedService && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium text-blue-900 mb-2">Price Change Summary</h5>
                  <div className="space-y-1 text-sm text-blue-800">
                    <div className="flex justify-between">
                      <span>Current Price:</span>
                      <span>₦{selectedService.currentPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>New Price:</span>
                      <span>₦{parseInt(newPrice || "0").toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Change:</span>
                      <span className={parseInt(newPrice || "0") > selectedService.currentPrice ? "text-green-600" : "text-red-600"}>
                        {parseInt(newPrice || "0") > selectedService.currentPrice ? "+" : ""}
                        ₦{(parseInt(newPrice || "0") - selectedService.currentPrice).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Percentage:</span>
                      <span className={parseInt(newPrice || "0") > selectedService.currentPrice ? "text-green-600" : "text-red-600"}>
                        {parseInt(newPrice || "0") > selectedService.currentPrice ? "+" : ""}
                        {(((parseInt(newPrice || "0") - selectedService.currentPrice) / selectedService.currentPrice) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPriceModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handlePriceUpdate}
                  disabled={!newPrice || !priceReason}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Update Price
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Promotion Modal */}
      {showPromotionModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create New Promotion</h3>
              <button
                onClick={() => setShowPromotionModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promotion Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Black Friday Sale"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₦)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe the promotion details"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Value
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Applicable Services
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {services.map((service) => (
                    <label key={service.id} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{service.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPromotionModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create Promotion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}