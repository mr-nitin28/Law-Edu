import React from 'react'
import { assets } from '../assets/assets'
import { 
  Users, 
  Award, 
  BookOpen, 
  Target, 
  Zap,
  CheckCircle,
  Star
} from 'lucide-react'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 pt-20 font-['Georgia','Times_New_Roman',serif]">
      
      {/* Header Section - Matching InstructorsPage Format */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-xl text-amber-700 text-sm font-medium mb-6 border border-amber-200">
              <BookOpen className="w-4 h-4 mr-2" />
              <span className="font-['Open_Sans',sans-serif]">About LawEdu</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-6 leading-tight">
              Empowering Your
              <br />
              <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                Legal Journey
              </span>
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-['Open_Sans',sans-serif]">
              Your trusted partner in LSAT & LNAT preparation and legal career advancement with expert guidance and personalized learning experiences
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* About Content Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Image Section */}
            <div className="relative">
              <img 
                className="w-full rounded-2xl shadow-xl object-cover border border-stone-200" 
                src={assets.about_image} 
                alt="LawEdu - Legal Education Platform"
              />
              {/* Floating Stats Badge */}
              <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-stone-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-white fill-current" />
                  </div>
                  <div>
                    <div className="font-bold text-stone-900">4.9/5</div>
                    <div className="text-sm text-stone-500 font-['Open_Sans',sans-serif]">Student Rating</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-stone-800 mb-6">
                  Empowering Future Legal Professionals
                </h2>
                
                <p className="text-lg text-stone-600 leading-relaxed mb-6 font-['Open_Sans',sans-serif]">
                  Welcome to <span className="font-semibold text-amber-700">LawEdu</span>, your trusted partner in achieving law school admission success. We understand the challenges aspiring lawyers face when preparing for LSAT, LNAT, and law school applications.
                </p>
                
                <p className="text-lg text-stone-600 leading-relaxed mb-8 font-['Open_Sans',sans-serif]">
                  LawEdu is committed to excellence in legal education. We continuously enhance our platform, integrating the latest teaching methodologies and expert insights to improve your learning experience and deliver superior results.
                </p>
              </div>
              
              {/* Mission Statement */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl border border-amber-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="w-6 h-6 text-amber-600" />
                  <h3 className="text-xl font-bold text-stone-800">Our Mission</h3>
                </div>
                <p className="text-stone-700 leading-relaxed font-['Open_Sans',sans-serif]">
                  Our mission is to create a seamless legal education experience for every student. We bridge the gap between aspiration and achievement, making it easier for you to access expert guidance and reach your law school dreams.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-4">
              Why Choose LawEdu
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto font-['Open_Sans',sans-serif]">
              Discover what makes us the preferred choice for law school preparation
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 - Efficiency */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-200 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-4">Efficiency</h3>
              <p className="text-stone-600 leading-relaxed mb-4 font-['Open_Sans',sans-serif]">
                Streamlined learning paths and study schedules designed to fit your busy lifestyle and maximize your LSAT & LNAT preparation time.
              </p>
              <div className="flex items-center text-amber-700 text-sm font-semibold font-['Open_Sans',sans-serif]">
                <CheckCircle className="w-4 h-4 mr-2" />
                Optimized Study Plans
              </div>
            </div>

            {/* Feature 2 - Expert Guidance */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-200 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-4">Expert Guidance</h3>
              <p className="text-stone-600 leading-relaxed mb-4 font-['Open_Sans',sans-serif]">
                Access to a network of top-tier legal education experts and instructors from prestigious law schools worldwide.
              </p>
              <div className="flex items-center text-emerald-700 text-sm font-semibold font-['Open_Sans',sans-serif]">
                <CheckCircle className="w-4 h-4 mr-2" />
                99th Percentile Instructors
              </div>
            </div>

            {/* Feature 3 - Personalization */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-200 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-stone-500 to-stone-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-4">Personalization</h3>
              <p className="text-stone-600 leading-relaxed mb-4 font-['Open_Sans',sans-serif]">
                Tailored study recommendations, progress tracking, and personalized feedback to help you achieve your target LSAT & LNAT scores.
              </p>
              <div className="flex items-center text-stone-700 text-sm font-semibold font-['Open_Sans',sans-serif]">
                <CheckCircle className="w-4 h-4 mr-2" />
                AI-Powered Learning
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 mb-16 border border-stone-200">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-stone-800 mb-4">
              Our Impact in Numbers
            </h3>
            <p className="text-lg text-stone-600 font-['Open_Sans',sans-serif]">
              Real results that speak for our commitment to your success
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600 mb-2">5,000+</div>
              <p className="text-stone-600 font-medium font-['Open_Sans',sans-serif]">Students Trained</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">92%</div>
              <p className="text-stone-600 font-medium font-['Open_Sans',sans-serif]">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-700 mb-2">+15</div>
              <p className="text-stone-600 font-medium font-['Open_Sans',sans-serif]">Avg Score Boost</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-stone-600 mb-2">24/7</div>
              <p className="text-stone-600 font-medium font-['Open_Sans',sans-serif]">Expert Support</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 border border-stone-200">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-stone-800 mb-4">
              Our Core Values
            </h3>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto font-['Open_Sans',sans-serif]">
              The principles that guide everything we do at LawEdu
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <h4 className="text-lg font-bold text-stone-800 mb-2">Excellence</h4>
              <p className="text-stone-600 text-sm font-['Open_Sans',sans-serif]">
                Commitment to the highest standards in legal education
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="text-lg font-bold text-stone-800 mb-2">Results</h4>
              <p className="text-stone-600 text-sm font-['Open_Sans',sans-serif]">
                Focus on measurable outcomes and student success
              </p>
            </div>
            <div className="text-center md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-stone-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-stone-600" />
              </div>
              <h4 className="text-lg font-bold text-stone-800 mb-2">Support</h4>
              <p className="text-stone-600 text-sm font-['Open_Sans',sans-serif]">
                Dedicated guidance throughout your learning journey
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
