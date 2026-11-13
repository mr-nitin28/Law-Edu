import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, useLocation } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Contact from './pages/Contact'
import Consultation from './pages/Consultation'  // Fixed: renamed from Appointment
import MyConsultations from './pages/MyConsultations'  // Fixed: renamed from MyAppointments
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';
import Instructors from './pages/instructors';
import TopCourses from './components/TopCourses'
import Courses from './pages/courses'
import CourseDetail from './pages/CourseDetail'
import StudentTestimonials from './components/StudentTestimonials'
import InstructorsPage from './pages/InstructorsPage'
import BookConsultation from './pages/BookConsultation'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFailed from './pages/PaymentFailed'
import TestEnrollment from './pages/TestEnrollment'
import WhyUs from './components/WhyUs'

const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="w-full min-h-screen flex flex-col bg-stone-50 overflow-x-hidden">
      <ToastContainer />
      <ScrollToTop />
      {!isAuthPage && <Navbar />}
      <main className="flex-1 w-full">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/instructors' element={<InstructorsPage />} />
          <Route path='/instructors/:speciality' element={<InstructorsPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/consultation/:instructorId' element={<Consultation />} />  {/* Fixed: consultation + instructorId */}
          <Route path='/book-consultation' element={<ProtectedRoute><BookConsultation /></ProtectedRoute>} />
          <Route path='/my-consultations' element={<ProtectedRoute><MyConsultations /></ProtectedRoute>} />  {/* Fixed: consultations */}
          <Route path='/payment-success' element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
          <Route path='/payment-failed' element={<PaymentFailed />} />
          <Route path='/my-profile' element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/course/:courseId' element={<CourseDetail />} />
          <Route path='/testimonials' element={<StudentTestimonials />} />
          <Route path='/test-enrollment' element={<ProtectedRoute><TestEnrollment /></ProtectedRoute>} />
          <Route path='/why-us' element={<WhyUs />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  )
}

export default App
