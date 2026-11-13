import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Clock, 
  GraduationCap, 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  ArrowRight
} from 'lucide-react';
import law2 from '../assets/law2.png';
import law1 from '../assets/law1.png';
import law3 from '../assets/law3.png';
import law4 from '../assets/law4.png';

const FeaturedInstructors = () => {
  const navigate = useNavigate();
  const [currentInstructorIndex, setCurrentInstructorIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Distinguished faculty data with high-res portraits
  const instructors = [
    {
      id: "inst-001",
      name: "Dr. Emily Richardson",
      title: "Lead LSAT Instructor",
      experience: "12+ Years",
      education: "Harvard Law School, J.D. • Magna Cum Laude",
      specializations: ["Logical Reasoning", "Reading Comp", "Analytical Writing"],
      rating: 4.9,
      totalReviews: 342,
      profileImage: law2,
      bio: "Harvard Law alumna with 12+ years experience mentoring 2,000+ candidates into Yale, Harvard, and Stanford with an average +15 point score improvement.",
      highlight: "99.9th Percentile (178 LSAT) • 98% 165+ Success Rate"
    },
    {
      id: "inst-002",
      name: "Prof. Michael Chen",
      title: "Senior Logic Games Specialist",
      experience: "10+ Years",
      education: "Yale Law School, J.D. • Princeton University",
      specializations: ["Logic Games", "Diagramming", "Speed Strategies"],
      rating: 5.0,
      totalReviews: 298,
      profileImage: law1,
      bio: "Creator of the renowned Chen Logic Games Method, helping students achieve flawless accuracy and save vital test minutes under pressure.",
      highlight: "Perfect 180 LSAT Score • Trained 3,000+ Students"
    },
    {
      id: "inst-003",
      name: "Sarah Martinez, J.D.",
      title: "LNAT & UK Admissions Director",
      experience: "8+ Years",
      education: "Oxford University, B.A. Jurisprudence • Cambridge M.A.",
      specializations: ["LNAT Section A & B", "Critical Thinking", "UK Law"],
      rating: 4.8,
      totalReviews: 264,
      profileImage: law3,
      bio: "Specializing in UK legal admissions, guiding hundreds of applicants to Oxford, Cambridge, UCL, and LSE with structured essay argumentation drills.",
      highlight: "Guided 500+ students to Oxford & Cambridge Law"
    },
    {
      id: "inst-004",
      name: "Dr. James Anderson",
      title: "Constitutional Law & Admissions Mentor",
      experience: "14+ Years",
      education: "Stanford Law School, J.D. • Columbia Fellow",
      specializations: ["Constitutional Law", "Logic Games", "Admissions SOP"],
      rating: 4.9,
      totalReviews: 312,
      profileImage: law4,
      bio: "Former appellate clerk combining rigorous legal doctrine with tailored mentoring to optimize test psychology and admissions positioning.",
      highlight: "95% Logic Games Improvement Rate"
    }
  ];

  // Auto-cycle through instructors every 5 seconds, pauses when hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentInstructorIndex((prevIndex) => 
        (prevIndex + 1) % instructors.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, instructors.length]);

  const currentInstructor = instructors[currentInstructorIndex];

  const handlePrev = () => {
    setCurrentInstructorIndex((prev) => (prev - 1 + instructors.length) % instructors.length);
  };

  const handleNext = () => {
    setCurrentInstructorIndex((prev) => (prev + 1) % instructors.length);
  };

  return (
    <section className="w-full py-12 sm:py-16 bg-gradient-to-br from-stone-50 via-amber-50/20 to-stone-100 font-['Georgia','Times_New_Roman',serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Compact and punchy */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center px-3.5 py-1.5 bg-amber-100/90 rounded-full text-amber-800 text-xs font-semibold mb-3 border border-amber-200">
            <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-amber-700" />
            <span className="font-['Open_Sans',sans-serif]">Expert Faculty</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-800 mb-2 leading-tight">
            Meet Our Distinguished{' '}
            <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              Legal Instructors
            </span>
          </h2>
          
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-['Open_Sans',sans-serif]">
            Learn from accomplished legal educators with proven 99th-percentile credentials
          </p>
        </div>

        {/* Compact Instructor Showcase Card */}
        <div 
          className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-stone-200/90 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex flex-col sm:flex-row items-stretch">
            
            {/* Left Column: Compact High-Res Portrait Container */}
            <div className="w-full sm:w-64 md:w-72 bg-stone-900 relative overflow-hidden flex-shrink-0 min-h-[260px] sm:min-h-[320px]">
              <img
                key={currentInstructor.id}
                src={currentInstructor.profileImage}
                alt={currentInstructor.name}
                className="w-full h-full object-cover object-top transition-opacity duration-500 ease-out"
              />
              
              {/* Subtle visual gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent pointer-events-none"></div>

              {/* Floating Top Rating Badge */}
              <div className="absolute top-3.5 left-3.5 z-10">
                <div className="bg-stone-950/75 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-lg shadow flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-white font-['Open_Sans',sans-serif]">{currentInstructor.rating}</span>
                  <span className="text-[11px] text-stone-300 font-['Open_Sans',sans-serif]">({currentInstructor.totalReviews})</span>
                </div>
              </div>

              {/* Floating Experience Badge */}
              <div className="absolute bottom-3.5 left-3.5 z-10">
                <span className="bg-amber-600/95 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow flex items-center gap-1 font-['Open_Sans',sans-serif]">
                  <Clock className="w-3 h-3" />
                  {currentInstructor.experience} Exp
                </span>
              </div>
            </div>

            {/* Right Column: Sleek, compact details */}
            <div className="flex-1 p-5 sm:p-7 flex flex-col justify-between">
              <div>
                {/* Header: Name, Title, and Education */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2 border-b border-stone-100 pb-3">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-stone-800">
                      {currentInstructor.name}
                    </h3>
                    <p className="text-amber-800 font-semibold text-sm font-['Open_Sans',sans-serif]">
                      {currentInstructor.title}
                    </p>
                  </div>
                  <p className="text-xs text-stone-500 font-['Open_Sans',sans-serif]">
                    {currentInstructor.education}
                  </p>
                </div>

                {/* Highlight banner */}
                <div className="bg-amber-50/80 border border-amber-200/70 rounded-xl px-3.5 py-2 mb-3.5 flex items-center">
                  <Award className="w-4 h-4 text-amber-700 mr-2 flex-shrink-0" />
                  <p className="text-amber-900 font-medium font-['Open_Sans',sans-serif] text-xs sm:text-sm">
                    {currentInstructor.highlight}
                  </p>
                </div>

                {/* Bio: Concise 2 lines */}
                <p className="text-stone-600 leading-relaxed text-xs sm:text-sm line-clamp-2 font-['Open_Sans',sans-serif] mb-3.5">
                  {currentInstructor.bio}
                </p>

                {/* Specializations: Compact tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {currentInstructor.specializations.map((spec, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 bg-stone-100 text-stone-700 rounded-md text-xs font-medium border border-stone-200/80 font-['Open_Sans',sans-serif]"
                    >
                      <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mr-1.5"></span>
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action & Interactive Quick Faculty Switcher */}
              <div className="pt-3 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => navigate('/book-consultation')}
                  className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg hover:from-amber-700 hover:to-amber-800 transition-all font-['Open_Sans',sans-serif]"
                >
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  Book 1-on-1 Consultation
                </button>

                {/* Faculty Thumbnail Switchers & Prev/Next */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center -space-x-1 mr-1">
                    {instructors.map((inst, index) => (
                      <button
                        key={inst.id}
                        onClick={() => setCurrentInstructorIndex(index)}
                        title={inst.name}
                        className={`relative w-8 h-8 rounded-full overflow-hidden border-2 transition-all transform ${
                          index === currentInstructorIndex
                            ? 'border-amber-600 scale-110 z-10 shadow-md ring-2 ring-amber-300'
                            : 'border-white opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={inst.profileImage} alt={inst.name} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handlePrev}
                    aria-label="Previous Instructor"
                    className="p-1.5 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-800 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next Instructor"
                    className="p-1.5 rounded-lg bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-800 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View All Faculty Link */}
        <div className="text-center mt-6">
          <Link
            to="/instructors"
            className="inline-flex items-center text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors font-['Open_Sans',sans-serif]"
          >
            Explore All Legal Educators
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedInstructors;
