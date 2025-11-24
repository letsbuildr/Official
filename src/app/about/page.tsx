"use client";
import Image from "next/image";

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
    title: "Dashboard templates",
    content:
      "Pre-built templates that save you time and get you started instantly.",
    image: "/about-how1.svg",
  },
  {
    title: "Auto-insights",
    content:
      "Intelligent analysis that spots trends and patterns automatically.",
    image: "/about-how2.svg",
  },
  {
    title: "Storytelling Reports ",
    content:
      "Transform your data into compelling narratives that are easy to understand and share.",
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
            Making Data Work for Africa's Businesses, Creators, and Analysts.
          </h2>

          <button className="mt-4 bg-[#0077B6] text-white px-6 py-3 rounded-[10px] text-sm hover:opacity-80 transition cursor-pointer">
            Try Bionet Digital Today
          </button>
        </div>

        {/* Cards (Stagger animation) */}
        <div className="grid md:grid-cols-3 gap-0 sm:gap-6 mt-14">
          {cards.map((box, index) => (
            <div
              key={box.title}
              className={`group bg-white backdrop-blur-md p-6 rounded-xl overflow-hidden hover:bg-white/20 transition cursor-pointer opacity-0 translate-y-10 animate-fadeUp`}
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

              <h3 className="text-xl h-10 font-semibold bg-[#0B1E36] text-white flex items-center justify-center">
                {box.title}
              </h3>

              <p className="text-[#4A5565] min-h-[150px] rounded-b-[10px] p-5 bg-[#dee1e6] text-sm transition-colors">
                {box.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="bg-[#0B1E36] text-white pt-20 px-5 pb-[100px] overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-36 items-center">
          <div className="opacity-0 translate-y-10 animate-fadeUp">
            <h2 className="text-5xl md:text-5xl font-semibold mb-7">
              Our Story
            </h2>

            <p className="text-sm md:text-base leading-relaxed mb-12">
              At Bomcel Digital, we noticed a challenge: data is everywhere, but
              the tools to turn it into action often feel too complex, too
              expensive, or out of reach. Many African businesses and creators
              struggle to get the insights they need, leading to missed
              opportunities, wasted resources, and slower growth.
            </p>

            <p className="text-sm md:text-base leading-relaxed">
              We built Bomcel to change that. Our platform is designed with
              simplicity in mind, helping anyone — from small business owners to
              data professionals — visualize, automate, and act on data without
              the stress of learning complicated tools.
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

      {/* HOW WE DO IT */}
      <section className="py-20 px-5 max-w-6xl mx-auto text-center overflow-hidden">
        {/* Heading */}
        <div className="opacity-0 translate-y-10 animate-fadeUp">
          <h2 className="text-5xl md:text-5xl font-semibold mb-6">
            How We Do It
          </h2>

          <p className="text-lg md:text-2xl font-medium leading-relaxed mb-12 max-w-3xl mx-auto">
            We bring this mission to life through powerful, user-friendly
            features like:
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 mt-10 text-[#0B1E36]">
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

      {/* MISSION */}
      <section className="bg-[#0B1E36] text-white pt-20 pb-[100px] px-5 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-20 md:gap-32 lg:gap-[150px]">
          {/* Mission */}
          <div
            className="flex-1 opacity-0 translate-y-10 animate-fadeUp"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-5 md:gap-7 mb-10">
              <Image
                src="/our-mission.svg"
                alt="our mission"
                width={50}
                height={50}
                className="mb-0"
              />
              <h2 className="font-semibold text-5xl md:text-5xl">
                Our Mission
              </h2>
            </div>

            <div className="bg-[#F5F7FA] px-6 md:px-10 py-10 md:py-[58px] rounded-lg backdrop-blur-md border border-white/20">
              <p className="text-sm md:text-base text-[#0B1E36] leading-relaxed">
                To empower African innovators with tools that make data simple,
                accessible, and actionable.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div
            className="flex-1 opacity-0 translate-y-10 animate-fadeUp"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center gap-5 md:gap-7 mb-10">
              <Image
                src="/our-vision.svg"
                alt="our vision"
                width={50}
                height={50}
                className="mb-0"
              />
              <h2 className="font-semibold text-5xl md:text-5xl">Our Vision</h2>
            </div>

            <div className="bg-[#F5F7FA] px-6 md:px-10 py-10 md:py-[58px] rounded-lg backdrop-blur-md border border-white/20">
              <p className="text-sm md:text-base text-[#0B1E36] leading-relaxed">
                To empower African innovators with tools that make data simple,
                accessible, and actionable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-white text-[#0B1E36] py-20 px-5 overflow-hidden">
        <h2 className="text-center text-5xl md:text-5xl font-semibold mb-20 opacity-0 translate-y-10 animate-fadeUp">
          Our Values
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {values.map((i, index) => (
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
      <section className="py-16 sm:py-20 px-5 max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 md:mb-6 animate-fadeUp">
          Who We Serve
        </h2>

        {/* Subheading */}
        <p className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed mb-10 md:mb-12 animate-fadeUp delay-100">
          At Bomcel, we empower the key players shaping Africa’s digital economy
        </p>

        {/* Cards */}
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
      </section>

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

      {/* CTA */}
      <section className="bg-gray-100 py-20 sm:py-[100px] px-4 text-center">
        <div className="bg-[#c6ccd3] rounded-[40px] md:rounded-[60px] max-w-4xl w-full py-12 sm:py-[70px] mx-auto px-6 animate-fadeUp">
          {/* Heading */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl text-[#0B1E36] font-semibold mb-6 sm:mb-7 leading-tight animate-fadeUp"
            style={{ animationDelay: "0.1s" }}
          >
            Ready to Transform Your Data?
          </h2>

          {/* Paragraph */}
          <p
            className="text-base sm:text-lg md:text-[20px] text-[#0B1E36]/80 font-normal mb-10 sm:mb-12 md:mb-20 max-w-xl mx-auto animate-fadeUp"
            style={{ animationDelay: "0.2s" }}
          >
            Join us in shaping the future of data in Africa. Try Bomcel Digital
            today and see how simple data can be.
          </p>

          {/* Buttons */}
          <div
            className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 max-w-lg mx-auto animate-fadeUp"
            style={{ animationDelay: "0.3s" }}
          >
            <button className="text-[18px] md:text-[20px] bg-[#0077B6] border-2 border-[#0077B6] text-white px-8 md:px-12 py-3 md:py-5 rounded-[10px] font-medium w-full sm:w-auto transition-all duration-300 hover:bg-white hover:text-[#0077B6] hover:scale-105">
              Try Bomcel Digital
            </button>

            <button className="text-[18px] md:text-[20px] bg-transparent border-2 border-[#0B1E36] text-black px-8 md:px-12 py-3 md:py-5 rounded-[10px] font-medium w-full sm:w-auto transition-all duration-300 hover:bg-[#0B1E36] hover:text-white hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
