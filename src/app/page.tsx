"use client";
import { useState } from "react";
import Image from "next/image";

const CheckCircleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.6251 10.734C17.0001 13.859 14.644 16.801 11.3367 17.4588C8.02952 18.1167 4.67342 16.5783 3.01296 13.6435C1.3525 10.7087 1.76242 7.03963 4.02966 4.5436C6.2969 2.04756 10.1251 1.35896 13.2501 2.60896"
      stroke="#34C759"
      stroke-width="1.875"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7 9.48438L10.125 12.6094L17.625 4.48438"
      stroke="#34C759"
      stroke-width="1.875"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default function WebDevSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [open, setOpen] = useState<number | null>(null);

  const plans = [
    { name: "Starter Website", price: "₦150,000" },
    { name: "Automation Setup", price: "₦100,000" },
    { name: "Student Project", price: "₦30,000" },
    { name: "Business Dashboard", price: "₦200,000" },
  ];

  const faqs = [
    {
      question: "How long does it take to build a website?",
      answer:
        "Most websites take between 3 to 14 days, depending on complexity, number of pages, features, and your responsiveness during revisions.",
    },
    {
      question: "Do you offer maintenance & support?",
      answer:
        "Yes. We offer ongoing maintenance, updates, bug fixes, content changes, and security support to keep your website running smoothly.",
    },
    {
      question: "Do you help with academic projects?",
      answer:
        "Absolutely. We assist students with web development, software engineering, and final-year project development—including documentation.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept bank transfers, Paystack, Flutterwave, USDT, and other secure payment options depending on your location.",
    },
    {
      question: "Can I see examples of your work?",
      answer:
        "Yes! You can explore our portfolio at bomceldigital.com or request specific project samples depending on your needs.",
    },
  ];

  const clients = [
    {
      name: "Adebayo Okonkwo",
      text: "Bomcel  Digital built our website in 2 weeks. Professional, fas, and exactly what we needed. Highly recommended!",
      img: "/images/client1.png",
      position: "CEO, TechStart Lagos",
      stars: "4",
    },
    {
      name: "Sarah Johnson",
      text: "Their automation service saved us 20 hours per week. The ROI was  immediate and the team was great to work with.",
      img: "/images/client2.png",
      position: "Operations Manager, RetailCo",
      stars: "5",
    },
    {
      name: "Chioma Eze",
      text: "They helped with my final year project analysis. Clear explanations, detailed code, and finished ahead of schedule!",
      img: "/images/client3.png",
      position: "MSc Student, University of Lagos",
      stars: "5",
    },
  ];

  const stats = [
    { number: "100+", label: "Projects Delivered" },
    { number: "24hr", label: "Average Response" },
    { number: "95%", label: "Client Satisfaction" },
  ];

  const steps = [
    {
      number: "1",
      title: "Tell Us Your Needs",
      desc: "FIll out our intake form or book a discovery call. We’ll understand your requirements",
    },
    {
      number: "2",
      title: "We Scope & Quote",
      desc: "WReceive a  detailed proposal with timeline, deliverables, and transparent pricing",
    },
    {
      number: "3",
      title: "Delivery & Training",
      desc: "Get your deliverables with documentation  and training.  Plus ongoing support",
    },
  ];

  const services = [
    {
      title: "Web Development",
      subtitle:
        "Professional websites built for growth. From landing pages to e-commerce stores",
      price: "Starting from #150000",
      points: ["Responsive Design", "SEO Optimization", "Fast Delivery"],
      img: "/images/service1.png",
      icon: "/serviceicon1.svg",
      link: "/services/web-development",
    },
    {
      title: "Automation Services",
      subtitle:
        "Streamline your business operations with custom automation solutions",
      price: "Starting from #100000",
      points: ["Save Time", "Reduce Errors", "Scale Easily"],
      img: "/images/service2.png",
      icon: "/serviceicon2.svg",
      link: "/services/automation-services",
    },
    {
      title: "Data Analysis – Students",
      subtitle:
        "Final year project help - analysis, models & presentation  support",
      price: "Starting from #150000",
      points: ["Fast Turnaround ", "Academic Integrity", "Detailed reports"],
      img: "/images/service3.png",
      icon: "/serviceicon3.svg",
      link: "/services/data-analysis/students",
    },
    {
      title: "Data Analysis – Business",
      subtitle:
        "From dashboards to predictive models, turn data into decisions",
      price: "Starting from #200000",
      points: ["Custom Dashboards", "Predictive Models", "Training Included"],
      img: "/images/service4.png",
      icon: "/serviceicon1.svg",
      link: "/services/data-analysis/business",
    },
  ];

  const Ratings = ({ rating = 5 }) => {
    const maxStars = 5;
    const starPath =
      "M15 0L18.3677 10.3647H29.2658L20.4491 16.7705L23.8168 27.1353L15 20.7295L6.18322 27.1353L9.55093 16.7705L0.734152 10.3647H11.6323L15 0Z";

    return (
      <svg
        width={maxStars * 40}
        height="30"
        viewBox={`0 0 ${maxStars * 50} 30`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: maxStars }).map((_, i) => {
          const isFilled = i < rating;
          return (
            <path
              key={i}
              d={starPath}
              transform={`translate(${i * 45}, 0)`}
              fill={isFilled ? "#FFBD0C" : "#DDE4EA"}
            />
          );
        })}
      </svg>
    );
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full flex items-center justify-center pt-20 md:pt-40 pb-16 md:pb-40 text-white">
        <Image
          src="/images/hero-bg.png"
          alt="Hero Background"
          fill
          className="object-cover opacity-100"
        />
        <div className="relative flex flex-col items-center justify-center gap-4 md:gap-7 max-w-4xl text-center px-4">
          <span className="px-3 md:px-5 py-2 md:py-2.5 bg-[#00C0E8] text-xs md:text-sm rounded-[5px] inline-block">
            Trusted by 100+ clients
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
            Turn your ideas into stunning websites & data solutions - fast,
            secure, and built for results
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl">
            We help students complete data-driven projects, build digital
            products for businesses, and automate everyday workflow
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-7 w-full">
            <button className="bg-[#0077B6] border-2 border-[#0077B6] px-8 md:px-12 py-3 md:py-5 rounded-md font-medium w-full sm:w-auto">
              Get a Quote
            </button>
            <button className="bg-transparent border-2 text-white px-8 md:px-12 py-3 md:py-5 rounded-md font-medium w-full sm:w-auto">
              Try Our Product
            </button>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 md:gap-8 text-white">
            <div className="flex items-center gap-2.5">
              <CheckCircleIcon />
              <span className="text-xs md:text-[14px] font-medium whitespace-nowrap">
                Fast Delivery
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <CheckCircleIcon />
              <span className="text-xs md:text-[14px] font-medium whitespace-nowrap">
                Transparent Pricing
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <CheckCircleIcon />
              <span className="text-xs md:text-[14px] font-medium whitespace-nowrap">
                Secure and Private
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#F5F7FA] py-12 md:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-center gap-6 md:gap-8 px-4">
          {stats.map((s, i) => (
            <div key={i} className="p-4">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{s.number}</h3>
              <p className="text-gray-600 text-sm md:text-base">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-12 md:py-20 px-4">
        <h2 className="text-center text-[#001429] text-2xl md:text-3xl font-bold mb-4 md:mb-6">
          How It Works
        </h2>
        <p className="text-center text-[#5C738A] text-base md:text-[18px] mb-8 md:mb-12">
          Simple, transparent process from start to finish
        </p>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-center">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center max-w-[250px] gap-4 md:gap-7 mx-auto"
            >
              <div className="text-white bg-[#0B1E36] rounded-full flex items-center justify-center w-16 h-16 md:w-20 md:h-20 text-2xl md:text-5xl font-bold">
                {step.number}
              </div>
              <h3 className="text-lg md:text-xl text-[#001429] font-semibold">
                {step.title}
              </h3>
              <p className="text-[#5C738A] text-sm md:text-base">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-12 md:py-20 px-4">
        <h2 className="text-center text-[#001429] text-2xl md:text-3xl font-bold mb-4 md:mb-6">
          Our Services
        </h2>
        <p className="text-center text-[#5C738A] text-base md:text-[18px] mb-8 md:mb-12">
          Comprehensive solutions tailored to your needs
        </p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl shadow-sm overflow-hidden"
            >
              <img src={s.img} alt="" className="w-full h-48 md:h-80 object-cover" />

              <div className="p-4 md:p-6">
                <img src={s.icon} alt="" className="w-12 h-12 md:w-20 md:h-20 mb-3 md:mb-5" />
                <h3 className="text-lg md:text-xl text-[#0B1E36] font-semibold mb-2 md:mb-3.5">
                  {s.title}
                </h3>
                <p className="text-[#0B1E36] text-xs md:text-[14px] mb-2 md:mb-3.5">
                  {s.subtitle}
                </p>
                <p className="text-[#0B1E36] text-xs md:text-[14px] mb-3 md:mb-5">{s.price}</p>

                <ul className="mt-3 md:mt-4 text-gray-600 space-y-2">
                  {s.points.map((p, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm md:text-base">
                      <span className="text-green-600">
                        <CheckCircleIcon />
                      </span>{" "}
                      {p}
                    </li>
                  ))}
                </ul>

                <a
                  href={s.link}
                  className="block mt-4 md:mt-6 text-center w-full rounded-[5px] bg-[#0B1E36] text-white hover:underline py-3 md:py-4 cursor-pointer text-sm md:text-base"
                >
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#0b1a33] text-white py-12 md:py-20 px-4">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-4 md:mb-6">
          What Our Clients Say
        </h2>
        <p className="text-center text-base md:text-[18px] mb-8 md:mb-32">
          Real feedback from real clients
        </p>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {clients.map((c, i) => (
            <div
              key={i}
              className="bg-white text-[#0B1E36] p-4 md:p-6 rounded-lg backdrop-blur"
            >
              <img
                src={c.img}
                className="w-24 h-24 md:w-[150px] md:h-[150px] mt-[-48px] md:mt-[-82px] rounded-full mx-auto mb-3 md:mb-4"
                alt=""
              />
              <Ratings rating={Number(c.stars)} />
              <p className="mb-3 md:mb-4 text-sm md:text-base">{c.text}</p>
              <h4 className="font-semibold text-sm md:text-base">{c.name}</h4>
              <p className="font-normal text-xs md:text-[14px]">{c.position}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-12 md:py-20 px-4">
        <h2 className="text-center text-[#0B1E36] text-2xl md:text-3xl font-bold mb-4 md:mb-6">
          Transparent Pricing
        </h2>
        <p className="text-center text-[#5C738A] text-base md:text-[18px] mb-8 md:mb-12">
          Starting prices for our most popular services
        </p>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {plans.map((p, i) => (
            <div
              key={i}
              className="border p-4 md:p-6 rounded-[10px] text-center shadow-sm"
            >
              <h3 className="text-[#0B1E36] font-semibold text-sm md:text-base">{p.name}</h3>
              <p className="text-[#5C738A] mt-2 font-bold text-sm md:text-base">
                From <span className="text-[#0B1E36]">{p.price}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 md:mt-10">
          <button className="bg-[#0B1E36] text-white px-6 py-3 rounded-[5px] text-sm md:text-base">
            View Full Pricing
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-12 md:py-20 px-4">
        <h2 className="text-[#0B1E36] text-center text-2xl md:text-3xl font-bold mb-4 md:mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-[#5C738A] text-base md:text-[18px] mb-8 md:mb-12">
          Got questions? We&apos;ve got answers
        </p>

        <div className="text-[#0B1E36] max-w-4xl mx-auto space-y-3 md:space-y-4">
          {faqs.map((item, i) => (
            <div key={i} className="border rounded-lg">
              <button
                className="w-full flex justify-between p-3 md:p-4 font-medium cursor-pointer text-sm md:text-base"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {item.question}
                <span className="text-lg md:text-xl">{open === i ? "-" : "+"}</span>
              </button>

              {open === i && (
                <div className="px-3 md:px-4 pb-3 md:pb-4 text-gray-600 text-sm md:text-base leading-relaxed">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#0B1E36] text-white py-12 md:py-20 px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-semibold mb-4 md:mb-6">Ready to Get Started?</h2>
        <p className="text-base md:text-lg mb-8 md:mb-16">
          Whether you need a website, automation, or data analysis — we are here
          to help. Get a free quote today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 max-w-md sm:max-w-none mx-auto">
          <button className="bg-[#00B4D8] border-2 border-[#00B4D8] px-8 md:px-12 py-3 md:py-5 rounded-md font-medium w-full sm:w-auto">
            Request a Quote
          </button>
          <button className="bg-transparent border-2 text-white px-8 md:px-12 py-3 md:py-5 rounded-md font-medium w-full sm:w-auto">
            View Our Work
          </button>
        </div>
      </section>
    </>
  );
}
