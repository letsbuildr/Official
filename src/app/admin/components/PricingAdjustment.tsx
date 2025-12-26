"use client";

import { useState } from "react";
import { usePricingOverview, useUpdateServicePrice, useApplyInflationAdjustment } from "@/lib/api/hooks";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface PricingPlan {
  price: {
    usd: number;
    ngn: number;
  };
  duration: {
    minDays: number;
    maxDays: number;
  };
  planTitle: string;
  benefit: string[];
  _id: string;
}

interface ServiceData {
  serviceId: string;
  name: string;
  pricingPlans: PricingPlan[];
  sales: number;
  trend: string;
  lastPriceUpdate: string;
}

export default function PricingAdjustment() {
  const { data: pricingData, isLoading, error } = usePricingOverview();
  const updateServicePriceMutation = useUpdateServicePrice();
  const applyInflationMutation = useApplyInflationAdjustment();
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showInflationModal, setShowInflationModal] = useState(false);
  const [updatedPlans, setUpdatedPlans] = useState<PricingPlan[]>([]);
  const [inflationData, setInflationData] = useState({
    percentage: 5,
    currency: 'all' as 'all' | 'usd' | 'ngn',
    reason: 'annual_inflation_update'
  });

  const services: ServiceData[] = pricingData?.data || [];

  const openPriceModal = (service: ServiceData) => {
    setSelectedService(service);
    setUpdatedPlans([...service.pricingPlans]);
    setShowPriceModal(true);
  };

  const handlePriceUpdate = () => {
    if (selectedService && updatedPlans.length > 0) {
      const plansToUpdate = updatedPlans.map(plan => ({
        _id: plan._id,
        price: {
          ...(plan.price.usd !== selectedService.pricingPlans.find(p => p._id === plan._id)?.price.usd ? { usd: plan.price.usd } : {}),
          ...(plan.price.ngn !== selectedService.pricingPlans.find(p => p._id === plan._id)?.price.ngn ? { ngn: plan.price.ngn } : {})
        }
      })).filter(plan => Object.keys(plan.price).length > 0);

      if (plansToUpdate.length > 0) {
        updateServicePriceMutation.mutate({
          serviceId: selectedService.serviceId,
          plans: plansToUpdate
        });
      }
      setShowPriceModal(false);
      setSelectedService(null);
      setUpdatedPlans([]);
    }
  };

  const updatePlanPrice = (planId: string, currency: 'usd' | 'ngn', value: number) => {
    setUpdatedPlans(prev =>
      prev.map(plan =>
        plan._id === planId
          ? { ...plan, price: { ...plan.price, [currency]: value } }
          : plan
      )
    );
  };

  const handleApplyInflation = () => {
    applyInflationMutation.mutate(inflationData);
    setShowInflationModal(false);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Pricing Overview</h2>
        <p className="text-gray-600 mt-1">
          Monitor and manage service pricing across all plans
        </p>
      </div>

      {/* Services Pricing Overview */}
      <div className="space-y-6">
        {services.map((service) => (
          <div key={service.serviceId} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1">
                      {getTrendIcon(service.trend)}
                      <span className="text-sm text-gray-600 capitalize">{service.trend} trend</span>
                    </div>
                    <span className="text-sm text-gray-500">{service.sales} sales</span>
                    <span className="text-sm text-gray-500">
                      Updated {new Date(service.lastPriceUpdate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.pricingPlans.map((plan) => (
                  <div key={plan._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-900">{plan.planTitle}</h4>
                      <span className="text-xs text-gray-500">
                        {plan.duration.minDays}-{plan.duration.maxDays} days
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">USD:</span>
                        <span className="font-medium">${plan.price.usd}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">NGN:</span>
                        <span className="font-medium">₦{plan.price.ngn.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Features:</h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {plan.benefit.slice(0, 3).map((benefit, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <span className="text-green-500 mt-1">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                        {plan.benefit.length > 3 && (
                          <li className="text-gray-500">+{plan.benefit.length - 3} more features</li>
                        )}
                      </ul>
                    </div>

                    <button
                      onClick={() => openPriceModal(service)}
                      className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded text-sm font-medium transition-colors"
                    >
                      Update Pricing
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
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
          <p className="text-sm text-green-700 mb-4">Apply percentage increase to all service prices</p>
          <button
            onClick={() => setShowInflationModal(true)}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
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

      {/* Price Update Modal */}
      {showPriceModal && selectedService && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Update Pricing - {selectedService.name}
              </h3>
              <button
                onClick={() => setShowPriceModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {updatedPlans.map((plan, index) => {
                const originalPlan = selectedService.pricingPlans.find(p => p._id === plan._id);
                const hasChanges = originalPlan &&
                  (plan.price.usd !== originalPlan.price.usd || plan.price.ngn !== originalPlan.price.ngn);

                return (
                  <div key={plan._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-900">{plan.planTitle}</h4>
                      <span className="text-xs text-gray-500">
                        {plan.duration.minDays}-{plan.duration.maxDays} days
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          USD Price
                        </label>
                        <input
                          type="number"
                          value={plan.price.usd}
                          onChange={(e) => updatePlanPrice(plan._id, 'usd', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {originalPlan && (
                          <p className="text-xs text-gray-500 mt-1">Current: ${originalPlan.price.usd}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          NGN Price
                        </label>
                        <input
                          type="number"
                          value={plan.price.ngn}
                          onChange={(e) => updatePlanPrice(plan._id, 'ngn', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {originalPlan && (
                          <p className="text-xs text-gray-500 mt-1">Current: ₦{originalPlan.price.ngn.toLocaleString()}</p>
                        )}
                      </div>
                    </div>

                    {hasChanges && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-md">
                        <p className="text-sm font-medium text-blue-900">Changes:</p>
                        <div className="grid grid-cols-2 gap-4 text-sm text-blue-800 mt-1">
                          {plan.price.usd !== originalPlan.price.usd && (
                            <div>
                              USD: {plan.price.usd > originalPlan.price.usd ? "+" : ""}
                              ${Math.abs(plan.price.usd - originalPlan.price.usd)}
                            </div>
                          )}
                          {plan.price.ngn !== originalPlan.price.ngn && (
                            <div>
                              NGN: {plan.price.ngn > originalPlan.price.ngn ? "+" : ""}
                              ₦{Math.abs(plan.price.ngn - originalPlan.price.ngn).toLocaleString()}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowPriceModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePriceUpdate}
                disabled={updateServicePriceMutation.isPending}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {updateServicePriceMutation.isPending ? "Updating..." : "Update All Prices"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inflation Adjustment Modal */}
      {showInflationModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Apply Inflation Adjustment</h3>
              <button
                onClick={() => setShowInflationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  This will apply a percentage increase to all service pricing plans across the platform.
                  The change will be applied to all currencies as specified.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Percentage Increase
                  </label>
                  <input
                    type="number"
                    value={inflationData.percentage}
                    onChange={(e) => setInflationData(prev => ({ ...prev, percentage: parseInt(e.target.value) || 0 }))}
                    placeholder="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">% increase</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency Scope
                  </label>
                  <select
                    value={inflationData.currency}
                    onChange={(e) => setInflationData(prev => ({ ...prev, currency: e.target.value as 'all' | 'usd' | 'ngn' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Currencies</option>
                    <option value="usd">USD Only</option>
                    <option value="ngn">NGN Only</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason
                  </label>
                  <input
                    type="text"
                    value={inflationData.reason}
                    onChange={(e) => setInflationData(prev => ({ ...prev, reason: e.target.value }))}
                    placeholder="annual_inflation_update"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h5 className="font-medium text-yellow-900 mb-2">Confirmation</h5>
                <p className="text-sm text-yellow-800">
                  This will increase all {inflationData.currency === 'all' ? 'USD and NGN' : inflationData.currency.toUpperCase()} prices by {inflationData.percentage}% across all services.
                  This action cannot be undone.
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowInflationModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApplyInflation}
                  disabled={applyInflationMutation.isPending || inflationData.percentage <= 0}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {applyInflationMutation.isPending ? "Applying..." : `Apply ${inflationData.percentage}% Increase`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}