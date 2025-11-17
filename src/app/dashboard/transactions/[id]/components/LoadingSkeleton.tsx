"use client";

export default function LoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Skeleton */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
        </div>
      </div>

      {/* Amount Card Skeleton */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-gray-200 px-6 py-8 animate-pulse">
          <div className="h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
          <div className="h-8 bg-gray-300 rounded animate-pulse mb-3"></div>
          <div className="w-24 h-6 bg-gray-300 rounded animate-pulse mx-auto"></div>
        </div>
      </div>

      {/* Detail Sections Skeleton */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 mb-4 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="px-6 pb-6">
            <div className="space-y-4">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex gap-3">
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex-1 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}