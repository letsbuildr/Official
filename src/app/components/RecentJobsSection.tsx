import React from 'react'
import Image from 'next/image'

export const WhyWorkSection = () => {
  return (
    
        
        <section id="recent-jobs" className="w-full py-20 px-6 md:px-16 bg-[#0B1E36] ">
          {/* Section Title */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Recent Jobs
            </h2>
           <p className="text-gray-300 max-w-2xl mx-auto text-center mb-4">
          Explore our portfolio of successful web projects across various industries.
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
            <span className="w-8 h-1 bg-blue-500 inline-block"></span> {/* horizontal line */}
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
                <h3 className="text-xl font-semibold text-[#0B1E36] mb-2">E-commerce Platform</h3>
                 <p className="text-gray-600 text-sm flex items-center gap-2">
            <span className="w-8 h-1 bg-blue-500 inline-block"></span> {/* horizontal line */}
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
                <h3 className="text-xl font-semibold text-[#0B1E36] mb-2">SaaS Dashboard</h3>
                  <p className="text-gray-600 text-sm flex items-center gap-2">
            <span className="w-8 h-1 bg-blue-500 inline-block"></span> {/* horizontal line */}
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
                <h3 className="text-xl font-semibold text-[#0B1E36] mb-2">Portfolio Website</h3>
                  <p className="text-gray-600 text-sm flex items-center gap-2">
            <span className="w-8 h-1 bg-blue-500 inline-block"></span> {/* horizontal line */}
         Creative
          </p>
                
              </div>
            </div>
          </div>
        </section>
        
    
  )
}
