import React, { useState, useEffect } from 'react'
import { testimonialsData } from '../data/testimonialsData'

const StudentTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState({})

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length)
  }

  // Handle image load errors
  const handleImageError = (testimonialId) => {
    setImageErrors(prev => ({ ...prev, [testimonialId]: true }))
  }

  // Profile Image Component with fallback
  const ProfileImage = ({ testimonial }) => {
    const hasError = imageErrors[testimonial.id]
    
    return (
      <div className="relative mb-4 sm:mb-0">
        {!hasError ? (
          <img
            src={`/assets/testimonials/${testimonial.photo}`}
            alt={testimonial.name}
            className="w-20 h-20 rounded-xl object-cover border-4 border-white shadow-lg"
            onError={() => handleImageError(testimonial.id)}
            onLoad={() => setImageErrors(prev => ({ ...prev, [testimonial.id]: false }))}
          />
        ) : (
          // Fallback avatar with initials
          <div className="w-20 h-20 rounded-xl border-4 border-white shadow-lg bg-to-br from-amber-500 to-amber-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl font-['Georgia',serif]">
              {testimonial.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
        
        {/* Achievement badge */}
        <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-lg p-1.5">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
      </div>
    )
  }

  // Enhanced Testimonial Card
  const TestimonialCard = ({ testimonial, isActive }) => (
    <div className={`
      relative bg-white/90 backdrop-blur-sm shadow-xl border border-stone-200 rounded-2xl
      transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl
      ${isActive ? 'opacity-100 translate-x-0' : 'opacity-75 translate-x-4'}
      p-6 sm:p-8 h-full flex flex-col overflow-hidden
    `}>
      
      {/* Decorative Quote Shape */}
      <div className="absolute top-6 right-6 opacity-10">
        <div className="w-12 h-12 bg-amber-200 rounded-xl transform rotate-12"></div>
      </div>

      {/* Student Profile Header */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start mb-6">
        <ProfileImage testimonial={testimonial} />
        
        <div className="sm:ml-6 text-center sm:text-left flex-1">
          <h3 className="text-xl font-bold text-stone-800 mb-2 font-['Georgia',serif]">{testimonial.name}</h3>
          <p className="text-amber-700 font-semibold text-sm font-['Open_Sans',sans-serif]">{testimonial.role}</p>
        </div>
      </div>

      {/* Testimonial Quote */}
      <div className="relative z-10 flex-1 mb-6">
        <p className="text-stone-700 leading-relaxed text-center sm:text-left italic text-lg font-['Open_Sans',sans-serif]">
          "{testimonial.testimonial}"
        </p>
      </div>

      {/* Bottom accent */}
      <div className="w-full h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"></div>
    </div>
  )

  return (
    <section className="py-16 px-4 bg-to-br from-stone-50 via-amber-50/30 to-stone-100 relative overflow-hidden font-['Georgia','Times_New_Roman',serif]">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-stone-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-amber-400/40 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-stone-400/40 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-xl text-amber-700 text-sm font-medium mb-6 border border-amber-200">
            <div className="w-2 h-2 bg-amber-600 rounded-full mr-2"></div>
            <span className="font-['Open_Sans',sans-serif]">SUCCESS STORIES</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-stone-800">
            Real Students,
            <br />
            <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              Real Success
            </span>
          </h2>
          
          <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed font-['Open_Sans',sans-serif]">
            Discover how our students achieved their target LSAT & LNAT scores and secured admission to top law schools
          </p>
        </div>

        {/* Testimonial Display */}
        <div className="relative mb-12">
          
          {/* Single Card for Mobile */}
          <div className="block md:hidden">
            <TestimonialCard 
              testimonial={testimonialsData[currentIndex]} 
              isActive={true}
            />
          </div>

          {/* Desktop: Show 2 cards side by side */}
          <div className="hidden md:grid md:grid-cols-2 gap-8">
            <TestimonialCard 
              testimonial={testimonialsData[currentIndex]} 
              isActive={true}
            />
            <TestimonialCard 
              testimonial={testimonialsData[(currentIndex + 1) % testimonialsData.length]} 
              isActive={true}
            />
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center space-x-6 mb-16">
          <button
            onClick={goToPrevious}
            className="group p-4 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-200 hover:border-amber-200 rounded-xl"
            aria-label="Previous testimonials"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="w-3 h-0.5 bg-stone-600 group-hover:bg-amber-600 transition-colors transform -rotate-45 translate-x-0.5"></div>
              <div className="w-3 h-0.5 bg-stone-600 group-hover:bg-amber-600 transition-colors transform rotate-45 -translate-x-0.5"></div>
            </div>
          </button>

          {/* Dot Indicators */}
          <div className="flex space-x-3">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === index
                    ? 'w-8 h-3 bg-gradient-to-r from-amber-500 to-amber-600'
                    : 'w-3 h-3 bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="group p-4 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-200 hover:border-amber-200 rounded-xl"
            aria-label="Next testimonials"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <div className="w-3 h-0.5 bg-stone-600 group-hover:bg-amber-600 transition-colors transform rotate-45 translate-x-0.5"></div>
              <div className="w-3 h-0.5 bg-stone-600 group-hover:bg-amber-600 transition-colors transform -rotate-45 -translate-x-0.5"></div>
            </div>
          </button>
        </div>

       
      </div>
    </section>
  )
}

export default StudentTestimonials
