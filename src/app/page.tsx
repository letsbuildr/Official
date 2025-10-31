import Image from "next/image";

export default function HeroSection() {
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
        Website Development
       </div>
       <h3 className="mb-2   text-4xl md:text-5xl leading-tight">
        Transforming Ideas 
       </h3>
       <h3 className="mb-1 text-4xl md:text-5xl  leading-tight">
        into
        </h3>
        <h3 className="mb-1 text-4xl md:text-5xl  leading-tight">
          Digital Experiences
          </h3>

         <div className="text-gray-300 mt-4 mb-6 text-base max-w-md leading-relaxed">
  We design and build websites that are fast, scalable, and built to grow
  with your business.
</div>


        <div className="flex justify-center md:justify-start gap-4">
          <button className="px-10 py-2 bg-[#0077B6]  text-white  rounded-lg transition">
            Start Your Project
          </button>
          <button className="px-10 py-2 border border-white text-white hover:bg-[#0B1E36] hover:text-[#FFFFFF] rounded-lg transition duration-300">
  View Our Works
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
    We combine technical excellence with creative vision to deliver websites that drive results.
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


      <h3 className="text-xl font-semibold text-[#0B1E36] mb-2">Speed & Performance</h3>
      <p className="text-[#4A5565] text-sm">
     Lightning-fast load times and,
     </p>
     <p className="text-[#4A5565] text-sm">
optimized code for peak
</p>
<p className="text-[#4A5565] text-sm">
performance across all devices.
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
      <h3 className="text-xl font-semibold text-[#0B1E36] mb-2">Exceptional Design
Quality</h3>
      <p className="text-[#4A5565] text-sm">
     Beautiful, modern interfaces that
     </p>
     <p className="text-[#4A5565] text-sm">
captivate users and elevate your
</p>
<p className="text-[#4A5565] text-sm">
brand identity.
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


      <h3 className="text-xl font-semibold text-[#0B1E36] mb-2">Fully Responsive Layouts</h3>
      <p className="text-[#4A5565] text-sm">
     Seamless experiences on mobile,
     </p>
     <p className="text-[#4A5565] text-sm">
tablet, and desktop - your site
</p>
<p className="text-[#4A5565] text-sm">
looks perfect everywhere.
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


      <h3 className="text-xl font-semibold text-[#0B1E36] mb-2">Ongoing Support &
Maintenance</h3>
      <p className="text-[#4A5565] text-sm">
  Continuous updates, security
     </p>
     <p className="text-[#4A5565] text-sm">
patches, and technical support
</p>
<p className="text-[#4A5565] text-sm">
to keep your site running smoothly.
      </p>
    </div>
  </div>
</section>

      </>

  );
}
