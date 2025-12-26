import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import coursesDataJson from '../data/coursesData.json';

const Courses = () => {
  const navigate = useNavigate();
  const { token, userData, backendUrl } = useContext(AppContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load courses from local JSON
  useEffect(() => {
    const loadCourses = () => {
      try {
        setLoading(true)
        // Load from local JSON file
        const allCourses = coursesDataJson.courses || [];
        // Filter to only show LSAT and LNAT courses
        const filteredCourses = allCourses.filter(course => 
          course.category === 'LSAT' || course.category === 'LNAT'
        )
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
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 pt-20 flex items-center justify-center font-['Georgia','Times_New_Roman',serif]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-600 font-['Open_Sans',sans-serif]">Loading courses...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 pt-20 flex items-center justify-center font-['Georgia','Times_New_Roman',serif]">
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
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 pt-20 font-['Georgia','Times_New_Roman',serif]">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-xl text-amber-700 text-sm font-medium mb-6 border border-amber-200">
              <div className="w-2 h-2 bg-amber-600 rounded-full mr-2"></div>
              <span className="font-['Open_Sans',sans-serif]">All Courses</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-800 mb-4 leading-tight">
              Master Your Law School
              <br />
              <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                Entrance Exams
              </span>
            </h1>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed font-['Open_Sans',sans-serif]">
              Comprehensive preparation courses designed to help you succeed in LSAT and LNAT exams with expert guidance
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Courses Grid */}
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-stone-200 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <div className="w-8 h-8 bg-stone-400 rounded"></div>
            </div>
            <h3 className="text-xl font-bold text-stone-800 mb-2">No Courses Available</h3>
            <p className="text-stone-600 font-['Open_Sans',sans-serif]">LSAT and LNAT courses will be available soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {courses.map((course) => (
            <div
              key={course.id}
              className="group bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative hover:scale-[1.02] rounded-2xl border border-stone-200"
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

              {/* Course Header */}
              <div className="relative h-40 sm:h-48 bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 bg-white/20 rounded-2xl flex items-center justify-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-lg"></div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">{course.category}</h3>
                  <p className="text-amber-100 text-sm font-['Open_Sans',sans-serif]">Professional Preparation</p>
                </div>
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-xl">
                  <div className="w-3 h-3 bg-yellow-300 rounded-full mr-2"></div>
                  <span className="text-sm font-semibold text-white font-['Open_Sans',sans-serif]">{course.rating}</span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                
                {/* Title Section */}
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-800 mb-2 hover:text-amber-700 cursor-pointer transition-colors duration-200">
                    {course.title}
                  </h3>
                  <p className="text-stone-600 font-medium mb-2 font-['Open_Sans',sans-serif]">{course.subtitle}</p>
                  <p className="text-stone-600 leading-relaxed line-clamp-2 font-['Open_Sans',sans-serif]">{course.description}</p>
                </div>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="font-bold text-stone-800 mb-3 text-sm uppercase tracking-wide">
                    Key Features:
                  </h4>
                  <div className="space-y-2">
                    {course.highlights.slice(0, 3).map((highlight, index) => (
                      <div key={index} className="flex items-start text-sm text-stone-600 font-['Open_Sans',sans-serif]">
                        <div className="w-2 h-2 bg-amber-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span>{highlight}</span>
                      </div>
                    ))}
                    {course.highlights.length > 3 && (
                      <p className="text-sm text-amber-700 font-medium ml-5 font-['Open_Sans',sans-serif]">
                        +{course.highlights.length - 3} more features
                      </p>
                    )}
                  </div>
                </div>

                {/* Pricing and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-stone-800">
                      ₹{course.price}
                    </span>
                    {course.originalPrice && (
                      <>
                        <span className="text-lg text-stone-400 line-through font-['Open_Sans',sans-serif]">
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
                    className="group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold hover:from-amber-700 hover:to-amber-800 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl font-['Open_Sans',sans-serif]"
                  >
                    View Details
                    <div className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300">
                      <div className="w-full h-0.5 bg-white rounded-full transform rotate-45 translate-y-2"></div>
                      <div className="w-full h-0.5 bg-white rounded-full transform -rotate-45 -translate-y-0.5"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        </div>

      {/* CSS for line clamping */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Courses;
