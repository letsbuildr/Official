"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useServiceBySlug, useStartPayment } from "@/lib/api/hooks";
import { useAuthContext } from "@/lib/api/auth-context";

export default function AutomationServicePage() {
  const { data: serviceResponse, isLoading, error } = useServiceBySlug('automation-services');
  const startPayment = useStartPayment();
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(1);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error || !serviceResponse?.data) {
    return <div className="min-h-screen flex items-center justify-center">Error loading service</div>;
  }

  const service = serviceResponse.data.data;

  const handleChoosePlan = (plan: { planTitle: string; price: { usd: number; ngn: number } }) => {
    if (!isAuthenticated) {
      router.push('/sign-in');
      return;
    }

    startPayment.mutate({
      serviceId: service._id,
      planType: plan.planTitle,
      currency: 'ngn',
    });
  };

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat text-white flex flex-col md:flex-row items-center justify-between px-8 md:px-16 pt-28"
        style={{ backgroundImage: `url('/images/bg.png')` }}
      >
        {/* Overlay (optional for better contrast) */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content wrapper (above overlay) */}
        <div className="relative z-10 flex-1 text-center md:text-left">
          <div className="bg-[#00AFDB33] inline-block  px-4 py-2 mb-4 text-sm  rounded-full">
            {service.name}
          </div>
          <h3 className="mb-2   text-4xl md:text-5xl leading-tight">
            {service.summary.split(' ').slice(0, 3).join(' ')}
          </h3>
          <h3 className="mb-1 text-4xl md:text-5xl  leading-tight">
            {service.summary.split(' ').slice(3).join(' ')}
          </h3>

          <div className="text-gray-300 mt-4 mb-6 text-base max-w-md leading-relaxed">
            {service.description}
          </div>

          <div className="flex justify-center md:justify-start gap-4">
            <a
              href="https://wa.me/2347070094167?text=Hello%20Bomcel%20Digital"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-2 bg-[#0077B6] text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-[#005F91] hover:shadow-lg cursor-pointer"
            >
              {service.heroButtons.primary}
            </a>

            <a
              href="#recent-jobs"
              className="px-10 py-2 border border-white text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-[#0B1E36] hover:shadow-lg cursor-pointer"
            >
              {service.heroButtons.secondary}
            </a>
          </div>
        </div>

        {/* Right side — Laptop image */}
        <div className="relative z-10 flex-1 flex justify-center md:justify-end mt-10 md:mt-0">
          <Image
            src={"/images/devices.png"}
            alt="Service mockup"
            width={600}
            height={600}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </section>

      <section
        id="why-work"
        className="w-full bg-[#0B1E36] py-20 px-6 md:px-16 text-center"
      >
        <h2 className="text-3xl md:text-4xl text-white mb-4">
          Why Work With Bomcel Digital
        </h2>
        <p className="text-white max-w-2xl mx-auto mb-12">
          {service.whyWork.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {service.whyWork.reasons.map((reason) => (
            <div
              key={reason._id}
              className="group bg-white backdrop-blur-md p-6 rounded-xl hover:bg-white/20 transition cursor-pointer"
            >
              <Image
                src="/icon3.svg"
                alt={reason.title}
                width={40}
                height={40}
                className="mb-4 mx-auto"
              />
              <h3 className="text-xl font-semibold text-[#0B1E36] mb-2 group-hover:text-white transition-colors">
                {reason.title}
              </h3>
              <p className="text-[#4A5565] text-sm group-hover:text-white transition-colors">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="process"
        className="relative w-full py-20 px-6 md:px-16 text-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/grade.png')",
        }}
      >
        {/* Subtle overlay for readability */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Content wrapper */}
        <div className="relative z-10">
          <h2 className="text-3xl mt-5 md:text-4xl text-[#0B1E36] mb-4 font-bold">
            {service.process.title}
          </h2>
          <p className="text-[#4A5565] mb-12 max-w-2xl mx-auto">
            {service.process.description}
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12">
            {service.process.steps.map((step) => (
              <div
                key={step._id}
                className="flex flex-col items-center text-center"
              >
                <Image
                  src="/icon2.svg"
                  alt={step.title}
                  width={50}
                  height={50}
                  className="mb-4 mx-auto"
                />
                <h3 className="text-lg font-semibold mb-3 text-[#0B1E36]">
                  {step.title}
                </h3>
                <p className="text-[#FFFFFF] text-sm max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="recent-jobs"
        className="w-full py-20 px-6 md:px-16 bg-[#0B1E36] "
      >
        {/* Projects Section Title */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Recent Jobs
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-center mb-4">
            {service.recentProjects.subtitle}
          </p>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {service.recentProjects.projects.map((project) => (
            <div
              key={project._id}
              className="relative group rounded-xl overflow-hidden h-[300px]"
            >
              <Image
                src="/images/project2.png"
                alt={project.title}
                width={600}
                height={450}
                className="w-full h-[60%] object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 w-full h-[40%] bg-white p-6 flex flex-col">
                <h3 className="text-xl font-semibold text-[#0B1E36] mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm flex items-center gap-2">
                  <span className="w-8 h-1 bg-blue-500 inline-block"></span>{" "}
                  {project.industry}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full py-20 px-6 md:px-16 text-center bg-linear-to-b from-[#F8FBFF] to-white">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0B1E36] mb-4">
          {service.pricingPackage.title}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          {service.pricingPackage.subtitle}
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {service.pricingPackage.pricingPlans.map((plan, index) => (
            <div
              key={plan._id}
              className={`relative bg-white shadow-md rounded-xl p-6 md:p-8 h-[500px] w-80 transform transition-all duration-300 border-2 ${
                activeIndex === index
                  ? "border-[#0077B6] scale-105 z-20"
                  : "border-transparent hover:border-[#0077B6] scale-95 z-10"
              } cursor-pointer`}
              onClick={() => setActiveIndex(index)}
            >
              {/* Recommended Tag */}
              {activeIndex === index && (
                <div className="absolute -top-[15px] left-1/2 -translate-x-1/2 bg-[#0077B6] text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
                  Recommended
                </div>
              )}

              <div className="text-center max-w-2xl mx-auto mb-8">
                <h3 className="text-lg font-semibold text-[#0B1E36]  mb-2">
                  {plan.planTitle}
                </h3>
                <p className="text-[#4A5565] text-sm md:text-base">
                  {plan.planTitle}
                </p>
              </div>

              {/* Main Price */}
              <div className="mb-4">
                <p className="text-3xl font-bold text-[#0077B6] flex items-baseline justify-center gap-1">
                  <span className="text-base">₦</span>
                  {plan.price.ngn.toLocaleString()}
                  <span className="text-sm text-gray-500 font-normal">
                    /{plan.duration.minDays}-{plan.duration.maxDays} days
                  </span>
                </p>
              </div>

              {/* Benefits */}
              <ul className="text-gray-600 text-sm space-y-3 text-left pl-4">
                {plan.benefit.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Image
                      src="/Margin.png"
                      alt="check"
                      width={18}
                      height={18}
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                onClick={() => handleChoosePlan(plan)}
                disabled={startPayment.isPending}
                className={`px-10 mt-8 py-3 w-full font-medium rounded-lg border transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-[#0077B6] text-white border-[#0077B6]"
                    : "bg-white text-[#0077B6] border-[#0077B6] hover:bg-[#0077B6] hover:text-white"
                } ${startPayment.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {startPayment.isPending ? 'Processing...' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section
        id="ready"
        className="relative w-full py-20 px-6 md:px-16 text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/Gradient.png')" }}
      >
        {/* Optional white overlay to make text readable */}

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl  text-[#FFFFFF] mb-4">
            {service.readySection.title}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            {service.readySection.description}
          </p>
          <div className="flex justify-center items-center gap-4 mb-12">
            <a
              href="https://wa.me/2347070094167?text=Hello%20Bomcel%20Digital"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg bg-[#FFFFFF] text-[#0077B6] font-medium border border-[#0077B6] hover:bg-white hover:text-[#0B1E36] transition-all duration-300 cursor-pointer"
            >
              {service.readySection.readyButton.primary}
            </a>
            <a
              href="../contact"
              className="px-8 py-3 rounded-lg  text-[#FFFFFF] font-medium border border-[#FFFFFF]  hover:text-white transition-all duration-300"
            >
              {service.readySection.readyButton.secondary}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
