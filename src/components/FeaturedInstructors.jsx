import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import law2 from '../assets/law2.png';
import law3 from '../assets/law3.png';
import law4 from '../assets/law4.png';
import law5 from '../assets/law5.png';

const Instructors = () => {
  const [currentInstructorIndex, setCurrentInstructorIndex] = useState(0);
  
  // Static instructor data
  const instructors = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      title: "Senior LSAT Instructor",
      experience: "12+ Years Experience",
      education: "Harvard Law School, J.D. • Yale University, B.A.",
      specializations: ["LSAT Logical Reasoning", "Reading Comprehension", "Analytical Writing"],
      rating: 4.9,
      totalReviews: 342,
      profileImage: law2, // Imported local image
      bio: "Dr. Mitchell brings over a decade of expertise in LSAT preparation, having helped thousands of students achieve their target scores and gain admission to top-tier law schools.",
      highlight: "Achieved 98% success rate for students scoring 165+"
    },
    {
      id: 2,
      name: "Prof. James Patterson",
      title: "LNAT Expert & Oxford Graduate",
      experience: "15+ Years Experience",
      education: "Oxford University, B.A. Law • Cambridge University, M.A.",
      specializations: ["LNAT Preparation", "Critical Thinking", "Legal Reasoning"],
      rating: 4.8,
      totalReviews: 298,
      profileImage: law3, // Replace with actual image
      bio: "Professor Patterson specializes in LNAT preparation with extensive experience in UK legal education, helping students secure places at prestigious institutions like Oxford and Cambridge.",
      highlight: "Guided 500+ students to UK's top law schools"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      title: "Constitutional Law Expert",
      experience: "10+ Years Experience", 
      education: "Stanford Law School, J.D. • UC Berkeley, B.A. Political Science",
      specializations: ["LSAT Games", "Constitutional Law", "Legal Analysis"],
      rating: 4.9,
      totalReviews: 276,
      profileImage: law4, // Replace with actual image
      bio: "Dr. Rodriguez combines her Supreme Court experience with proven teaching methods to help students master complex legal reasoning and analytical skills.",
      highlight: "Specialized in Logic Games with 95% student improvement"
    },
    {
      id: 4,
      name: "Prof. Michael Thompson",
      title: "Legal Writing Specialist",
      experience: "8+ Years Experience",
      education: "Columbia Law School, J.D. • Princeton University, B.A.",
      specializations: ["Legal Writing", "LSAT Writing", "Analytical Skills"],
      rating: 4.7,
      totalReviews: 189,
      profileImage: law5, // Replace with actual image
      bio: "Professor Thompson excels in developing students' legal writing and analytical skills, essential for both LSAT success and law school preparation.",
      highlight: "Enhanced writing skills for 800+ aspiring lawyers"
    }
  ];

  // Auto-cycle through instructors every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInstructorIndex((prevIndex) => 
        (prevIndex + 1) % instructors.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [instructors.length]);

  const currentInstructor = instructors[currentInstructorIndex];

  const getRatingDisplay = (rating) => {
    const fullStars = Math.floor(rating);
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index < fullStars ? 'bg-amber-400' : 'bg-stone-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-to-br from-stone-50 via-amber-50/30 to-stone-100 font-['Georgia','Times_New_Roman',serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-xl text-amber-700 text-sm font-medium mb-6 border border-amber-200">
            <div className="w-2 h-2 bg-amber-600 rounded-full mr-2"></div>
            <span className="font-['Open_Sans',sans-serif]">Expert Faculty</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-800 mb-4 leading-tight">
            Meet Our Distinguished
            <br />
            <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              Legal Instructors
            </span>
          </h2>
          
          <p className="text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed font-['Open_Sans',sans-serif]">
            Learn from accomplished legal professionals with proven track records
          </p>
        </div>

        {/* Dynamic Instructor Showcase - Reduced Width */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Instructor Photo - Reduced Width */}
            <div className="order-2 lg:order-1">
              <div className="relative max-w-xs mx-auto">
                {/* Main Photo Container - Smaller Size */}
                <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-xl border border-stone-200 transition-all duration-1000 ease-in-out transform">
                  {currentInstructor.profileImage ? (
                    <img
                      key={currentInstructor.id}
                      src={currentInstructor.profileImage}
                      alt={currentInstructor.name}
                      className="w-full h-full object-cover transition-opacity duration-1000"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center transition-all duration-1000">
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                        <div className="w-8 h-8 bg-white rounded-lg"></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Floating Rating Badge - Smaller */}
                <div className="absolute -top-3 -right-3 z-10">
                  <div className="bg-white rounded-xl px-3 py-2 shadow-lg border border-stone-200 transition-all duration-1000">
                    <div className="text-center">
                      {getRatingDisplay(currentInstructor.rating)}
                      <div className="text-sm font-bold text-stone-800 mt-1">
                        {currentInstructor.rating}
                      </div>
                      <div className="text-xs text-stone-500 font-['Open_Sans',sans-serif]">
                        {currentInstructor.totalReviews} reviews
                      </div>
                    </div>
                  </div>
                </div>

                {/* Experience Badge - Smaller */}
                <div className="absolute -bottom-3 left-3 z-10">
                  <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-3 py-1.5 rounded-lg shadow-lg">
                    <span className="text-xs font-semibold font-['Open_Sans',sans-serif]">
                      {currentInstructor.experience}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructor Details - Reduced Width */}
            <div className="order-1 lg:order-2">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-stone-200 transition-all duration-1000 ease-in-out transform">
                
                {/* Name and Title */}
                <div className="mb-5 transition-all duration-1000">
                  <h3 className="text-2xl font-bold text-stone-800 mb-2 transition-all duration-1000">
                    {currentInstructor.name}
                  </h3>
                  <p className="text-amber-700 font-semibold text-lg font-['Open_Sans',sans-serif] transition-all duration-1000">
                    {currentInstructor.title}
                  </p>
                </div>

                {/* Highlight */}
                <div className="mb-5">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 transition-all duration-1000">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-amber-600 rounded-full mr-2 flex-shrink-0"></div>
                      <p className="text-amber-800 font-medium font-['Open_Sans',sans-serif] text-sm">
                        {currentInstructor.highlight}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="mb-5 transition-all duration-1000">
                  <h4 className="font-bold text-stone-800 mb-2 text-sm uppercase tracking-wide">
                    Education
                  </h4>
                  <p className="text-stone-700 font-['Open_Sans',sans-serif] leading-relaxed text-sm">
                    {currentInstructor.education}
                  </p>
                </div>

                {/* Specializations */}
                <div className="mb-5 transition-all duration-1000">
                  <h4 className="font-bold text-stone-800 mb-2 text-sm uppercase tracking-wide">
                    Expertise Areas
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentInstructor.specializations.map((spec, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-medium border border-amber-200 font-['Open_Sans',sans-serif] transition-all duration-1000"
                      >
                        <div className="w-1 h-1 bg-amber-600 rounded-full mr-1.5"></div>
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div className="transition-all duration-1000">
                  <p className="text-stone-600 leading-relaxed font-['Open_Sans',sans-serif] text-sm">
                    {currentInstructor.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructor Navigation Dots */}
          <div className="flex justify-center mt-10 space-x-2">
            {instructors.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentInstructorIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentInstructorIndex 
                    ? 'bg-amber-600 w-6' 
                    : 'bg-stone-300 hover:bg-stone-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        
         
        
      </div>
    </section>
  );
};

export default Instructors;
