export default function WhatToExpect() {
  return (
    <div className="mt-8 bg-white shadow-lg rounded-xl p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-[#0B1E36] mb-4 text-center">What to Expect</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start">
          <div className="w-8 h-8 bg-[#0077B6] text-white rounded-full flex items-center justify-center shrink-0 mr-3 font-semibold">
            1
          </div>
          <div>
            <h4 className="font-medium text-[#0B1E36]">Confirmation Email</h4>
            <p className="text-sm text-gray-600">You&apos;ll receive a confirmation email within 24 hours</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="w-8 h-8 bg-[#0077B6] text-white rounded-full flex items-center justify-center shrink-0 mr-3 font-semibold">
            2
          </div>
          <div>
            <h4 className="font-medium text-[#0B1E36]">Meeting Link</h4>
            <p className="text-sm text-gray-600">We&apos;ll send you a video call link before the meeting</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="w-8 h-8 bg-[#0077B6] text-white rounded-full flex items-center justify-center shrink-0 mr-3 font-semibold">
            3
          </div>
          <div>
            <h4 className="font-medium text-[#0B1E36]">Free Consultation</h4>
            <p className="text-sm text-gray-600">30-minute consultation at no cost to you</p>
          </div>
        </div>
      </div>
    </div>
  );
}