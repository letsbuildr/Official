"use client";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";

const cards = [
  {
    title: "Africa’s Businesses",
    content:
      "From startups to SMEs, many African businesses struggle with scattered data and costly tools. Bomcel makes it simple to track performance, cut waste, and uncover growth opportunities.",
    image: "/images/about1.png",
  },
  {
    title: "Creators",
    content:
      "Africa’s creators drive the digital economy, Bomcel turns their data into clear insights for growth.",
    image: "/images/about2.png",
  },
  {
    title: "Analyst",
    content:
      "Analysts spend too much time cleaning data and building reports. Bomcel streamlines workflows with automated insights and ready-to-share visuals, so they deliver impact faster.",
    image: "/images/about3.png",
  },
];

const how_cards = [
  {
    title: "Consultation & discovery",
    content:
      "We listen to your needs, understand your goals, and define the scope.",
    image: "/about-how1.svg",
  },
  {
    title: "Planning & design",
    content:
      "We create a roadmap: wireframes, data models, or automation blueprints depending on the service.",
    image: "/about-how2.svg",
  },
  {
    title: "Build & execution",
    content:
      "Our developers, data analysts and automation experts bring the plan to life, ensuring clean code, accurate analysis, and seamless workflows.",
    image: "/about-how3.svg",
  },
  {
    title: "Delivery & support",
    content:
      "We deliver on time, test thoroughly, and offer support for maintenance, training, or future enhancements.",
    image: "/about-how3.svg",
  },
];

const serve_cards = [
  {
    title: "Businesses",
    content: "Streamlining operations and uncovering growth opportunities",
    image: "/serve_icon1.svg",
  },
  {
    title: "Creators",
    content:
      "Turning passion and content into sustainable ventures with data clarity.",
    image: "/serve_icon2.svg",
  },
  {
    title: "Analysts",
    content:
      "Working faster and smarter with automated insights and simplified workflows.",
    image: "/serve_icon3.svg",
  },
];

const values = [
  {
    title: "Simplicity",
    content: "We believe powerful tools don’t have to be complicated.",
    image: "/values_icon1.svg",
  },
  {
    title: "Accessibility",
    content: "Everyone should have equal access to data-driven insights.",
    image: "/values_icon2.svg",
  },
  {
    title: "Innovation",
    content: "We build solutions tailored to Africa’s unique opportunities.",
    image: "/values_icon3.svg",
  },
  {
    title: "Collaboration",
    content: "We grow by listening, learning, and building with our users.",
    image: "/values_icon4.svg",
  },
  {
    title: "Impact",
    content: "Every feature we design must help users make real progress.",
    image: "/values_icon5.svg",
  },
];

const core_values = [
  {
    title: "Quality & Integrity",
    content:
      "We deliver work we are proud of, always with honesty and transparency.",
    image: "/values_icon1.svg",
  },
  {
    title: "Client‑first mindset",
    content:
      "Your needs define the solution; we don’t force cookie‑cutter tools.",
    image: "/values_icon2.svg",
  },
  {
    title: "Growth & Empowerment",
    content:
      "We help our clients - and our community, grow. Whether you’re a student learning analytics or a business transforming operations, we want you to come out stronger.",
    image: "/values_icon3.svg",
  },
  {
    title: "Innovation",
    content:
      "We stay ahead of trends to offer modern, reliable, and future‑proof solutions.",
    image: "/values_icon4.svg",
  },
];

const why_work_with_us = [
  {
    title: "Versatility",
    content:
      "We bring versatility, from complex data workflows to beautiful websites - all under one roof.",
    image: "/values_icon1.svg",
  },
  {
    title: "End-to-end service",
    content:
      "You talk to one team that understands your needs holistically - no handoffs, no communication gaps.",
    image: "/values_icon2.svg",
  },
  {
    title: "Client‑centered approach",
    content: "Our solutions are tailored, not templated.",
    image: "/values_icon3.svg",
  },
  {
    title: "Efficiency & value",
    content:
      "We design with cost and time savings in mind - especially for businesses mindful of budget and ROI.",
    image: "/values_icon4.svg",
  },
  {
    title: "Commitment",
    content: "We finish what we start, and stand by our work.",
    image: "/values_icon5.svg",
  },
];

const experience = [
  {
    title: "Startups & small businesses",
    content: "Polished online presence built to convert.",
    image: "/values_icon1.svg",
  },
  {
    title: "Students & learners",
    content: "Final year project support and analysis guidance.",
    image: "/values_icon2.svg",
  },
  {
    title: "Established businesses",
    content: "Data-driven insights to optimize operations and reduce cost.",
    image: "/values_icon3.svg",
  },
  {
    title: "Cross-sector clients",
    content: "From fashion to tech and public services.",
    image: "/values_icon4.svg",
  },
];

const what_we_do = [
  {
    title: "Web Development",
    content:
      "Custom websites, landing pages, and web apps built with clean code, strong design, and a focus on user experience - so your brand always looks and feels professional.",
    image: "/images/about1.png",
  },
  {
    title: "Data Analysis for Students",
    content:
      "Final year student project research and analysis using the required software tools.",
    image: "/images/about2.png",
  },
  {
    title: "Data Analysis for Businesses",
    content:
      "Actionable insights, dashboards, and reports that help businesses make data‑driven decisions, identify trends, and save costs.",
    image: "/images/about3.png",
  },
  {
    title: "Automation",
    content:
      " Custom automation workflows that streamline repetitive tasks, reduce human error, and save time - giving you room to focus on growth and strategy.",
    image: "/images/about3.png",
  },
];

const items = [
  "Expand our services (e.g., productized data tools, analytics training programs)",
  "Build a broader team of experts",
  "Launch more client success stories and case studies",
  "Continue empowering students, entrepreneurs, and businesses through technology",
];

export default function AboutUs() {
  return (
    <main className="w-full bg-white text-[#0B1E36]">
      {/* HERO SECTION */}
      <section className="w-full bg-[#0B1E36] text-white pb-20 pt-32 text-center overflow-hidden">
        <div className="opacity-0 translate-y-10 animate-fadeUp">
          <h1 className="text-3xl md:text-5xl font-semibold mb-4">About Us</h1>
          <div className="w-full h-16 md:h-20 bg-[#0B1E36]" />
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="max-w-6xl mx-auto text-center py-16 px-5 pb-[100px] overflow-hidden">
        <div className="opacity-0 translate-y-10 animate-fadeUp">
          <h2 className="text-5xl md:text-5xl font-semibold mb-12 max-w-3xl mx-auto leading-snug">
            We build smarter digital solutions - so you can focus on what
            matters.
          </h2>
          <button className="mt-4 bg-[#0077B6] text-white px-6 py-3 rounded-[10px] text-sm hover:opacity-80 transition cursor-pointer">
            Try Bionet Digital Today
          </button>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="w-full bg-[#F4F4F4] mx-auto text-center py-16 px-5 pb-[100px] overflow-hidden">
        <div className="mt-10">
          <h2 className="text-5xl md:text-5xl font-semibold mb-1 max-w-3xl mx-auto leading-snug">
            What We Do
          </h2>
          <p className="text-lg md:text-2xl font-medium leading-relaxed mb-6 max-w-3xl mx-auto">
            We offer four core services, tailored to meet different needs:
          </p>
          <div className="max-w-6xl grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-20 gap-10 mx-auto">
            {what_we_do.map((box, index) => (
              <div
                key={box.title}
                className="group backdrop-blur-md rounded-xl overflow-hidden hover:bg-white/20 transition cursor-pointer opacity-0 translate-y-10 animate-fadeUp"
                style={{ animationDelay: `${0.3 + index * 0.2}s` }}
              >
                <div className="overflow-hidden rounded-t-[10px]">
                  <Image
                    src={box.image}
                    alt={box.title}
                    width={364}
                    height={300}
                    className="mx-auto w-full transform transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h3 className="text-[14px] h-10 font-semibold bg-[#0B1E36] text-white flex items-center justify-center">
                  {box.title}
                </h3>

                <p className="text-[#4A5565] min-h-[180px] rounded-b-[10px] p-5 bg-[#dee1e6] text-sm">
                  {box.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="bg-[#0B1E36] text-white pt-20 px-5 pb-[100px] overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-36 items-center">
          <div className="opacity-0 translate-y-10 animate-fadeUp">
            <h2 className="text-5xl md:text-5xl font-semibold mb-7">
              Who we are
            </h2>

            <p className="text-sm md:text-base leading-relaxed mb-12">
              Bomcel Digital is a full-stack digital services agency driven by a
              simple belief: technology should work for you, not the other way
              around. We are a team of passionate IT professionals, data
              analysts, web developers, and automation experts united by one
              goal: to help individuals, students, and businesses succeed in the
              digital world.
            </p>

            <p className="text-sm md:text-base leading-relaxed">
              We blend strong design, clean code and meaningful data to deliver
              solutions that scale and make day-to-day operations easier.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="opacity-0 translate-y-10 animate-fadeUp"
            style={{ animationDelay: "0.3s" }}
          >
            <Image
              src="/images/our-story.png"
              alt="Story"
              width={500}
              height={400}
              className="rounded-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* WHY WE EXIST, OUR MISSION & VALUES */}
      <section className="bg-[#F4F4F4] text-[#0B1E36] pt-20 pb-[100px] px-5 overflow-hidden">
        <div className="gap-8 items-center">
          <div>
            <h2 className="text-5xl md:text-5xl text-[#0B1E36] font-semibold mb-4 text-center">
              Why we exist (Our Mission & Values)
            </h2>
            <p className="max-w-[600px] text-[#0B1E36] mx-auto mb-4 text-center">
              We believe technology should be simple, accessible, and powerful.
              Every project starts with one question: how can this make life
              easier and more efficient?
            </p>
            <p className="text-[#0B1E36] text-center">Our core values:</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-6xl mx-auto">
            {core_values.map((i, index) => (
              <div
                key={index}
                className="
          bg-[#F5F7FA] p-6 md:p-8 rounded-2xl 
          backdrop-blur-md border border-[#00B4D8]/40 
          shadow-sm hover:shadow-xl 
        "
                style={{ animationDelay: `${0.15 * index}s` }}
              >
                <div className="flex items-center gap-5 mb-6">
                  <Image
                    src={i.image}
                    alt={i.title}
                    width={50}
                    height={50}
                    className="mb-0"
                  />
                  <h3 className="font-semibold text-black text-xl">
                    {i.title}
                  </h3>
                </div>

                <p className="text-[15px] md:text-[16px] text-gray-600 leading-relaxed">
                  {i.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE DO IT */}
      <section className="bg-white py-20 px-5 max-w-6xl mx-auto text-center overflow-hidden">
        {/* Heading */}
        <div className="opacity-0 translate-y-10 animate-fadeUp">
          <h2 className="text-5xl md:text-5xl font-semibold mb-6">
            How We Work
          </h2>

          <p className="text-lg md:text-2xl font-medium leading-relaxed mb-12 max-w-3xl mx-auto">
            Every project at Bomcel Digital follows a thoughtful process:
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 mt-10 mb-12 text-[#0B1E36]">
          {how_cards.map((i, index) => (
            <div
              key={i.title}
              className="bg-[#dee1e6] shadow-lg px-8 md:px-10 py-8 rounded-[20px] text-left transition-all duration-300 opacity-0 translate-y-10 animate-fadeUp hover:shadow-2xl"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              <Image
                src={i.image}
                alt={i.title}
                width={50}
                height={50}
                className="mb-6"
              />

              <h3 className="font-semibold mb-4 md:mb-6 text-xl md:text-2xl">
                {i.title}
              </h3>

              <p className="text-sm md:text-base font-normal text-[#0B1E36]/80">
                {i.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="bg-[#F4F4F4] text-[#0B1E36] py-20 px-5 overflow-hidden">
        <h2 className="text-center text-5xl md:text-5xl font-semibold mb-20 opacity-0 translate-y-10 animate-fadeUp">
          Our Experience & Who We Serve
        </h2>
        <p className="text-lg md:text-2xl font-medium leading-relaxed text-center max-w-3xl mx-auto">
          Over the years, we have worked with:
        </p>
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 mb-20">
          {experience.map((i, index) => (
            <div
              key={index}
              className="
          bg-[#F5F7FA] p-6 md:p-8 rounded-2xl 
          backdrop-blur-md border border-[#00B4D8]/40 
          shadow-sm hover:shadow-xl 
          hover:-translate-y-2 transition-all duration-300
          opacity-0 translate-y-10 animate-fadeUp
        "
              style={{ animationDelay: `${0.15 * index}s` }}
            >
              <div className="mb-2">
                <Image
                  src={i.image}
                  alt={i.title}
                  width={50}
                  height={50}
                  className="mb-6 mx-auto"
                />
                <h3 className="font-semibold text-xl">{i.title}</h3>
              </div>

              <p className="text-[15px] md:text-[16px] leading-relaxed">
                {i.content}
              </p>
            </div>
          ))}
        </div>
        <p className="text-[16px] font-medium leading-relaxed text-center max-w-3xl mx-auto">
          Our multidisciplinary background (web dev, analytics, automation)
          gives us a unique edge: we don’t just build websites or dashboards -
          we build digital ecosystems that grow with you.
        </p>
      </section>

      {/* WHY WORK WITH US */}
      <section className="bg-white text-[#0B1E36] py-12 px-5 overflow-hidden">
        <h2 className="text-center text-5xl md:text-5xl font-semibold mb-20 opacity-0 translate-y-10 animate-fadeUp">
          Why Work With Us
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 mb-20">
          {why_work_with_us.map((i, index) => (
            <div
              key={index}
              className="
          bg-[#F5F7FA] p-6 md:p-8 rounded-2xl 
          backdrop-blur-md border border-[#00B4D8]/40 
          shadow-sm hover:shadow-xl 
          hover:-translate-y-2 transition-all duration-300
          opacity-0 translate-y-10 animate-fadeUp
        "
              style={{ animationDelay: `${0.15 * index}s` }}
            >
              <div className="flex items-center gap-5 mb-6">
                <Image
                  src={i.image}
                  alt={i.title}
                  width={50}
                  height={50}
                  className="mb-0"
                />
                <h3 className="font-semibold text-xl">{i.title}</h3>
              </div>

              <p className="text-[15px] md:text-[16px] leading-relaxed">
                {i.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHO WE SERVE */}
      {/* <section className=" bg-[#F4F4F4] py-16 sm:py-20 px-5 mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 md:mb-6 animate-fadeUp">
          Who We Serve
        </h2>

        <p className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed mb-10 md:mb-12 animate-fadeUp delay-100">
          At Bomcel, we empower the key players shaping Africa’s digital economy
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {serve_cards.map((i, index) => (
            <div
              key={index}
              className={`bg-[#dee1e6] shadow-md px-6 sm:px-8 md:px-10 py-8 
                    rounded-[20px] text-left hover:shadow-xl 
                    transform transition-all duration-500 hover:-translate-y-3
                    animate-fadeUp`}
              style={{ animationDelay: `${0.2 * (index + 1)}s` }}
            >
              <Image
                src={i.image}
                alt={i.title}
                width={50}
                height={50}
                className="mb-6 w-12 sm:w-[50px] mx-0"
              />

              <h3 className="font-semibold mb-4 sm:mb-6 text-xl sm:text-2xl">
                {i.title}
              </h3>

              <p className="text-sm sm:text-base font-normal">{i.content}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* WHAT MAKES US DIFFERENT */}
      <section className="bg-[#0B1E36] text-white pt-16 sm:pt-20 pb-20 sm:pb-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div
            className="flex justify-center mb-6 sm:mb-8 animate-fadeUp"
            style={{ animationDelay: "0.1s" }}
          >
            <Image
              src="/locator.svg"
              alt="What makes us Different"
              width={70}
              height={70}
              className="w-14 sm:w-[70px] transform transition-transform duration-500 hover:scale-110"
            />
          </div>

          {/* Heading */}
          <h3
            className="text-5xl sm:text-4xl md:text-5xl font-semibold mb-6 sm:mb-14 animate-fadeUp"
            style={{ animationDelay: "0.2s" }}
          >
            What makes us Different
          </h3>

          {/* Paragraph */}
          <p
            className="text-base sm:text-lg md:text-[20px] leading-relaxed opacity-80 mx-auto max-w-2xl animate-fadeUp"
            style={{ animationDelay: "0.3s" }}
          >
            Unlike generic platforms, Bomcel is built specifically for Africa —
            affordable, intuitive, and designed for the way businesses and
            creators here actually work. We understand the unique challenges and
            opportunities of the African market.
          </p>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="pt-16 sm:pt-20 pb-16 sm:pb-20 px-4">
        {/* Section Title */}
        <div className="animate-fadeUp text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-10 sm:mb-12 md:mb-20">
            Meet Our Founder
          </h2>
        </div>

        {/* Main Card */}
        <div
          className="border border-[#D9D9D9] px-6 sm:px-10 md:px-16 py-10 md:py-16 
               rounded-[30px] md:rounded-[71px] max-w-6xl mx-auto 
               flex flex-col md:flex-row gap-8 md:gap-20 items-center animate-fadeUp"
        >
          {/* LEFT SIDE - Image */}
          <div
            className="w-full md:w-[55%] shrink-0 animate-fadeUp"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="bg-[#D9D9D9] rounded-[20px] overflow-hidden">
              <Image
                src="/images/founder.png"
                alt="Founder"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* RIGHT SIDE - Text */}
          <div
            className="w-full md:w-[45%] animate-fadeUp"
            style={{ animationDelay: "0.3s" }}
          >
            <h3 className="text-2xl sm:text-2xl md:text-[28px] font-bold leading-relaxed mb-4">
              Oluwatosin Babalola – Founder & CEO, Bomcel Digital
            </h3>

            <p className="text-base sm:text-base md:text-[16px] font-normal leading-relaxed text-[#0B1E36]/80 mb-4 sm:mb-5">
              Oluwatosin Babalola is a Senior Data Analyst turned founder who
              has spent years helping organizations uncover insights that cut
              costs, improve efficiency, and drive growth. Along the way, she
              discovered a recurring challenge…
            </p>

            <p className="text-base sm:text-base md:text-[16px] font-normal leading-relaxed text-[#0B1E36]/80">
              Determined to close that gap, she founded Bomcel Digital — a
              platform designed to turn raw data into dashboards, auto-insights,
              and storytelling visuals anyone can use. Her mission is clear:
              make data simple, actionable, and empowering…
            </p>
          </div>
        </div>
      </section>

      {/* LOOKING AHEAD */}
      <section className="bg-[#0B1E36] text-white pt-16 sm:pt-20 pb-20 sm:pb-24 px-5">
        <div className="grid md:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 md:mb-6 animate-fadeUp">
              Looking Ahead
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed mb-10 md:mb-12 animate-fadeUp delay-100">
              As we grow, Bomcel Digital aims to:
            </p>
            <ul className="space-y-3">
              {items.map((item, index) => (
                <li key={index} className="flex items-center">
                  <FaCheck className="text-[#C72F86] green-500 mr-2" />
                  <span className="text-white">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="flex flex-col justify-start opacity-0 animate-fadeUp"
            style={{ animationDelay: "0.3s" }}
          >
            <Image
              src="/images/looking-ahead2.png"
              alt="Looking Ahead"
              width={500}
              height={400}
              className="rounded-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-100 py-20 sm:py-[100px] px-4 text-center">
        <div className="bg-[#c6ccd3] rounded-[40px] md:rounded-[60px] max-w-4xl w-full py-12 sm:py-[70px] mx-auto px-6 animate-fadeUp">
          {/* Heading */}
          <h2
            className="text-3xl sm:text-3xl md:text-3xl max-w-[800px] m-auto text-[#0B1E36] font-semibold mb-5 sm:mb-5 leading-tight animate-fadeUp"
            style={{ animationDelay: "0.1s" }}
          >
            If you’re ready to transform your digital presence, unlock data
            insights, or automate your workflows — let’s get started.
          </h2>

          {/* Paragraph */}
          <p
            className="text-base sm:text-lg md:text-[20px] text-[#0B1E36]/80 font-normal mb-6 sm:mb-6 md:mb-6 max-w-xl mx-auto animate-fadeUp"
            style={{ animationDelay: "0.2s" }}
          >
            Book a free consultation and we'll discuss how to move forward.
          </p>

          {/* Buttons */}
          <div
            className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 max-w-lg mx-auto animate-fadeUp"
            style={{ animationDelay: "0.3s" }}
          >
            <a
              href="consultation"
              className="text-[18px] md:text-[20px] bg-[#0077B6] border-2 border-[#0077B6] text-white px-8 md:px-12 py-3 md:py-5 rounded-[10px] font-medium w-full sm:w-auto transition-all duration-300 hover:bg-white hover:text-[#0077B6] hover:scale-105 cursor-pointer"
            >
              Book a Free Consultation
            </a>
            {/* <button className="text-[18px] md:text-[20px] bg-transparent border-2 border-[#0B1E36] text-black px-8 md:px-12 py-3 md:py-5 rounded-[10px] font-medium w-full sm:w-auto transition-all duration-300 hover:bg-[#0B1E36] hover:text-white hover:scale-105">
              Learn More
            </button> */}
          </div>
        </div>
      </section>
    </main>
  );
}
