import React, { useState, useEffect, useContext } from 'react'
import { assets } from '../assets/assets'
import { 
  ChevronRight, 
  Star, 
  Users, 
  Play,
  ArrowRight,
  Award,
  Target,
  BookOpen
} from 'lucide-react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Header = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { token, userData } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleDemoClick = (e) => {
    e.preventDefault()
    if (!token || !userData) {
      toast.error('Please sign in to book your free demo')
      navigate('/login?mode=login')
      return
    }
    // Navigate to consultation booking
    navigate('/book-consultation')
  }

  return (
    <div className="bg-to-br from-stone-50 via-amber-50/30 to-stone-100 font-['Georgia','Times_New_Roman',serif]">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden hidden lg:block">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-stone-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-amber-400/40 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-stone-400/40 rounded-full"></div>
      </div>

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-[80vh] lg:min-h-screen py-12 lg:py-20 gap-8 lg:gap-16">
          
          {/* Left Content */}
          <div className={`w-full lg:w-1/2 text-center lg:text-left space-y-6 lg:space-y-8 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          }`}>
            
            {/* Trust Badge */}
            <div className="hidden sm:inline-flex items-center justify-center lg:justify-start">
              <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl border border-amber-200 shadow-sm">
                <Award className="w-4 h-4 text-amber-600 mr-2" />
                <span className="text-sm font-medium text-stone-700 font-['Open_Sans',sans-serif]">
                  Trusted by 5,000+ Law Students
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-stone-800 leading-tight">
                Ace the LSAT &
                <br />
                <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                  LNAT with Expert
                </span>
                <br />
                Tutors
              </h1>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-stone-600 max-w-lg mx-auto lg:mx-0 font-['Open_Sans',sans-serif] leading-relaxed">
                Master law school admissions tests with personalized coaching from top-scoring tutors. 
                Join thousands who've achieved their target scores with our proven methods.
              </p>

              {/* Key Benefits */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm font-['Open_Sans',sans-serif]">
                <div className="flex items-center space-x-2 text-stone-600">
                  <Target className="w-4 h-4 text-amber-600" />
                  <span>Personalized Study Plans</span>
                </div>
                <div className="flex items-center space-x-2 text-stone-600">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>Expert Strategies</span>
                </div>
                <div className="flex items-center space-x-2 text-stone-600">
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>1-on-1 Coaching</span>
                </div>
              </div>

              {/* Social Proof */}
              
              

              {/* Success Statistics */}
              <div className="flex items-center justify-center lg:justify-start space-x-6 sm:space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-amber-700">27+</div>
                  <div className="text-xs sm:text-sm text-stone-500 font-['Open_Sans',sans-serif]">Avg LNAT Score</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-amber-600">165+</div>
                  <div className="text-xs sm:text-sm text-stone-500 font-['Open_Sans',sans-serif]">Avg LSAT Score</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-emerald-600">92%</div>
                  <div className="text-xs sm:text-sm text-stone-500 font-['Open_Sans',sans-serif]">Success Rate</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={handleDemoClick}
                className="w-full sm:w-auto group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-['Open_Sans',sans-serif]"
              >
                <span className="flex items-center">
                  {token && userData ? 'Book a Free Demo' : 'Sign in for Free Demo'}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>

              <button 
                onClick={() => navigate('/courses')}
                className="w-full sm:w-auto group inline-flex items-center justify-center px-6 py-4 border-2 border-amber-600 text-amber-700 font-semibold rounded-xl hover:bg-amber-50 transition-all duration-300 font-['Open_Sans',sans-serif]"
              >
                <Play className="mr-2 w-4 h-4" />
                <span>View Courses</span>
              </button>
            </div>

            {/* Additional Trust Indicators */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-amber-500 fill-current" />
                <span className="text-sm text-stone-600 font-['Open_Sans',sans-serif]">
                  <span className="font-semibold">4.9/5</span> from 500+ reviews
                </span>
              </div>
              <div className="w-px h-6 bg-stone-300"></div>
              <div className="text-sm text-stone-600 font-['Open_Sans',sans-serif]">
                <span className="font-semibold">Free</span> consultation & study plan
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className={`w-full lg:w-1/2 mt-8 lg:mt-0 relative transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          }`}>
            
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Main Image Container */}
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl border border-stone-200">
                <img 
                  className="w-full h-auto object-cover" 
                  src={assets.header_img} 
                  alt="LSAT and LNAT Expert Tutoring"
                />
                {/* Professional overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-stone-900/10"></div>
                
                {/* Study Session Indicator */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-stone-800 font-['Open_Sans',sans-serif]">
                      Live tutoring session
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Achievement Bar */}
              <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-stone-200">
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <p className="text-lg font-bold text-amber-700 font-['Georgia',serif]">Oxford</p>
                    <p className="text-xs text-stone-500 font-['Open_Sans',sans-serif]">Ready</p>
                  </div>
                  <div className="w-px h-8 bg-stone-300"></div>
                  <div className="text-center flex-1">
                    <p className="text-lg font-bold text-amber-700 font-['Georgia',serif]">Harvard</p>
                    <p className="text-xs text-stone-500 font-['Open_Sans',sans-serif]">Ready</p>
                  </div>
                  <div className="w-px h-8 bg-stone-300"></div>
                  <div className="text-center flex-1">
                    <p className="text-lg font-bold text-emerald-600 font-['Georgia',serif]">Top 1%</p>
                    <p className="text-xs text-stone-500 font-['Open_Sans',sans-serif]">Scores</p>
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

export default Header
