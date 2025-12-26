import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  BookOpen, 
  Star, 
  ArrowRight,
  Award,
  CheckCircle,
  TrendingUp,
  Loader
} from 'lucide-react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import coursesDataJson from '../data/coursesData.json'

const TopCourses = () => {
  const navigate = useNavigate()
  const { token, userData, backendUrl } = useContext(AppContext)
  const [hoveredCourse, setHoveredCourse] = useState(null)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load courses from local JSON
  useEffect(() => {
    const loadCourses = () => {
      try {
        setLoading(true)
        // Load from local JSON file
        const allCourses = coursesDataJson.courses || [];
        // Filter to only show featured LSAT and LNAT courses, limit to 2
        const filteredCourses = allCourses
          .filter(course => course.featured && (course.category === 'LSAT' || course.category === 'LNAT'))
          .slice(0, 2); // Show only first 2 featured courses
        setCourses(filteredCourses)
        setError(null)
      } catch (error) {
        console.error('Error loading courses:', error)
        setError('Failed to load courses')
        toast.error('Failed to load courses')
      } finally {
        setLoading(false)
      }
    }

    loadCourses()
  }, [])

  if (loading) {
    return (
      <section className="py-12 bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-stone-600 font-['Open_Sans',sans-serif]">Loading courses...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-12 bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-700 mb-4 font-['Open_Sans',sans-serif]">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg font-['Open_Sans',sans-serif]"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-to-br from-stone-50 via-amber-50/30 to-stone-100 font-['Georgia','Times_New_Roman',serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-xl text-amber-700 text-sm font-medium mb-4 border border-amber-200">
            <div className="w-2 h-2 bg-amber-600 rounded-full mr-2"></div>
            <span className="font-['Open_Sans',sans-serif]">Featured Courses</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-800 mb-3 leading-tight">
            Master Your Law School
            <br />
            <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              Entrance Exams
            </span>
          </h2>
          
          <p className="text-sm sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed px-4 font-['Open_Sans',sans-serif]">
            Expert preparation courses for LSAT and LNAT success
          </p>
        </div>

        {/* Courses Grid - 2 Columns with Larger Cards */}
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-stone-200 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <div className="w-8 h-8 bg-stone-400 rounded"></div>
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2 font-['Georgia',serif]">No Featured Courses Available</h3>
            <p className="text-stone-600 font-['Open_Sans',sans-serif]">LSAT and LNAT courses will be available soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {courses.map((course) => (
            <div
              key={course.id}
              className={`group relative bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden rounded-xl border border-stone-200 ${
                hoveredCourse === course.id ? 'transform scale-[1.02]' : ''
              }`}
              onMouseEnter={() => setHoveredCourse(course.id)}
              onMouseLeave={() => setHoveredCourse(null)}
            >
              {/* Featured Badge */}
              {course.featured && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1.5 rounded-xl text-xs font-semibold font-['Open_Sans',sans-serif] shadow-lg">
                  <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full mr-2"></div>
                    Featured
                  </div>
                </div>
              )}

              {/* Course Header - Increased Size */}
              <div className="relative h-28 sm:h-32 bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 bg-white/20 rounded-xl flex items-center justify-center">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded"></div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-['Georgia',serif]">{course.category}</h3>
                  <p className="text-amber-100 text-sm font-['Open_Sans',sans-serif]">Professional Preparation</p>
                </div>
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-xl">
                  <div className="w-3 h-3 bg-yellow-300 rounded-full mr-2"></div>
                  <span className="text-xs font-semibold text-white font-['Open_Sans',sans-serif]">{course.rating}</span>
                </div>
              </div>

              {/* Course Content - Increased Padding */}
              <div className="p-5 sm:p-6">
                
                {/* Title Section */}
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-stone-800 mb-2 hover:text-amber-700 cursor-pointer transition-colors duration-200 line-clamp-2 font-['Georgia',serif]">
                    {course.title}
                  </h3>
                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed line-clamp-2 font-['Open_Sans',sans-serif]">{course.description}</p>
                </div>

                {/* Key Features - Only 2 Highlights with Better Spacing */}
                <div className="mb-5">
                  <h4 className="font-semibold text-stone-800 mb-3 text-sm sm:text-base font-['Georgia',serif]">
                    Course Highlights:
                  </h4>
                  <div className="space-y-2">
                    {/* Show only first 2 highlights */}
                    {course.highlights.slice(0, 2).map((highlight, index) => (
                      <div key={index} className="flex items-start text-sm text-stone-600 font-['Open_Sans',sans-serif]">
                        <div className="w-2 h-2 bg-amber-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="line-clamp-1">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing and CTA - Enhanced Size */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl sm:text-2xl font-bold text-stone-800 font-['Georgia',serif]">
                      ₹{course.price}
                    </span>
                    {course.originalPrice && (
                      <>
                        <span className="text-sm text-stone-400 line-through font-['Open_Sans',sans-serif]">
                          ₹{course.originalPrice}
                        </span>
                        <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg text-xs font-semibold font-['Open_Sans',sans-serif]">
                          Save ₹{course.originalPrice - course.price}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <button
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="group inline-flex items-center justify-center px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold hover:from-amber-700 hover:to-amber-800 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl text-sm rounded-xl font-['Open_Sans',sans-serif]"
                  >
                    <span className="hidden sm:inline">View Details</span>
                    <span className="sm:hidden">View</span>
                    <ArrowRight className="w-4 h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="">
            <button
              onClick={() => navigate('/courses')}
              className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold hover:from-amber-700 hover:to-amber-800 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base rounded-xl font-['Open_Sans',sans-serif]"
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 bg-white/20 rounded"></div>
              Explore All Courses
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* CSS for line clamping */}
      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}

export default TopCourses
