"use client";
import { useState } from "react";
import Image from "next/image";

export default function AutomationServicePage() {
  const [activeIndex, setActiveIndex] = useState(1);

  const pricingPlans = [
    {
      title: "Basic Website",
      price: "₦150,000",
      aiPrice: "7–10 days",
      benefits: [
        "Up to 5 pages",
        "Responsive design",
        "Contact form",
        "1 revision",
        "Free SSL setup",
      ],
    },
    {
      title: "Standard Website",
      price: "₦350,000",
      aiPrice: "14–21 days",
      benefits: [
        "Up to 15 pages",
        "Blog integration",
        "CMS setup",
        "SEO basics",
        "2 revisions",
        "Hosting support",
      ],
    },
    {
      title: "Premium Website / E-commerce",
      price: "₦800,000+",
      aiPrice: "21–45 days",
      benefits: [
        "Unlimited pages",
        "Payment gatewayr",
        "Product catalog",
        "Admin dashboard",
        "SEO optimization",
        "Priority support",
      ],
    },
  ];

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat text-white flex flex-col md:flex-row items-center justify-between px-8 md:px-16 pt-28"
        style={{ backgroundImage: "url('/images/bg.png')" }}
      >
        {/* Overlay (optional for better contrast) */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content wrapper (above overlay) */}
        <div className="relative z-10 flex-1 text-center md:text-left">
          <div className="bg-[#00AFDB33] inline-block  px-4 py-2 mb-4 text-sm  rounded-full">
            Automation Services
          </div>
          <h3 className="mb-2   text-4xl md:text-5xl leading-tight">
            Automate. Integrate.
          </h3>
          <h3 className="mb-1 text-4xl md:text-5xl  leading-tight">
            Accelerate.
          </h3>

          <div className="text-gray-300 mt-4 mb-6 text-base max-w-md leading-relaxed">
            We streamline your business processes through smart automation and
            integrations that save time and boost efficiency
          </div>

          <div className="flex justify-center md:justify-start gap-4">
            <button className="px-10 py-2 bg-[#0077B6]  text-white  rounded-lg transition">
              Start Your Automation
            </button>
            <button className="px-10 py-2 border border-white text-white hover:bg-[#0B1E36] hover:text-[#FFFFFF] rounded-lg transition duration-300">
              View Case Studies
            </button>
          </div>
        </div>

        {/* Right side — Laptop image */}
        <div className="relative z-10 flex-1 flex justify-center md:justify-end mt-10 md:mt-0">
          <Image
            src="/images/laptop.png"
            alt="Laptop mockup"
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
          We combine technical excellence with creative vision to deliver
          websites that drive results.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Box 1 */}
          <div className="bg-white backdrop-blur-md p-6 rounded-xl hover:bg-white/20 transition cursor-pointer">
            <Image
              src="icon1.svg"
              alt="speed"
              width={40}
              height={40}
              className="mb-4 mx-auto"
            />

            <h3 className="text-xl font-semibold text-[#0B1E36] mb-2">
              Process Optimization
            </h3>
            <p className="text-[#4A5565] text-sm">
              We analyze and automate repetitive workflows to help your team
              work smarter, faster, and more efficiently.
            </p>
          </div>

          {/* Box 2 */}
          <div className="bg-white backdrop-blur-md p-6 rounded-xl hover:bg-white/20 transition cursor-pointer">
            <Image
              src="icon2.svg"
              alt="speed"
              width={40}
              height={40}
              className="mb-4 mx-auto"
            />
            <h3 className="text-xl font-semibold text-[#0B1E36] mb-2">
              System Integration
            </h3>
            <p className="text-[#4A5565] text-sm">
              Connect all your business tools and platforms seamlessly to ensure
              smooth data flow and unified performance.
            </p>
          </div>

          {/* Box 3 */}
          <div className="bg-white backdrop-blur-md p-6 rounded-xl hover:bg-white/20 transition cursor-pointer">
            <Image
              src="icon3.svg"
              alt="speed"
              width={40}
              height={40}
              className="mb-4 mx-auto"
            />

            <h3 className="text-xl font-semibold text-[#0B1E36] mb-2">
              Error Reduction
            </h3>
            <p className="text-[#4A5565] text-sm">
              Minimize manual mistakes through smart automation that enhances
              accuracy and reliability across processes.
            </p>
          </div>

          {/* Box 4 */}
          <div className="bg-white backdrop-blur-md p-6 rounded-xl hover:bg-white/20 transition cursor-pointer">
            <Image
              src="icon4.svg"
              alt="speed"
              width={40}
              height={40}
              className="mb-4 mx-auto"
            />

            <h3 className="text-xl font-semibold text-[#0B1E36] mb-2">
              Ongoing Automation Support
            </h3>
            <p className="text-[#4A5565] text-sm">
              Enjoy continuous monitoring, maintenance, and updates to keep your
              automation systems running flawlessly.
            </p>
          </div>
        </div>
      </section>

      <section
        id="why-work"
        className="relative w-full py-20 px-6 md:px-16 text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/grade.png')" }}
      >
        {/* Subtle overlay for readability */}
        <div className="absolute inset-0 bg-white/80"></div>

        {/* Content wrapper */}
        <div className="relative z-10">
          <h2 className="text-3xl mt-5 md:text-4xl text-[#0B1E36] mb-4 font-bold">
            Our Automation Process
          </h2>
          <p className="text-[#4A5565] mb-12 max-w-2xl mx-auto">
            A proven methodology that ensures quality, efficiency, and
            exceptional results.
          </p>

          {/* 5 Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="icon5.svg"
                alt="Plan"
                width={50}
                height={50}
                className="mb-4 mx-auto"
              />
              <h3 className="text-lg font-semibold mb-3 text-[#0B1E36]">
                Discover
              </h3>
              <p className="text-[#FFFFFF] text-sm max-w-xs">
                We begin by understanding your business needs and identifying
                key processes that can be automated.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="icon6.svg"
                alt="Design"
                width={50}
                height={50}
                className="mb-4 mx-auto"
              />
              <h3 className="text-lg font-semibold mb-3 text-[#0B1E36]">
                Plan
              </h3>
              <p className="text-[#FFFFFF] text-sm max-w-xs">
                Our team designs a tailored automation strategy with clear
                workflows and integration points.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="icon7.svg"
                alt="Develop"
                width={50}
                height={50}
                className="mb-4 mx-auto"
              />
              <h3 className="text-lg font-semibold mb-3 text-[#0B1E36]">
                Integrate
              </h3>
              <p className="text-[#FFFFFF] text-sm max-w-xs">
                We connect your tools, apps, and systems to create a seamless,
                automated environment.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="icon8.svg"
                alt="Launch"
                width={50}
                height={50}
                className="mb-4 mx-auto"
              />
              <h3 className="text-lg font-semibold mb-3 text-[#0B1E36]">
                Test
              </h3>
              <p className="text-[#FFFFFF] text-sm max-w-xs">
                Every workflow is tested thoroughly to ensure reliability,
                accuracy, and efficiency.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="flex flex-col items-center text-center">
              <Image
                src="icon9.svg"
                alt="Support"
                width={50}
                height={50}
                className="mb-4 mx-auto"
              />
              <h3 className="text-lg font-semibold mb-3 text-[#0B1E36]">
                Support
              </h3>
              <p className="text-[#FFFFFF] text-sm max-w-xs">
                We provide continuous maintenance and optimization to keep your
                automation running smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="recent-jobs"
        className="w-full py-20 px-6 md:px-16 bg-[#0B1E36] "
      >
        {/* Section Title */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Recent Jobs
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-center mb-4">
            Explore our portfolio of successful web projects across various
            industries.
          </p>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Job 1 */}
          <div className="relative group rounded-xl overflow-hidden h-[300px]">
            <Image
              src="/images/project1.png"
              alt="Project Alpha"
              width={600}
              height={450} // match container height
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white p-6 flex flex-col">
              <h3 className="text-xl font-semibold text-[#0B1E36] mb-2">
                Modern Business Website
              </h3>
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <span className="w-8 h-1 bg-blue-500 inline-block"></span>{" "}
                {/* horizontal line */}
                Corporate
              </p>
            </div>
          </div>

          {/* Job 2 */}
          <div className="relative group rounded-xl overflow-hidden h-[300px]">
            <Image
              src="/images/project2.png"
              alt="Project Beta"
              width={600}
              height={450}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white p-6 flex flex-col ">
              <h3 className="text-xl font-semibold text-[#0B1E36] mb-2">
                E-commerce Platform
              </h3>
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <span className="w-8 h-1 bg-blue-500 inline-block"></span>{" "}
                {/* horizontal line */}
                Retail
              </p>
            </div>
          </div>

          {/* Job 3 */}
          <div className="relative group rounded-xl overflow-hidden h-[300px]">
            <Image
              src="/images/project3.png"
              alt="Project Gamma"
              width={600}
              height={450}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white p-6 flex flex-col ">
              <h3 className="text-xl font-semibold text-[#0B1E36] mb-2">
                SaaS Dashboard
              </h3>
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <span className="w-8 h-1 bg-blue-500 inline-block"></span>{" "}
                {/* horizontal line */}
                Technology
              </p>
            </div>
          </div>

          {/* Job 4 */}
          <div className="relative group rounded-xl overflow-hidden h-[300px]">
            <Image
              src="/images/project4.png"
              alt="Project Delta"
              width={600}
              height={450}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white p-6 flex flex-col">
              <h3 className="text-xl font-semibold text-[#0B1E36] mb-2">
                Portfolio Website
              </h3>
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <span className="w-8 h-1 bg-blue-500 inline-block"></span>{" "}
                {/* horizontal line */}
                Creative
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 px-6 md:px-16 text-center bg-gradient-to-b from-[#F8FBFF] to-white">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0B1E36] mb-4">
          Our Pricing Packages
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Transparent pricing designed to fit businesses of all sizes.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white shadow-md rounded-xl p-6 md:p-8 h-[500px] w-72 transform transition-all duration-300 border-2 ${
                activeIndex === index
                  ? "border-[#0077B6] scale-105 z-20"
                  : "border-transparent hover:border-[#0077B6] scale-95 z-10"
              } cursor-pointer`}
              onClick={() => setActiveIndex(index)}
            >
              {/* Recommended Tag */}
              {activeIndex === index && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#0077B6] text-white text-xs font-medium px-3 py-1 rounded-b-2xl shadow-md">
                  Recommended
                </div>
              )}

              <h3 className="text-lg font-semibold text-[#0B1E36]  mb-4">
                {plan.title}
              </h3>

              {/* Main Price */}
              <div className="mb-4">
                <p className="text-3xl font-bold text-[#0077B6] flex items-baseline justify-center gap-1">
                  <span className="text-base"></span>
                  {plan.price}
                  <span className="text-sm text-gray-500 font-normal">/mo</span>
                </p>

                {/* AI Price */}
                <p className="text-sm mt-3 text-gray-400 font-medium">
                  {plan.aiPrice}
                </p>
              </div>

              {/* Benefits */}
              <ul className="text-gray-600 text-sm space-y-3 text-left pl-4">
                {plan.benefits.map((benefit, i) => (
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
                className={`px-10 mt-8 py-3 w-full font-medium rounded-lg border transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-[#0077B6] text-white border-[#0077B6]"
                    : "bg-white text-[#0077B6] border-[#0077B6] hover:bg-[#0077B6] hover:text-white"
                }`}
              >
                Start Your Project
              </button>
            </div>
          ))}
        </div>
      </section>

      <section
        id="news"
        className="relative w-full py-20 px-6 md:px-16 text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/Gradient.png')" }}
      >
        {/* Optional white overlay to make text readable */}

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl  text-[#FFFFFF] mb-4">
            Ready to Automate Your Business?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Let’s simplify your operations with intelligent automation
          </p>
          <div className="flex justify-center items-center gap-4 mb-12">
            <button className="px-8 py-3 rounded-lg bg-[#FFFFFF] text-[#0077B6] font-medium border border-[#0077B6] hover:bg-white hover:text-[#0B1E36] transition-all duration-300">
              Start Your Automation
            </button>
            <button className="px-8 py-3 rounded-lg  text-[#FFFFFF] font-medium border border-[#FFFFFF]  hover:text-white transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
