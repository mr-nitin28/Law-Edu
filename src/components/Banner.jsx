import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20 font-['Georgia','Times_New_Roman',serif]">
      {/* Main Banner Container - Same as Header Background */}
      <div className="relative bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 overflow-hidden rounded-2xl shadow-2xl border border-stone-200">
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-stone-200/30 rounded-full blur-2xl"></div>
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-amber-400/40 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-stone-400/40 rounded-full"></div>
        
        {/* Content Container */}
        <div className="relative flex flex-col lg:flex-row items-center px-6 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left text-stone-800 space-y-4 sm:space-y-6">
            
            {/* Professional Badge */}
            <div className="hidden sm:inline-flex items-center px-4 py-2 bg-amber-100 backdrop-blur-sm rounded-xl text-sm border border-amber-200">
              <div className="w-2 h-2 bg-amber-600 rounded-full mr-2"></div>
              <span className="font-['Open_Sans',sans-serif] font-medium text-amber-700">Join Legal Excellence</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-stone-800">
                Book Consultation
              </h2>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                With{' '}
                <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">50+ Trusted</span>
                {' '}Legal Experts
              </h3>
            </div>

            {/* Description */}
            <p className="hidden sm:block text-stone-600 text-sm md:text-base max-w-lg mx-auto lg:mx-0 font-['Open_Sans',sans-serif] leading-relaxed">
              Connect with experienced legal professionals and accelerate your law school journey with personalized expert guidance.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start space-x-4 sm:space-x-6 text-stone-700 text-sm sm:text-base">
              <div className="text-center">
                <div className="font-bold text-lg font-['Georgia',serif] text-amber-700">50+</div>
                <div className="text-xs text-stone-500 font-['Open_Sans',sans-serif]">Legal Experts</div>
              </div>
              <div className="w-px h-8 bg-stone-300"></div>
              <div className="text-center">
                <div className="font-bold text-lg font-['Georgia',serif] text-amber-700">5,000+</div>
                <div className="text-xs text-stone-500 font-['Open_Sans',sans-serif]">Students</div>
              </div>
              <div className="w-px h-8 bg-stone-300"></div>
              <div className="text-center">
                <div className="font-bold text-lg flex items-center justify-center font-['Georgia',serif] text-amber-700">
                  4.9 <div className="w-3 h-3 bg-amber-600 rounded-full ml-1"></div>
                </div>
                <div className="text-xs text-stone-500 font-['Open_Sans',sans-serif]">Rating</div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button 
                onClick={() => { navigate('/login'); scrollTo(0, 0) }}
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 hover:from-amber-700 hover:to-amber-800 font-['Open_Sans',sans-serif]"
              >
                <span className="flex items-center">
                  Book Free Consultation
                  <div className="ml-2 w-4 h-4 sm:w-5 sm:h-5">
                    <div className="w-full h-0.5 bg-white rounded-full transform rotate-45 translate-y-2"></div>
                    <div className="w-full h-0.5 bg-white rounded-full transform -rotate-45 -translate-y-0.5"></div>
                  </div>
                </span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="hidden lg:flex items-center space-x-4 pt-6">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-1.5">
                  {[assets.law1, assets.law2, assets.law3, assets.law4].map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Student"
                      className="w-8 h-8 border-2 border-white rounded-full object-cover object-top shadow-sm"
                    />
                  ))}
                </div>
                <span className="text-stone-600 text-sm font-['Open_Sans',sans-serif]">Join 5,000+ successful students</span>
              </div>
              <div className="w-px h-6 bg-stone-300"></div>
              <div className="text-sm text-stone-600 font-['Open_Sans',sans-serif]">
                <span className="font-semibold text-stone-800">Free</span> consultation & study plan
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-8">
            <div className="relative max-w-xs sm:max-w-sm mx-auto lg:max-w-none">
              
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200">
                <img 
                  className="w-full h-auto object-cover" 
                  src={assets.appointment_img} 
                  alt="Legal Consultation Platform"
                />
                {/* Professional overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-stone-900/10"></div>
              </div>

              {/* Floating Success Badge */}
              <div className="hidden md:block absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-xl border border-stone-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <div className="text-xs font-['Open_Sans',sans-serif]">
                    <div className="font-bold text-stone-800">Consultation Booked!</div>
                    <div className="text-stone-600">Expert available now</div>
                  </div>
                </div>
              </div>

              {/* Floating Achievement Badge */}
              <div className="hidden lg:block absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl border border-stone-200">
                <div className="text-center">
                  <div className="text-lg font-bold text-amber-700 font-['Georgia',serif]">92%</div>
                  <div className="text-xs text-stone-600 font-['Open_Sans',sans-serif]">Success Rate</div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="hidden sm:block lg:hidden absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-stone-200">
                <div className="flex items-center space-x-4 text-xs font-['Open_Sans',sans-serif]">
                  <div className="text-center">
                    <div className="font-bold text-amber-700">4.9</div>
                    <div className="text-stone-600">Rating</div>
                  </div>
                  <div className="w-px h-6 bg-stone-300"></div>
                  <div className="text-center">
                    <div className="font-bold text-amber-700">15+</div>
                    <div className="text-stone-600">Years Exp</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
