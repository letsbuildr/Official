"use client";

export default function AboutPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9FAFB] to-[#E6F0FA] px-6 py-20">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-10 border border-gray-100">
        <h2 className="text-3xl font-bold text-[#0B1E36] mb-4 text-center">
          About Us
        </h2>

        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
          Learn more about who we are, what we do, and why we do it.
        </p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            <span className="font-semibold text-[#0B1E36]">Bomcel Digital</span>
            is a forward-thinking digital solutions company dedicated to helping
            individuals and businesses grow through technology. We create
            powerful, clean, and efficient digital tools that make processes
            simpler, faster, and smarter.
          </p>

          <p>
            Our mission is to deliver modern, reliable, and user-friendly
            platforms that empower people to achieve more. From web design to
            backend systems, we focus on building experiences that are seamless
            and impactful.
          </p>

          <p>
            We believe technology should be simple, accessible, and effective.
            That's why we consistently innovate, improve, and develop solutions
            that meet the needs of today’s digital world.
          </p>

          <p>
            With a team grounded in creativity, excellence, and integrity,
            Bomcel Digital continues to grow as a brand known for quality and
            customer-focused service.
          </p>
        </div>

        <div className="text-center mt-10">
          <a
            href="/contact"
            className="px-6 py-2 bg-[#0077B6] text-white rounded-lg hover:bg-[#005F91] transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
