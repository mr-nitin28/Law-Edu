import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
// Law Instructor Profile Images
import law1 from './law1.png'
import law2 from './law2.png'
import law3 from './law3.png'
import law4 from './law4.png'
import law5 from './law5.png'
import law6 from './law6.png'
import law7 from './law7.png'
import law8 from './law8.png'
import law9 from './law9.png'
import law10 from './law10.png'

// Course Images
import lsat_course from './courses/lsat_course.jpg'
import lsat_intensive from './courses/lsat_intensive.jpg'
import lnat_course from './courses/lnat_course.jpg'
import lnat_essay from './courses/lnat_essay.jpg'
import law_school_package from './courses/law_school_package.jpg'
import legal_writing from './courses/legal_writing.jpg'

// Law Practice Specialty Icons
import Corporate_law from './Corporate_law.svg'
import Criminal_law from './Criminal_law.svg'
import Family_law from './Family_law.svg'
import Intellectual_property from './Intellectual_property.svg'

export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    law1,
    law2,
    law3,
    law4,
    law5,
    law6,
    law7,
    law8,
    law9,
    law10,
    lsat_course,
    lsat_intensive,
    lnat_course,
    lnat_essay,
    law_school_package,
    legal_writing
}

// Course Images Dictionary
export const courseImages = {
  'lsat-prep-comprehensive': lsat_course,
  'lsat-prep-intensive': lsat_intensive,
  'lnat-prep-comprehensive': lnat_course,
  'lnat-essay-mastery': lnat_essay,
  'law-school-prep': law_school_package,
  'legal-writing-foundation': legal_writing,
  'lsat_course.jpg': lsat_course,
  'lsat_intensive.jpg': lsat_intensive,
  'lnat_course.jpg': lnat_course,
  'lnat_essay.jpg': lnat_essay,
  'law_school_package.jpg': law_school_package,
  'legal_writing.jpg': legal_writing
}

// Fallback high-res legal imagery URLs
const fallbackCourseUrls = {
  'LSAT': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
  'LNAT': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
  'DEFAULT': 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=80'
}

export const getCourseImage = (courseOrId) => {
  if (!courseOrId) return lsat_course;
  if (typeof courseOrId === 'string') {
    return courseImages[courseOrId] || lsat_course;
  }
  if (courseOrId.id && courseImages[courseOrId.id]) return courseImages[courseOrId.id];
  if (courseOrId.image && courseImages[courseOrId.image]) return courseImages[courseOrId.image];
  if (courseOrId.category === 'LNAT') return lnat_course;
  if (courseOrId.category === 'LSAT') return lsat_course;
  return lsat_course;
}

// Instructor Images Dictionary
export const instructorImages = {
  'inst-001': law2,
  'inst-002': law1,
  'inst-003': law3,
  'inst-004': law4,
  'inst-005': law5,
  'inst-006': law6,
  'inst-007': law9,
  'inst-008': law7,
  'inst-009': law5,
  'inst-010': law10,
  '1': law2,
  '2': law3,
  '3': law4,
  '4': law5,
  'law1': law1,
  'law2': law2,
  'law3': law3,
  'law4': law4,
  'law5': law5,
  'law6': law6,
  'law7': law7,
  'law8': law8,
  'law9': law9,
  'law10': law10,
  'instructor_emily.jpg': law2,
  'instructor_michael.jpg': law1,
  'instructor_sarah.jpg': law3,
  'instructor_james.jpg': law4,
  'instructor_olivia.jpg': law5,
  'instructor_david.jpg': law6,
  'instructor_jennifer.jpg': law9,
  'instructor_robert.jpg': law7,
  'instructor_amelia.jpg': law5,
  'instructor_marcus.jpg': law10
}

export const getInstructorImage = (instructor) => {
  if (!instructor) return law1;
  if (typeof instructor === 'string') {
    return instructorImages[instructor] || law1;
  }
  if (instructor.image) return instructor.image;
  if (instructor.profileImage) return instructor.profileImage;
  if (instructor.id && instructorImages[instructor.id]) return instructorImages[instructor.id];
  if (instructor._id && instructorImages[instructor._id]) return instructorImages[instructor._id];
  if (instructor.photo && instructorImages[instructor.photo]) return instructorImages[instructor.photo];
  return law1;
}

// Law Practice Specialties Data
export const specialityData = [
    {
        speciality: 'Corporate Law',
        image: Corporate_law
    },
    {
        speciality: 'Criminal Law',
        image: Criminal_law
    },
    {
        speciality: 'Family Law',
        image: Family_law
    },
    {
        speciality: 'Intellectual Property',
        image: Intellectual_property
    },
   
]

// Legal Educators/Instructors Data
export const instructors = [
    {
        _id: 'law1',
        name: 'Prof. Richard James',
        image: law1,
        speciality: 'Corporate Law',
        degree: 'JD, LLM',
        experience: '15 Years',
        about: 'Prof. James has extensive experience in corporate legal practice and education, specializing in mergers & acquisitions, corporate governance, and securities law. He brings practical insights from his years in BigLaw firms to provide comprehensive legal education focused on real-world applications and case studies.',
        fees: 150,
        address: {
            line1: '17th Floor, Legal Complex',
            line2: 'Business District, New York'
        }
    },
    {
        _id: 'law2',
        name: 'Prof. Emily Larson',
        image: law2,
        speciality: 'Criminal Law',
        degree: 'JD, LLM',
        experience: '12 Years',
        about: 'Prof. Larson is a distinguished criminal law expert with experience as both a prosecutor and defense attorney. She specializes in criminal procedure, constitutional law, and trial advocacy, offering students comprehensive understanding of the criminal justice system and courtroom practice.',
        fees: 180,
        address: {
            line1: '27th Floor, Justice Center',
            line2: 'Downtown Legal District, Chicago'
        }
    },
    {
        _id: 'law3',
        name: 'Prof. Sarah Patel',
        image: law3,
        speciality: 'Family Law',
        degree: 'JD, MSW',
        experience: '8 Years',
        about: 'Prof. Patel combines legal expertise with social work background to provide holistic family law education. She specializes in divorce proceedings, child custody, adoption law, and domestic relations, emphasizing both legal strategy and client counseling skills.',
        fees: 120,
        address: {
            line1: '37th Street, Family Court Building',
            line2: 'Legal Plaza, Los Angeles'
        }
    },
    {
        _id: 'law4',
        name: 'Prof. Christopher Lee',
        image: law4,
        speciality: 'Intellectual Property',
        degree: 'JD, MS Engineering',
        experience: '10 Years',
        about: 'Prof. Lee brings unique technical and legal expertise to intellectual property law education. With engineering background and extensive patent law practice, he teaches comprehensive IP protection strategies, patent prosecution, trademark law, and copyright issues.',
        fees: 200,
        address: {
            line1: '47th Floor, Innovation Tower',
            line2: 'Tech Legal Center, San Francisco'
        }
    },
    {
        _id: 'law5',
        name: 'Prof. Jennifer Garcia',
        image: law5,
        speciality: 'Employment Law',
        degree: 'JD, MBA',
        experience: '14 Years',
        about: 'Prof. Garcia specializes in employment and labor law with extensive experience in workplace discrimination, wage and hour disputes, and employment contracts. She provides practical training on HR compliance, workplace investigations, and employment litigation strategies.',
        fees: 160,
        address: {
            line1: '57th Avenue, Corporate Legal Center',
            line2: 'Business Law District, Boston'
        }
    },
    {
        _id: 'law6',
        name: 'Prof. Andrew Williams',
        image: law6,
        speciality: 'Employment Law',
        degree: 'JD, MA Labor Relations',
        experience: '11 Years',
        about: 'Prof. Williams focuses on collective bargaining, union relations, and workplace safety regulations. His background in labor relations provides students with comprehensive understanding of both individual employment rights and collective labor law principles.',
        fees: 165,
        address: {
            line1: '57th Avenue, Labor Law Institute',
            line2: 'Union Square, Seattle'
        }
    },
    {
        _id: 'law7',
        name: 'Prof. Christopher Davis',
        image: law7,
        speciality: 'Corporate Law',
        degree: 'JD, MBA',
        experience: '16 Years',
        about: 'Prof. Davis combines legal expertise with business acumen to teach corporate law from both legal and business perspectives. He specializes in corporate finance, business transactions, and regulatory compliance, preparing students for modern corporate legal practice.',
        fees: 175,
        address: {
            line1: '17th Floor, Corporate Legal Academy',
            line2: 'Financial District, New York'
        }
    },
    {
        _id: 'law8',
        name: 'Prof. Timothy White',
        image: law8,
        speciality: 'Criminal Law',
        degree: 'JD, LLM Criminal Justice',
        experience: '13 Years',
        about: 'Prof. White is a former federal prosecutor with expertise in white-collar crime, federal criminal procedure, and appellate advocacy. He provides students with comprehensive training in criminal law theory and practice, including trial preparation and courtroom advocacy.',
        fees: 190,
        address: {
            line1: '27th Floor, Criminal Justice Center',
            line2: 'Federal Court District, Washington DC'
        }
    },
    {
        _id: 'law9',
        name: 'Prof. Ava Mitchell',
        image: law9,
        speciality: 'Family Law',
        degree: 'JD, LLM Family Law',
        experience: '7 Years',
        about: 'Prof. Mitchell specializes in complex family law matters including high-asset divorce, international child custody, and alternative dispute resolution. She emphasizes both traditional litigation skills and modern mediation techniques in family law practice.',
        fees: 130,
        address: {
            line1: '37th Street, Family Mediation Center',
            line2: 'Alternative Dispute Resolution Plaza, Denver'
        }
    },
    {
        _id: 'law10',
        name: 'Prof. Jeffrey King',
        image: law10,
        speciality: 'Intellectual Property',
        degree: 'JD, PhD Computer Science',
        experience: '9 Years',
        about: 'Prof. King combines advanced technical knowledge with IP law expertise, specializing in software patents, technology licensing, and cyber law. He provides cutting-edge education on emerging technologies and their intellectual property implications.',
        fees: 210,
        address: {
            line1: '47th Floor, Tech Innovation Legal Hub',
            line2: 'Silicon Valley Legal Center, San Jose'
        }
    },
    ]
