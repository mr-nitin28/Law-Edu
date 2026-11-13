import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { getInstructorImage } from '../assets/assets'
import { Star, Clock } from 'lucide-react'

const RelatedInstructors = ({ speciality, instructorId }) => {
    const navigate = useNavigate()
    const { instructors } = useContext(AppContext)
    const [relInstructor, setRelInstructor] = useState([])

    useEffect(() => {
        if (instructors.length > 0) {
            const instructorsData = instructors.filter((instructor) => {
                const matchId = (instructor._id || instructor.id) !== instructorId;
                const matchSpec = speciality 
                  ? (instructor.speciality === speciality || instructor.specialization?.includes(speciality))
                  : true;
                return matchId && matchSpec;
            }).slice(0, 4);
            setRelInstructor(instructorsData.length > 0 ? instructorsData : instructors.slice(0, 4));
        }
    }, [instructors, speciality, instructorId])

    if (relInstructor.length === 0) return null;

    return (
        <div className="flex flex-col items-center gap-4 my-14 text-stone-800 font-['Georgia','Times_New_Roman',serif]">
            <h2 className="text-2xl sm:text-3xl font-bold">Related Legal Instructors</h2>
            <p className="text-center text-xs sm:text-sm text-stone-600 max-w-md font-['Open_Sans',sans-serif]">
              Connect with experienced specialists and mentors across target law school subjects.
            </p>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
                {relInstructor.map((item, index) => (
                    <div 
                      onClick={() => { 
                        navigate(`/consultation/${item._id || item.id}`); 
                        window.scrollTo(0, 0); 
                      }} 
                      className="bg-white/95 rounded-2xl border border-stone-200 shadow-sm hover:shadow-lg overflow-hidden cursor-pointer hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group" 
                      key={index}
                    >
                        <div className="relative h-40 bg-stone-900 overflow-hidden">
                          <img 
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out" 
                            src={getInstructorImage(item)} 
                            alt={item.name} 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
                          
                          <div className="absolute top-2.5 right-2.5">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium backdrop-blur-md bg-stone-950/70 text-emerald-300 border border-emerald-400/30 font-['Open_Sans',sans-serif]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse"></span>
                              Available
                            </span>
                          </div>

                          <div className="absolute bottom-2 right-2.5 flex items-center bg-stone-950/75 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-white text-[11px] font-bold font-['Open_Sans',sans-serif]">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400 mr-1" />
                            <span>{item.rating || 4.9}</span>
                          </div>
                        </div>

                        <div className="p-4">
                          <h4 className="text-base font-bold text-stone-800 group-hover:text-amber-700 transition-colors font-['Georgia',serif] truncate">
                            {item.name}
                          </h4>
                          <p className="text-amber-800 text-xs font-semibold font-['Open_Sans',sans-serif] truncate mt-0.5">
                            {item.speciality || item.specialization?.[0] || 'Legal Education'}
                          </p>
                          <p className="text-stone-500 text-xs font-['Open_Sans',sans-serif] mt-1 flex items-center">
                            <Clock className="w-3 h-3 text-amber-600 mr-1" />
                            {item.experience || `${item.credentials?.yearsTeaching || 8} yrs experience`}
                          </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedInstructors
