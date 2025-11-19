"use client";
import { useState } from "react";
import Image from "next/image";

export default function WebDevSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [open, setOpen] = useState(null);

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
        "Most websites take between 3 to 14 days depending on the complexity, number of pages, features, and your responsiveness during revisions.",
    },
    {
      question: "Do you offer maintenance & support?",
      answer:
        "Yes. I do offer ongoing maintenance, updates, bug fixes, content changes, and security support to keep your website running smoothly.",
    },
    {
      question: "Do you help with academic projects?",
      answer:
        "Absolutely. I assist students with web development, software engineering, and final-year project development—including documentation.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "I accept bank transfer, Paystack, Flutterwave, USDT, and other secure payment options depending on your location.",
    },
    {
      question: "Can I see examples of your work?",
      answer:
        "Yes! You can explore my portfolio at bomceldigital.com or request specific project samples depending on what you need.",
    },
  ];

  const clients = [
    { name: "Client 1", text: "Amazing service...", img: "/p1.jpg" },
    { name: "Client 2", text: "Highly recommended...", img: "/p2.jpg" },
    { name: "Client 3", text: "Very satisfied...", img: "/p3.jpg" },
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
    },
    {
      title: "Automation Services",
      subtitle:
        "Streamline your business operations with custom automation solutions",
      price: "Starting from #100000",
      points: ["Save Time", "Reduce Errors", "Scale Easily"],
      img: "/images/service2.png",
      icon: "/serviceicon2.svg",
    },
    {
      title: "Data Analysis – Students",
      subtitle:
        "Final year project help - analysis, models & presentation  support",
      price: "Starting from #150000",
      points: ["Fast Turnaround ", "Academic Integrity", "Detailed reports"],
      img: "/images/service3.png",
      icon: "/serviceicon3.svg",
    },
    {
      title: "Data Analysis – Business",
      subtitle:
        "From dashboards to predictive models, turn data into decisions",
      price: "Starting from #200000",
      points: ["Custom Dashboards", "Predictive Models", "Training Included"],
      img: "/images/service4.png",
      icon: "/serviceicon1.svg",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full flex items-center justify-center pt-40 pb-40 text-white">
        <Image
          src="/images/hero-bg.png"
          alt="Hero Background"
          fill
          className="object-cover opacity-100"
        />
        <div className="relative flex flex-col items-center justify-center gap-7 max-w-4xl text-center px-4">
          <span className="px-5 py-2.5 bg-[#00C0E8] text-sm rounded-[5px] inline-block">
            Trusted by 100+ clients
          </span>
          <h1 className="text-7xl md:text-6xl font-semibold leading-tight">
            Turn your ideas into stunning websites & data solutions - fast,
            secure, and built for results
          </h1>
          <p className="text-2xl">
            We help students complete data-driven projects, build digital
            products for businesses, and automate everyday workflow
          </p>
          <div className="flex items-center justify-center gap-7">
            <button className="bg-[#0077B6] border-2 border-[#0077B6] px-12 py-5 rounded-md font-medium">
              Get a Quote
            </button>
            <button className="bg-transparent border-2 text-white px-12 py-5 rounded-md font-medium">
              Try Our Product
            </button>
          </div>
          <div className="flex justify-center space-x-8 text-white">
            <div className="flex items-center gap-2.5">
              <CheckCircleIcon />
              <span className="text-[14px] font-medium whitespace-nowrap">
                Fast Delivery
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <CheckCircleIcon />
              <span className="text-[14px] font-medium whitespace-nowrap">
                Transparent Pricing
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <CheckCircleIcon />
              <span className="text-[14px] font-medium whitespace-nowrap">
                Secure and Private
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#F5F7FA] py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 text-center gap-8">
          {stats.map((s, i) => (
            <div key={i}>
              <h3 className="text-3xl font-bold text-gray-900">{s.number}</h3>
              <p className="text-gray-600">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20">
        <h2 className="text-center text-[#001429] text-3xl font-bold mb-6">
          How It Works
        </h2>
        <p className="text-center text-[#5C738A] text-[18px] mb-12">
          Simple, transparent process from start to finish
        </p>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center max-w-[250px] gap-7"
            >
              <div className="text-white bg-[#0B1E36] rounded-full flex items-center justify-center w-20 h-20 text-5xl font-bold">
                {step.number}
              </div>
              <h3 className="text-xl text-[#001429] font-semibold">
                {step.title}
              </h3>
              <p className="text-[#5C738A]">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-20">
        <h2 className="text-center text-[#001429] text-3xl font-bold mb-6">
          Our Services
        </h2>
        <p className="text-center text-[#5C738A] text-[18px] mb-12">
          Comprehensive solutions tailored to your needs
        </p>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl shadow-sm overflow-hidden"
            >
              <img src={s.img} alt="" className="w-full h-80 object-cover" />

              <div className="p-6">
                <img src={s.icon} alt="" className="w-20 h-20 mb-5" />
                <h3 className="text-xl text-[#0B1E36] font-semibold mb-3.5">
                  {s.title}
                </h3>
                <p className="text-[#0B1E36] text-[14px] mb-3.5">
                  {s.subtitle}
                </p>
                <p className="text-[#0B1E36] text-[14px] mb-5">{s.price}</p>

                <ul className="mt-4 text-gray-600 space-y-2">
                  {s.points.map((p, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-600">
                        <CheckCircleIcon />
                      </span>{" "}
                      {p}
                    </li>
                  ))}
                </ul>

                <button className="mt-6 text-center w-full rounded-[5px] bg-[#0B1E36] text-white hover:underline pt-4 pb-4">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#0b1a33] text-white py-20">
        <h2 className="text-center text-3xl font-bold mb-12">
          What Our Clients Say
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {clients.map((c, i) => (
            <div key={i} className="bg-white/10 p-6 rounded-lg backdrop-blur">
              <img
                src={c.img}
                className="w-14 h-14 rounded-full mx-auto mb-4"
                alt=""
              />
              <p className="text-gray-200 mb-4">{c.text}</p>
              <h4 className="font-semibold text-center">{c.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-white py-20">
        <h2 className="text-center text-[#0B1E36] text-3xl font-bold mb-6">
          Transparent Pricing
        </h2>
        <p className="text-center text-[#5C738A] text-[18px] mb-12">
          Starting prices for our most popular services
        </p>

        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-6">
          {plans.map((p, i) => (
            <div
              key={i}
              className="border p-6 rounded-[10px] text-center shadow-sm"
            >
              <h3 className="text-[#0B1E36] font-semibold">{p.name}</h3>
              <p className="text-[#5C738A] mt-2 font-bold">
                From <span className="text-[#0B1E36]">{p.price}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-[#0B1E36] text-white px-6 py-3 rounded-[5px]">
            View Full Pricing
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20">
        <h2 className="text-[#0B1E36] text-center text-3xl font-bold mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-[#5C738A] text-[18px] mb-12">
          Got questions? We’ve got answers
        </p>

        <div className="text-[#0B1E36] max-w-4xl mx-auto space-y-4">
          {faqs.map((item, i) => (
            <div key={i} className="border rounded-lg">
              <button
                className="w-full flex justify-between p-4 font-medium"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {item.question}
                <span>{open === i ? "-" : "+"}</span>
              </button>

              {open === i && (
                <div className="px-4 pb-4 text-gray-600">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
