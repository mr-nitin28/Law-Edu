import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import instructorsDataJson from '../data/instructorsData.json';
import { 
  Star, 
  BookOpen,
  Clock,
  GraduationCap,
  Users
} from 'lucide-react';

const InstructorsPage = () => {
  const { backendUrl } = useContext(AppContext);
  const [instructors, setInstructors] = useState([]);
  const [filteredInstructors, setFilteredInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states (keeping backend logic intact)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedMeetingType, setSelectedMeetingType] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  // Available filter options (keeping backend logic intact)
  const [specializations, setSpecializations] = useState([]);
  const meetingTypes = ['online', 'in-person', 'both'];
  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'hourlyRate', label: 'Price: Low to High' },
    { value: 'hourlyRate_desc', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' }
  ];

  useEffect(() => {
    loadInstructors();
  }, []);

  useEffect(() => {
    filterInstructors();
  }, [instructors, searchTerm, selectedSpecialization, selectedMeetingType, minRating, sortBy]);

  const loadInstructors = () => {
    try {
      setLoading(true);
      // Load from local JSON file
      const allInstructors = instructorsDataJson.instructors || [];
      setInstructors(allInstructors);
      
      // Extract unique specializations
      const uniqueSpecializations = [...new Set(
        allInstructors.flatMap(instructor => instructor.specialization || [])
      )];
      setSpecializations(uniqueSpecializations);
    } catch (error) {
      console.error('Error loading instructors:', error);
      toast.error('Failed to load instructors');
    } finally {
      setLoading(false);
    }
  };

  const filterInstructors = () => {
    let filtered = [...instructors];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(instructor =>
        instructor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.specialization?.some(spec => 
          spec.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        instructor.bio?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Specialization filter
    if (selectedSpecialization) {
      filtered = filtered.filter(instructor =>
        instructor.specialization?.includes(selectedSpecialization)
      );
    }

    // Meeting type filter (no longer applicable with JSON data)
    // Skip this filter as JSON doesn't have meetingPreference

    // Rating filter
    if (minRating > 0) {
      filtered = filtered.filter(instructor =>
        instructor.rating >= minRating
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        default:
          return 0;
      }
    });

    setFilteredInstructors(filtered);
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-amber-400 fill-current'
            : 'text-stone-300'
        }`}
      />
    ));
  };

  const getAvailabilityStatus = (instructor) => {
    // Check if instructor has availability array with days
    return instructor.availability && instructor.availability.length > 0;
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSpecialization('');
    setSelectedMeetingType('');
    setMinRating(0);
    setSortBy('rating');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 flex items-center justify-center pt-20 font-['Georgia','Times_New_Roman',serif]">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-stone-200">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-stone-900 font-['Open_Sans',sans-serif]">Loading instructors...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 pt-20 font-['Georgia','Times_New_Roman',serif]">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-xl text-amber-700 text-sm font-medium mb-6 border border-amber-200">
              <GraduationCap className="w-4 h-4 mr-2" />
              <span className="font-['Open_Sans',sans-serif]">Expert Instructors</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-6 leading-tight">
              Meet Our Distinguished
              <br />
              <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                Legal Educators
              </span>
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-['Open_Sans',sans-serif]">
              Learn from accomplished legal professionals with proven track records in LSAT & LNAT preparation
            </p>
          </div>
        </div>
      </div>

      {/* Instructors Grid - 3 Per Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredInstructors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInstructors.map((instructor) => (
              <div
                key={instructor.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-stone-200 group hover:transform hover:scale-105"
              >
                {/* Instructor Image/Avatar - Professional Size */}
                <div className="relative h-48 bg-gradient-to-br from-amber-500 to-amber-600">
                  {instructor.photo ? (
                    <img
                      src={`/src/assets/instructors/${instructor.photo}`}
                      alt={instructor.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="w-full h-full flex items-center justify-center" style={{display: instructor.photo ? 'none' : 'flex'}}>
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                      <GraduationCap className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  
                  {/* Professional Availability Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium shadow-lg backdrop-blur-sm ${
                        getAvailabilityStatus(instructor)
                          ? 'bg-emerald-100/90 text-emerald-700 border border-emerald-200'
                          : 'bg-red-100/90 text-red-700 border border-red-200'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        getAvailabilityStatus(instructor) ? 'bg-emerald-500' : 'bg-red-500'
                      }`}></div>
                      {getAvailabilityStatus(instructor) ? 'Available' : 'Busy'}
                    </span>
                  </div>
                </div>

                {/* Instructor Details - Professional Spacing */}
                <div className="p-6">
                  {/* Name and Experience */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-amber-700 transition-colors">
                      {instructor.name}
                    </h3>
                    <p className="text-sm text-amber-700 font-semibold mb-1 font-['Open_Sans',sans-serif]">
                      {instructor.title}
                    </p>
                    <p className="text-sm text-stone-600 font-['Open_Sans',sans-serif] flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-amber-600" />
                      {instructor.credentials?.yearsTeaching || 0} years experience
                    </p>
                  </div>

                  {/* Rating - Professional Display */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="flex items-center mr-2">
                        {getRatingStars(instructor.rating)}
                      </div>
                      <span className="text-sm font-medium text-stone-900 font-['Open_Sans',sans-serif]">
                        {instructor.rating}
                      </span>
                    </div>
                    <span className="text-sm text-stone-500 font-['Open_Sans',sans-serif]">
                      {instructor.totalReviews} reviews
                    </span>
                  </div>

                  {/* Bio Preview - Professional Box */}
                  <div className="mb-5 p-4 bg-stone-50 rounded-xl border-l-4 border-amber-500">
                    <p className="text-sm text-stone-700 line-clamp-3 leading-relaxed font-['Open_Sans',sans-serif]">
                      {instructor.bio || "Experienced legal educator dedicated to helping students succeed in LSAT & LNAT preparation with personalized guidance and proven teaching methods."}
                    </p>
                  </div>

                  {/* Specializations - Professional Tags */}
                  <div className="mb-5">
                    <h4 className="text-xs font-semibold text-stone-700 mb-3 uppercase tracking-wide">
                      Expertise Areas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {instructor.specialization?.slice(0, 3).map((spec, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200 font-['Open_Sans',sans-serif]"
                        >
                          {spec}
                        </span>
                      ))}
                      {instructor.specialization?.length > 3 && (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-200 text-stone-700 border border-stone-300 font-['Open_Sans',sans-serif]">
                          +{instructor.specialization.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200 max-w-2xl mx-auto">
            <BookOpen className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-stone-900 mb-3">
              No Instructors Available
            </h3>
            <p className="text-stone-600 mb-6 font-['Open_Sans',sans-serif] text-lg">
              Our expert instructors will be available soon. Please check back later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-8 py-4 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors shadow-lg font-['Open_Sans',sans-serif]"
            >
              Refresh Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorsPage;
