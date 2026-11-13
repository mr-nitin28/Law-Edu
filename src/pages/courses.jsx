import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import coursesDataJson from '../data/coursesData.json';
import { getCourseImage } from '../assets/assets';
import { Star, Award, ArrowRight, BookOpen, CheckCircle } from 'lucide-react';

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load courses from local JSON
  useEffect(() => {
    const loadCourses = () => {
      try {
        setLoading(true)
        const allCourses = coursesDataJson.courses || [];
        setCourses(allCourses);
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

  const filteredCourses = selectedCategory === 'All'
    ? courses
    : courses.filter(c => c.category === selectedCategory || (selectedCategory === 'Admissions' && (c.category === 'Complete Package' || c.category === 'Skills Development')));

  const categories = ['All', 'LSAT', 'LNAT', 'Admissions'];

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
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 font-['Open_Sans',sans-serif] ${
                selectedCategory === cat
                  ? 'bg-amber-700 text-white shadow-md'
                  : 'bg-white/80 text-stone-700 hover:bg-amber-50 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-stone-800 mb-2">No Courses Available</h3>
            <p className="text-stone-600 font-['Open_Sans',sans-serif]">Please select another category to view available courses.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group bg-white/95 backdrop-blur-sm shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden relative rounded-2xl border border-stone-200/90 flex flex-col justify-between"
            >
              {/* Course Header with High-Quality Photography */}
              <div className="relative h-48 sm:h-56 bg-stone-900 overflow-hidden">
                  <img
                    src={getCourseImage(course)}
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/35 to-stone-900/10 pointer-events-none"></div>

                  {/* Badges on Image */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="bg-amber-600/95 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-lg shadow font-['Open_Sans',sans-serif]">
                      {course.category}
                    </span>
                    {course.featured && (
                      <span className="bg-stone-900/80 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-['Open_Sans',sans-serif]">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 z-10 flex items-center bg-stone-950/75 backdrop-blur-md border border-white/15 px-3 py-1 rounded-lg shadow">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 mr-1.5" />
                    <span className="text-xs font-bold text-white font-['Open_Sans',sans-serif]">{course.rating}</span>
                  </div>

                  {/* Bottom Image Stats */}
                  <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-white/90">
                    <span className="text-xs font-medium text-amber-200/95 font-['Open_Sans',sans-serif] flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      Top 1% Tutors
                    </span>
                    <span className="text-xs text-stone-300 font-['Open_Sans',sans-serif] bg-black/45 px-2.5 py-0.5 rounded">
                      {course.duration}
                    </span>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  {/* Title Section */}
                  <div className="mb-4">
                    <h3 
                      onClick={() => navigate(`/course/${course.id}`)}
                      className="text-xl sm:text-2xl font-bold text-stone-800 mb-1.5 hover:text-amber-700 cursor-pointer transition-colors duration-200 font-['Georgia',serif]"
                    >
                      {course.title}
                    </h3>
                    <p className="text-amber-800 font-medium text-sm mb-2 font-['Open_Sans',sans-serif]">{course.subtitle}</p>
                    <p className="text-stone-600 leading-relaxed text-sm line-clamp-2 font-['Open_Sans',sans-serif]">{course.description}</p>
                  </div>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="font-bold text-stone-800 mb-3 text-xs uppercase tracking-wide">
                      Highlights:
                    </h4>
                    <div className="space-y-2">
                      {course.highlights.slice(0, 3).map((highlight, index) => (
                        <div key={index} className="flex items-start text-xs sm:text-sm text-stone-600 font-['Open_Sans',sans-serif]">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-600 mr-2.5 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-1">{highlight}</span>
                        </div>
                      ))}
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
                    className="group inline-flex items-center justify-center px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold hover:from-amber-700 hover:to-amber-800 transform hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg rounded-xl text-sm font-['Open_Sans',sans-serif]"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
