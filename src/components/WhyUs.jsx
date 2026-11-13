import React from 'react'
import { useNavigate } from 'react-router-dom'

const WhyUs = () => {
  const navigate = useNavigate()

  const features = [
    {
      title: "Real Expert Tutors",
      description: "Learn from top-scoring LSAT & LNAT professionals with proven track records in law school admissions success.",
      highlight: "175+ LSAT & 32+ LNAT Average Scores"
    },
    {
      title: "Official Resources",
      description: "Access authentic practice materials, official test prep content, and exclusive study guides from leading institutions.",
      highlight: "100% Authentic Materials"
    },
    {
      title: "Proven Results",
      description: "Join 5,000+ students who achieved their target scores and secured admissions to top law schools worldwide.",
      highlight: "92% Success Rate"
    },
    {
      title: "Personalized Learning",
      description: "Custom study plans, 1-on-1 coaching sessions, and adaptive practice tests tailored to your specific needs.",
      highlight: "Individual Attention"
    }
  ]

  return (
    <section className="w-full py-16 sm:py-20 bg-gradient-to-br from-white via-stone-50/50 to-amber-50/30 font-['Georgia','Times_New_Roman',serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-xl text-amber-700 text-sm font-medium mb-6 border border-amber-200">
            <div className="w-2 h-2 bg-amber-600 rounded-full mr-2"></div>
            <span className="font-['Open_Sans',sans-serif]">Why Choose Us</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-800 mb-4 leading-tight">
            Why Students Choose
            <br />
            <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              Our Platform
            </span>
          </h2>
          
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed font-['Open_Sans',sans-serif]">
            Discover what makes our law school preparation program the preferred choice for serious students
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-200 hover:border-amber-200"
            >
              {/* Feature Number */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white font-bold text-lg font-['Georgia',serif] shadow-lg">
                    {index + 1}
                  </div>
                </div>
                
                <div className="flex-1">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-stone-800 mb-2 font-['Georgia',serif] group-hover:text-amber-700 transition-colors">
                    {feature.title}
                  </h3>
                  
                  {/* Highlight Badge */}
                  <div className="inline-flex items-center px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium mb-3 border border-amber-200">
                    <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mr-2"></div>
                    <span className="font-['Open_Sans',sans-serif]">{feature.highlight}</span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-stone-600 leading-relaxed font-['Open_Sans',sans-serif]">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-stone-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-amber-700 mb-1 font-['Georgia',serif]">15+</div>
              <div className="text-sm text-stone-600 font-['Open_Sans',sans-serif]">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-amber-700 mb-1 font-['Georgia',serif]">5,000+</div>
              <div className="text-sm text-stone-600 font-['Open_Sans',sans-serif]">Students Trained</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1 font-['Georgia',serif]">92%</div>
              <div className="text-sm text-stone-600 font-['Open_Sans',sans-serif]">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-amber-700 mb-1 font-['Georgia',serif]">50+</div>
              <div className="text-sm text-stone-600 font-['Open_Sans',sans-serif]">Expert Tutors</div>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  )
}

export default WhyUs
