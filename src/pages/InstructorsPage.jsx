import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import instructorsDataJson from '../data/instructorsData.json';
import { getInstructorImage } from '../assets/assets';
import { 
  Star, 
  BookOpen,
  Clock,
  GraduationCap,
  Search,
  Calendar
} from 'lucide-react';

const InstructorsPage = () => {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);
  const [filteredInstructors, setFilteredInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

  // Available filter options
  const [specializations, setSpecializations] = useState(['All']);
  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'experience', label: 'Most Experienced' },
    { value: 'name', label: 'Name A-Z' }
  ];

  const loadInstructors = () => {
    try {
      setLoading(true);
      const allInstructors = instructorsDataJson.instructors || [];
      setInstructors(allInstructors);
      
      const uniqueSpecializations = [
        'All',
        ...new Set(allInstructors.flatMap(instructor => instructor.specialization || []))
      ];
      setSpecializations(uniqueSpecializations);
    } catch (error) {
      console.error('Error loading instructors:', error);
      toast.error('Failed to load instructors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInstructors();
  }, []);

  const filterInstructors = useCallback(() => {
    let filtered = [...instructors];

    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(instructor =>
        instructor.name?.toLowerCase().includes(q) ||
        instructor.title?.toLowerCase().includes(q) ||
        instructor.specialization?.some(spec => spec.toLowerCase().includes(q)) ||
        instructor.bio?.toLowerCase().includes(q)
      );
    }

    // Specialization filter
    if (selectedSpecialization && selectedSpecialization !== 'All') {
      filtered = filtered.filter(instructor =>
        instructor.specialization?.includes(selectedSpecialization)
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'experience':
          return (b.credentials?.yearsTeaching || 0) - (a.credentials?.yearsTeaching || 0);
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        default:
          return 0;
      }
    });

    setFilteredInstructors(filtered);
  }, [instructors, searchTerm, selectedSpecialization, sortBy]);

  useEffect(() => {
    filterInstructors();
  }, [filterInstructors]);

  const getAvailabilityStatus = (instructor) => {
    return instructor.availability && instructor.availability.length > 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/20 to-stone-100 flex items-center justify-center pt-20 font-['Georgia','Times_New_Roman',serif]">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-stone-200">
          <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-base font-medium text-stone-900 font-['Open_Sans',sans-serif]">Loading distinguished faculty...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/20 to-stone-100 pt-20 font-['Georgia','Times_New_Roman',serif]">
      {/* Header Section */}
      <div className="bg-white/85 backdrop-blur-sm shadow-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <div className="inline-flex items-center px-3.5 py-1.5 bg-amber-100/90 rounded-full text-amber-800 text-xs font-semibold mb-4 border border-amber-200">
              <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-amber-700" />
              <span className="font-['Open_Sans',sans-serif]">Top 1% Faculty</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-800 mb-3 leading-tight">
              Distinguished Legal{' '}
              <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                Educators & Tutors
              </span>
            </h1>
            <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-['Open_Sans',sans-serif]">
              Elite mentors from Harvard, Yale, Oxford & Stanford ready to accelerate your law school journey
            </p>

            {/* Quick Search & Filters Bar */}
            <div className="mt-6 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by instructor name, exam, or topic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm font-['Open_Sans',sans-serif] focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all shadow-sm"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 sm:flex-none px-3 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 font-['Open_Sans',sans-serif] focus:outline-none focus:border-amber-600 shadow-sm"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-3 py-2.5 text-xs text-amber-700 hover:text-amber-800 font-medium font-['Open_Sans',sans-serif]"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Specialization Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4 max-w-4xl mx-auto">
              {specializations.slice(0, 6).map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialization(spec)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all font-['Open_Sans',sans-serif] ${
                    selectedSpecialization === spec
                      ? 'bg-amber-700 text-white shadow-sm'
                      : 'bg-white/80 text-stone-600 hover:bg-amber-50 border border-stone-200'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Instructors Grid - Compact, perfectly sized cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {filteredInstructors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstructors.map((instructor) => (
              <div
                key={instructor.id}
                className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200/90 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Compact High-Res Image Banner */}
                  <div className="relative h-40 sm:h-44 bg-stone-900 overflow-hidden">
                    <img
                      src={getInstructorImage(instructor)}
                      alt={instructor.name}
                      className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    
                    {/* Visual Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent pointer-events-none"></div>

                    {/* Top-Left Specialization Tag */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-stone-950/75 backdrop-blur-md text-amber-300 border border-amber-400/30 text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm font-['Open_Sans',sans-serif]">
                        {instructor.specialization?.[0] || 'Legal Faculty'}
                      </span>
                    </div>

                    {/* Top-Right Availability Status */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium shadow-sm backdrop-blur-md bg-stone-950/75 border font-['Open_Sans',sans-serif] ${
                        getAvailabilityStatus(instructor)
                          ? 'text-emerald-300 border-emerald-400/30'
                          : 'text-amber-300 border-amber-400/30'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1 ${
                          getAvailabilityStatus(instructor) ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                        }`}></span>
                        {getAvailabilityStatus(instructor) ? 'Available' : 'Limited'}
                      </span>
                    </div>

                    {/* Bottom-Right Rating */}
                    <div className="absolute bottom-2.5 right-3 z-10 flex items-center bg-stone-950/80 backdrop-blur-md border border-white/15 px-2 py-0.5 rounded-md text-white text-xs font-bold font-['Open_Sans',sans-serif]">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400 mr-1" />
                      <span>{instructor.rating}</span>
                      <span className="text-[10px] text-stone-300 font-normal ml-1">({instructor.totalReviews})</span>
                    </div>

                    {/* Bottom-Left Education Alma Mater */}
                    <div className="absolute bottom-2.5 left-3 z-10 text-[11px] text-amber-200/90 font-medium font-['Open_Sans',sans-serif] flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                      <span className="truncate max-w-[160px]">
                        {instructor.education?.[0]?.institution || "Top Law School"}
                      </span>
                    </div>
                  </div>

                  {/* Compact Card Body */}
                  <div className="p-4 sm:p-5">
                    {/* Name & Title */}
                    <div className="mb-2">
                      <h3 className="text-lg font-bold text-stone-800 group-hover:text-amber-700 transition-colors font-['Georgia',serif] truncate">
                        {instructor.name}
                      </h3>
                      <p className="text-xs text-amber-800 font-semibold font-['Open_Sans',sans-serif] truncate">
                        {instructor.title}
                      </p>
                    </div>

                    {/* Quick Metric Chips */}
                    <div className="flex items-center gap-2 text-xs text-stone-500 font-['Open_Sans',sans-serif] mb-2.5">
                      <span className="flex items-center text-stone-700">
                        <Clock className="w-3 h-3 text-amber-600 mr-1" />
                        {instructor.credentials?.yearsTeaching || 8} yrs exp
                      </span>
                      <span className="text-stone-300">•</span>
                      <span className="text-amber-700 font-medium">
                        {instructor.credentials?.percentile || '99.9th'} percentile
                      </span>
                    </div>

                    {/* Bio preview: strictly 2 lines */}
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-['Open_Sans',sans-serif] mb-3">
                      {instructor.bio}
                    </p>

                    {/* Compact Expertise Pills */}
                    <div className="flex flex-wrap gap-1">
                      {instructor.specialization?.slice(0, 3).map((spec, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200/60 rounded-md font-['Open_Sans',sans-serif]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Compact Card Action Footer */}
                <div className="p-4 sm:p-5 pt-0">
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => navigate('/book-consultation')}
                      className="w-full inline-flex items-center justify-center py-2 px-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl text-xs font-semibold hover:from-amber-700 hover:to-amber-800 transition-all shadow-sm hover:shadow font-['Open_Sans',sans-serif]"
                    >
                      <Calendar className="w-3.5 h-3.5 mr-1.5" />
                      Book Consultation
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-stone-200 max-w-xl mx-auto p-6">
            <BookOpen className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-stone-900 mb-1">
              No Instructors Match Your Search
            </h3>
            <p className="text-stone-600 mb-4 font-['Open_Sans',sans-serif] text-xs sm:text-sm">
              Try adjusting your search criteria or clearing filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSpecialization('All');
              }}
              className="inline-flex items-center px-5 py-2 bg-amber-600 text-white text-xs font-semibold rounded-xl hover:bg-amber-700 transition-colors shadow font-['Open_Sans',sans-serif]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorsPage;
