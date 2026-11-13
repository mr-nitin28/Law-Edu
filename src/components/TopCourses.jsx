import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  BookOpen, 
  Star, 
  ArrowRight,
  Award
} from 'lucide-react'
import { toast } from 'react-toastify'
import coursesDataJson from '../data/coursesData.json'
import { getCourseImage } from '../assets/assets'

const TopCourses = () => {
  const navigate = useNavigate()
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
    <section className="w-full py-16 sm:py-20 bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 font-['Georgia','Times_New_Roman',serif]">
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
              {/* Course Header with High-Quality Photography */}
              <div className="relative h-44 sm:h-52 overflow-hidden bg-stone-900 group">
                <img
                  src={getCourseImage(course)}
                  alt={course.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                {/* Visual Depth Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/35 to-stone-900/10 pointer-events-none"></div>

                {/* Category & Status Badges */}
                <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2">
                  <span className="bg-amber-600/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-sm font-['Open_Sans',sans-serif]">
                    {course.category}
                  </span>
                  {course.featured && (
                    <span className="bg-stone-900/85 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-['Open_Sans',sans-serif]">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                      Featured
                    </span>
                  )}
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3.5 right-3.5 z-10 flex items-center bg-stone-950/75 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-lg shadow">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 mr-1" />
                  <span className="text-xs font-bold text-white font-['Open_Sans',sans-serif]">{course.rating}</span>
                </div>

                {/* Bottom title preview on image */}
                <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-white/90">
                  <span className="text-xs font-medium text-amber-200/95 font-['Open_Sans',sans-serif] flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    Top Law School Target
                  </span>
                  <span className="text-xs text-stone-300 font-['Open_Sans',sans-serif] bg-black/40 px-2 py-0.5 rounded">
                    {course.duration}
                  </span>
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
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Explore All Courses
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TopCourses
