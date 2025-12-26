import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageSquare,
  CheckCircle
} from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 pt-20 font-['Georgia','Times_New_Roman',serif]">
      
      {/* Header Section - Matching InstructorsPage Format */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-xl text-amber-700 text-sm font-medium mb-6 border border-amber-200">
              <MessageSquare className="w-4 h-4 mr-2" />
              <span className="font-['Open_Sans',sans-serif]">Get In Touch</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-6 leading-tight">
              Contact Our
              <br />
              <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                Expert Team
              </span>
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-['Open_Sans',sans-serif]">
              Have questions about LSAT & LNAT preparation? We're here to help you succeed in your law school journey with expert guidance and support
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Main Contact Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Contact Information Side */}
          <div className="space-y-8">
            
            {/* Contact Image */}
            <div className="relative">
              <img 
                className="w-full rounded-2xl shadow-xl object-cover border border-stone-200" 
                src={assets.contact_image} 
                alt="Contact LawEdu - Legal Education Platform"
              />
              {/* Floating Badge - Professional Style */}
              <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-stone-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-stone-900">24/7</div>
                    <div className="text-sm text-stone-500 font-['Open_Sans',sans-serif]">Support</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information - Clean Layout */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-stone-800 mb-6">Contact Information</h2>
              
              {/* Office Address */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 mb-1">Our Office</h3>
                  <p className="text-stone-600 text-sm leading-relaxed font-['Open_Sans',sans-serif]">
                    123 Legal Education Plaza<br />
                    Suite 450, New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 mb-1">Phone</h3>
                  <a href="tel:+14155550132" className="text-amber-700 hover:text-amber-800 transition-colors text-sm font-['Open_Sans',sans-serif]">
                    +1 (415) 555-0132
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-stone-200 rounded-2xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-stone-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 mb-1">Email</h3>
                  <a href="mailto:contact@lawedu.com" className="text-amber-700 hover:text-amber-800 transition-colors text-sm font-['Open_Sans',sans-serif]">
                    contact@lawedu.com
                  </a>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-200 rounded-2xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 mb-1">Office Hours</h3>
                  <p className="text-stone-600 text-sm font-['Open_Sans',sans-serif]">Mon-Fri: 9:00 AM - 6:00 PM EST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Side */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-stone-200">
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <MessageSquare className="w-8 h-8 text-amber-600" />
                <h2 className="text-2xl font-bold text-stone-800">Send us a Message</h2>
              </div>
              <p className="text-stone-600 font-['Open_Sans',sans-serif]">
                We'd love to hear from you. Send us a message and we'll respond within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2 font-['Open_Sans',sans-serif]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 font-['Open_Sans',sans-serif]"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-2 font-['Open_Sans',sans-serif]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 font-['Open_Sans',sans-serif]"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2 font-['Open_Sans',sans-serif]">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 font-['Open_Sans',sans-serif]"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="courses">LSAT/LNAT Courses</option>
                  <option value="consultation">Book Consultation</option>
                  <option value="instructors">Instructor Information</option>
                  <option value="technical">Technical Support</option>
                  <option value="careers">Career Opportunities</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2 font-['Open_Sans',sans-serif]">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none font-['Open_Sans',sans-serif]"
                  placeholder="Tell us how we can help you with your law school preparation..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitted}
                className={`w-full flex items-center justify-center px-8 py-4 font-semibold rounded-xl transition-all duration-300 font-['Open_Sans',sans-serif] ${
                  isSubmitted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 transform hover:scale-105 shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Message Sent Successfully
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>



        {/* Statistics Section - Matching Other Pages */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 border border-stone-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-stone-800 mb-2">Why Choose LawEdu</h3>
            <p className="text-stone-600 font-['Open_Sans',sans-serif]">Trusted by students and professionals worldwide</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">24/7</div>
              <p className="text-stone-600 font-medium font-['Open_Sans',sans-serif]">Support Available</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">2hr</div>
              <p className="text-stone-600 font-medium font-['Open_Sans',sans-serif]">Response Time</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-700 mb-2">5,000+</div>
              <p className="text-stone-600 font-medium font-['Open_Sans',sans-serif]">Happy Students</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-stone-600 mb-2">92%</div>
              <p className="text-stone-600 font-medium font-['Open_Sans',sans-serif]">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
