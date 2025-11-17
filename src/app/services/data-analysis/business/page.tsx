"use client";
import { useState } from "react";
import Image from "next/image";

export default function AutomationServicePage() {
  const [activeIndex, setActiveIndex] = useState(1);

  const pricingPlans = [
    {
      title: "Basic",
      subtitle: "Dashboard Setup",
      price: "₦150,000",
      aiPrice: "5–7 days",
      benefits: [
        "Setup of key business dashboards",
        "Basic data aggregation and visualization",
        "Summary report with insights",
        "1 revision included",
        "Email support",
        "Quick delivery",
      ],
    },
    {
      title: "Standard",
      subtitle: "Full Data Analysis",
      price: "₦350,000",
      aiPrice: "10–14 days",
      benefits: [
        "Complete exploratory data analysis (EDA)",
        "Custom charts and interactive dashboards",
        "Statistical or ML model guidance",
        "Detailed report with actionable insights",
        "Up to 3 revisions included",
        "Email & chat support",
      ],
    },
    {
      title: "Premium",
      subtitle: "Predictive Analytics Suite",
      price: "₦700,000+",
      aiPrice: "15–21 days",
      benefits: [
        "Advanced predictive modeling and forecasting",
        "Custom dashboards and executive presentations",
        "Full report with code and methodology",
        "Unlimited revisions during project timeline",
        "Dedicated consultation session",
        "Priority support",
      ],
    },
  ];

  const projects = [
    {
      id: 1,
      image: "/images/project1.png",
      alt: "Project Alpha",
      title: "Modern Business Website",
      category: "Corporate",
    },
    {
      id: 2,
      image: "/images/project2.png",
      alt: "Project Beta",
      title: "E-commerce Platform",
      category: "Retail",
    },
    {
      id: 3,
      image: "/images/project3.png",
      alt: "Project Gamma",
      title: "SaaS Dashboard",
      category: "Technology",
    },
    {
      id: 4,
      image: "/images/project4.png",
      alt: "Project Delta",
      title: "Portfolio Website",
      category: "Creative",
    },
  ];

  const features = [
    {
      id: 1,
      icon: "/icon5.svg",
      title: "Discover",
      description:
        "Understand your business goals, data sources, and key challenges.",
    },
    {
      id: 2,
      icon: "/icon6.svg",
      title: "Analyze",
      description:
        "Examine datasets to identify trends, patterns, and opportunities for growth.",
    },
    {
      id: 3,
      icon: "/icon7.svg",
      title: "Prototype",
      description:
        "Build dashboards, models, or visualizations to test actionable insights",
    },
    {
      id: 4,
      icon: "/icon8.svg",
      title: "Implement",
      description:
        "Deploy solutions across your business systems for real-world impact.",
    },
    {
      id: 5,
      icon: "/icon9.svg",
      title: "Train",
      description:
        "Empower your team with training and guidance to fully leverage analytics tools.",
    },
  ];

  const automationBoxes = [
    {
      id: 1,
      icon: "/icon10.svg",
      title: "Actionable Insights",
      description:
        "Turn raw data into clear, strategic insights that drive better business decisions",
    },
    {
      id: 2,
      icon: "/icon11.svg",
      title: "Secure Data Handling",
      description:
        "Your data is handled with strict security protocols and confidentiality at every step.",
    },
    {
      id: 3,
      icon: "/icon12.svg",
      title: "Predictive Analytics Expertise",
      description:
        "Leverage our experience in forecasting, modeling, and trend analysis to anticipate business outcomes",
    },
    {
      id: 4,
      icon: "/icon13.svg",
      title: "Ongoing Optimization Support",
      description:
        "Receive continuous guidance and support to refine dashboards, models, and analytics over time.",
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
            Data Analysis
          </div>
          <h3 className="mb-2   text-4xl md:text-5xl leading-tight">
            Turn Your Data Into Decisions
          </h3>

          <div className="text-gray-300 mt-4 mb-6 text-base max-w-md leading-relaxed">
            From dashboards to predictive models — we help businesses unlock
            insights that drive growth.”
          </div>

          <div className="flex justify-center md:justify-start gap-4">
            <button className="px-10 py-2 bg-[#0077B6]  text-white  rounded-lg transition">
              Book Discovery Call
            </button>
            <button className="px-10 py-2 border border-white text-white hover:bg-[#0B1E36] hover:text-[#FFFFFF] rounded-lg transition duration-300">
              View Case Studies
            </button>
          </div>
        </div>

        {/* Right side — Laptop image */}
        <div className="relative z-10 flex-1 flex justify-center md:justify-end mt-10 md:mt-0">
          <Image
            src="/images/Generated_Image1.png"
            alt="Laptop mockup"
            width={600}
            height={600}
            className="object-contain drop-shadow-2xl rounded-lg"
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
          We help businesses unlock hidden opportunities through accurate,
          data-driven analysis and clear strategic reporting.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {automationBoxes.map((box) => (
            <div
              key={box.id}
              className="group bg-white backdrop-blur-md p-6 rounded-xl hover:bg-white/20 transition cursor-pointer"
            >
              <Image
                src={box.icon}
                alt={box.title}
                width={40}
                height={40}
                className="mb-4 mx-auto"
              />
              <h3 className="text-xl font-semibold text-[#0B1E36] mb-2 group-hover:text-white transition-colors">
                {box.title}
              </h3>
              <p className="text-[#4A5565] text-sm group-hover:text-white transition-colors">
                {box.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="why-work"
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
            Our Automation Process
          </h2>
          <p className="text-[#4A5565] mb-12 max-w-2xl mx-auto">
            A proven methodology that ensures quality, efficiency, and
            exceptional results.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center"
              >
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={50}
                  height={50}
                  className="mb-4 mx-auto"
                />
                <h3 className="text-lg font-semibold mb-3 text-[#0B1E36]">
                  {feature.title}
                </h3>
                <p className="text-[#FFFFFF] text-sm max-w-xs">
                  {feature.description}
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
            Explore our portfolio of successful web projects across various
            industries.
          </p>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative group rounded-xl overflow-hidden h-[300px]"
            >
              <Image
                src={project.image}
                alt={project.alt}
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
                  {project.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full py-20 px-6 md:px-16 text-center bg-linear-to-b from-[#F8FBFF] to-white">
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
                  {plan.subtitle}
                </h3>
                <p className="text-[#4A5565] text-sm md:text-base">
                  {plan.title}
                </p>
              </div>

              {/* Main Price */}
              <div className="mb-4">
                <p className="text-3xl font-bold text-[#0077B6] flex items-baseline justify-center gap-1">
                  <span className="text-base"></span>
                  {plan.price}
                  <span className="text-sm text-gray-500 font-normal">
                    /month
                  </span>
                </p>

                {/* AI Price */}
                {/* <p className="text-sm mt-3 text-gray-400 font-medium">
                  {plan.aiPrice}
                </p> */}
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
                Choose Plan
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
            Ready to Complete Your Project?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Upload your dataset and let’s help you analyze it step-by-step
          </p>
          <div className="flex justify-center items-center gap-4 mb-12">
            <button className="px-8 py-3 rounded-lg bg-[#FFFFFF] text-[#0077B6] font-medium border border-[#0077B6] hover:bg-white hover:text-[#0B1E36] transition-all duration-300">
              Upload Project
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
