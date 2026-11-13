import React from 'react'
import { 
  Scale, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Home,
  Users,
  BookOpen,
  MessageSquare,
  Calendar
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 border-t border-stone-200 font-['Georgia','Times_New_Roman',serif] mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo & About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-stone-800">
                LawEdu
              </span>
            </div>
            <p className="text-stone-600 text-sm mb-6 leading-relaxed font-['Open_Sans',sans-serif]">
              Empowering future legal professionals through expert-led LSAT & LNAT preparation and career guidance.
            </p>
            
            {/* Social Links with Icons */}
            <div className="flex space-x-3">
              {[
                { label: 'Facebook', href: '#', icon: Facebook },
                { label: 'Twitter', href: '#', icon: Twitter },
                { label: 'LinkedIn', href: '#', icon: Linkedin },
                { label: 'Instagram', href: '#', icon: Instagram }
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-white border border-stone-200 rounded-lg flex items-center justify-center transition-all duration-300 hover:border-amber-300 hover:shadow-md group"
                  >
                    <Icon className="w-4 h-4 text-stone-400 group-hover:text-amber-600 transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-stone-800 font-bold mb-6 text-base">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/', icon: Home },
                { name: 'Instructors', href: '/instructors', icon: Users },
                { name: 'Courses', href: '/courses', icon: BookOpen },
                { name: 'About Us', href: '/about', icon: Scale },
                { name: 'Contact', href: '/contact', icon: MessageSquare },
                { name: 'Book Consultation', href: '/book-consultation', icon: Calendar }
              ].map((link, i) => {
                const Icon = link.icon;
                return (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-stone-600 hover:text-amber-700 transition-colors duration-300 text-sm font-['Open_Sans',sans-serif] flex items-center group"
                    >
                      <Icon className="w-3 h-3 text-amber-400 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-stone-800 font-bold mb-6 text-base">Support</h3>
            <ul className="space-y-3">
              {[
                'Help Center',
                'Student Support', 
                'Privacy Policy',
                'Terms of Service',
                'Cookie Policy'
              ].map((item, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-stone-600 hover:text-amber-700 transition-colors duration-300 text-sm font-['Open_Sans',sans-serif] flex items-center group"
                  >
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-stone-800 font-bold mb-6 text-base">Contact</h3>
            <div className="space-y-4">
              
              {/* Phone */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-amber-100 border border-amber-200 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 font-['Open_Sans',sans-serif]">Phone</p>
                  <a
                    href="tel:+12124567890"
                    className="text-stone-800 hover:text-amber-700 transition-colors duration-300 text-sm font-medium font-['Open_Sans',sans-serif]"
                  >
                    +1 (212) 456-7890
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-100 border border-emerald-200 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 font-['Open_Sans',sans-serif]">Email</p>
                  <a
                    href="mailto:contact@lawedu.com"
                    className="text-stone-800 hover:text-emerald-600 transition-colors duration-300 text-sm font-medium font-['Open_Sans',sans-serif]"
                  >
                    contact@lawedu.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-stone-200 border border-stone-300 rounded-lg flex items-center justify-center mt-0.5">
                  <MapPin className="w-4 h-4 text-stone-600" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 font-['Open_Sans',sans-serif] mb-1">Address</p>
                  <p className="text-stone-800 text-sm font-medium font-['Open_Sans',sans-serif]">
                    123 Legal District<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Bottom Section */}
      <div className="border-t border-stone-200 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <div className="text-sm text-stone-700 font-['Open_Sans',sans-serif]">
                &copy; {currentYear} LawEdu. All rights reserved.
              </div>
              <div className="hidden sm:block">
                <div className="w-4 h-4 bg-amber-600 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-stone-600 font-['Open_Sans',sans-serif]">
              <a href="/privacy" className="hover:text-amber-700 transition-colors">Privacy Policy</a>
              <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
              <a href="/terms" className="hover:text-amber-700 transition-colors">Terms of Service</a>
              <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
              <a href="/cookies" className="hover:text-amber-700 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
