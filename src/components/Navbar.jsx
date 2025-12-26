import React, { useContext, useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { 
  UserCircle, 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  Calendar, 
  LogOut,
  Scale,
  BookOpen,
  Phone,
  Home,
  Users,
  BarChart3,
  Bell,
  Settings
} from 'lucide-react'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { token, setToken, userData, setUserData } = useContext(AppContext)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setUserData(null)
    setShowProfileMenu(false)
    setShowMenu(false)
    navigate('/')
  }

  const closeMenu = () => {
    setShowMenu(false)
  }

  const closeProfileMenu = () => {
    setShowProfileMenu(false)
  }

  // Navigation items configuration
  const navigationItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/instructors', label: 'Instructors', icon: Users },
    { to: '/courses', label: 'Courses', icon: BookOpen },
    { to: '/book-consultation', label: 'Consultation', icon: Calendar },
    { to: '/about', label: 'About', icon: BookOpen },
    { to: '/contact', label: 'Contact', icon: Phone },
  ]

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-['Georgia','Times_New_Roman',serif] ${
        scrolled 
          ? 'bg-white shadow-xl border-b border-stone-200' 
          : 'bg-white shadow-md border-b border-stone-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            
            {/* Logo Section */}
            <div 
              onClick={() => navigate('/')} 
              className="flex items-center space-x-3 cursor-pointer group transition-transform duration-300 hover:scale-105"
            >
              
              <div className="hidden sm:block">
                <span className="text-xl lg:text-2xl font-bold text-stone-800 tracking-tight">
                  LawEdu
                </span>
                <div className="text-xs text-stone-600 font-normal -mt-0.5 tracking-wide">
                  Professional Learning
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-8">
              <div className="flex items-center space-x-1 bg-stone-50 rounded-xl p-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 group flex items-center space-x-2 ${
                          isActive
                            ? 'text-amber-800 bg-white shadow-sm border border-stone-200'
                            : 'text-stone-600 hover:text-amber-700 hover:bg-white hover:shadow-sm'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon className="w-4 h-4" />
                          <span className="whitespace-nowrap font-['Open_Sans',sans-serif]">{item.label}</span>
                          {isActive && (
                            <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-700 rounded-full"></div>
                          )}
                        </>
                      )}
                    </NavLink>
                  )
                })}
              </div>
            </div>

            {/* Right Side - Auth & Actions */}
            <div className="flex items-center space-x-3">
              {token && userData ? (
                <>
                  {/* Notification Bell - Desktop Only */}
                  <button className="hidden lg:flex items-center justify-center w-10 h-10 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-600 hover:text-amber-700 transition-all duration-300 relative border border-stone-200">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-600 rounded-full text-xs flex items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                    </span>
                  </button>

                  {/* User Profile Menu */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="flex items-center space-x-3 p-2 pr-3 rounded-lg hover:bg-stone-50 transition-all duration-300 border border-transparent hover:border-stone-200"
                    >
                      <div className="relative">
                        <div className="w-9 h-9 rounded-lg overflow-hidden border-2 border-amber-100 bg-gradient-to-br from-amber-600 to-amber-700">
                          {userData.image ? (
                            <img 
                              src={userData.image} 
                              alt="Profile" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm font-['Georgia',serif]">
                                {userData.name?.charAt(0)?.toUpperCase() || 'U'}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                      </div>
                      <div className="hidden sm:block text-left">
                        <p className="font-semibold text-stone-800 text-sm leading-none font-['Open_Sans',sans-serif]">
                          {userData.name?.split(' ')[0] || 'User'}
                        </p>
                        <p className="text-xs text-stone-500 mt-0.5 font-['Open_Sans',sans-serif]">
                          {userData.email?.length > 20 ? `${userData.email.substring(0, 20)}...` : userData.email}
                        </p>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Enhanced Profile Dropdown */}
                    {showProfileMenu && (
                      <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-xl shadow-xl border border-stone-200 py-3 z-50">
                        <div className="px-4 py-3 border-b border-stone-100">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-amber-600 to-amber-700">
                              {userData.image ? (
                                <img src={userData.image} alt="Profile" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="text-white font-bold font-['Georgia',serif]">{userData.name?.charAt(0)?.toUpperCase()}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-stone-800 truncate font-['Open_Sans',sans-serif]">{userData.name || 'User'}</p>
                              <p className="text-sm text-stone-500 truncate font-['Open_Sans',sans-serif]">{userData.email}</p>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 mt-1 font-['Open_Sans',sans-serif]">
                                Online
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="py-2">
                          {[
                            { icon: BarChart3, label: 'Dashboard', onClick: () => navigate('/dashboard') },
                            { icon: User, label: 'My Profile', onClick: () => navigate('/profile') },
                            { icon: Settings, label: 'Settings', onClick: () => navigate('/settings') },
                            { icon: LogOut, label: 'Sign Out', onClick: logout, danger: true },
                          ].map((item, index) => {
                            const Icon = item.icon
                            return (
                              <button
                                key={index}
                                onClick={() => {
                                  item.onClick()
                                  closeProfileMenu()
                                }}
                                className={`w-full flex items-center space-x-3 px-4 py-3 text-sm transition-all duration-200 font-['Open_Sans',sans-serif] ${
                                  item.danger 
                                    ? 'text-red-700 hover:bg-red-50 hover:text-red-800' 
                                    : 'text-stone-700 hover:bg-stone-50 hover:text-amber-700'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                                <span className="font-medium">{item.label}</span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <button 
                    onClick={() => navigate('/login')} 
                    className="text-stone-700 hover:text-amber-700 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 hover:bg-stone-50 border border-transparent hover:border-stone-200 font-['Open_Sans',sans-serif]"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => navigate('/register')} 
                    className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-amber-700 hover:to-amber-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-['Open_Sans',sans-serif]"
                  >
                    Get Started
                  </button>
                </div>
              )}
              
              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setShowMenu(true)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-600 transition-all duration-300 border border-stone-200"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {showMenu && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-stone-900 bg-opacity-50" 
              onClick={closeMenu}
            />
            
            {/* Mobile Menu Panel */}
            <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl overflow-y-auto">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-stone-200 bg-white">
                <div className="flex items-center space-x-3">
                  <Scale className="w-7 h-7 text-amber-700" />
                  <div>
                    <span className="text-lg font-bold text-stone-800 font-['Georgia',serif]">LawEdu</span>
                    <p className="text-xs text-stone-500 -mt-0.5 font-['Open_Sans',sans-serif]">Professional Learning</p>
                  </div>
                </div>
                <button 
                  onClick={closeMenu}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors"
                >
                  <X className="w-5 h-5 text-stone-600" />
                </button>
              </div>
              
              {/* Mobile Content */}
              <div className="p-6 bg-white min-h-full">
                {/* Mobile User Section */}
                {token && userData ? (
                  <div className="mb-8 p-4 bg-gradient-to-r from-amber-50 to-stone-50 rounded-xl border border-amber-200">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gradient-to-br from-amber-600 to-amber-700 border-2 border-white shadow-lg flex-shrink-0">
                        {userData.image ? (
                          <img src={userData.image} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg font-['Georgia',serif]">
                              {userData.name?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-stone-800 truncate text-lg font-['Open_Sans',sans-serif]">{userData.name}</p>
                        <p className="text-sm text-stone-600 truncate font-['Open_Sans',sans-serif]">{userData.email}</p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 mt-1 font-['Open_Sans',sans-serif]">
                          ✓ Active
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => { navigate('/dashboard'); closeMenu() }}
                        className="flex items-center justify-center space-x-2 py-3 px-3 bg-white rounded-lg text-sm font-medium text-stone-700 hover:text-amber-700 transition-colors border border-stone-200 font-['Open_Sans',sans-serif]"
                      >
                        <BarChart3 className="w-4 h-4" />
                        <span>Dashboard</span>
                      </button>
                      <button 
                        onClick={logout}
                        className="flex items-center justify-center space-x-2 py-3 px-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors border border-red-200 font-['Open_Sans',sans-serif]"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-8 space-y-3">
                    <button 
                      onClick={() => { navigate('/login'); closeMenu() }}
                      className="w-full flex items-center justify-center space-x-2 border-2 border-amber-700 text-amber-700 py-4 rounded-xl font-semibold hover:bg-amber-50 transition-all duration-300 font-['Open_Sans',sans-serif]"
                    >
                      <User className="w-5 h-5" />
                      <span>Sign In</span>
                    </button>
                    <button 
                      onClick={() => { navigate('/register'); closeMenu() }}
                      className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 font-['Open_Sans',sans-serif]"
                    >
                      Get Started Free
                    </button>
                  </div>
                )}

                {/* Mobile Navigation Links */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4 px-2 font-['Open_Sans',sans-serif]">
                    Navigation
                  </h3>
                  <div className="space-y-1">
                    {navigationItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={closeMenu}
                          className={({ isActive }) =>
                            `flex items-center space-x-4 px-4 py-4 rounded-xl transition-all duration-300 w-full font-['Open_Sans',sans-serif] ${
                              isActive
                                ? 'bg-amber-50 text-amber-700 border-l-4 border-amber-700 shadow-sm'
                                : 'text-stone-700 hover:bg-stone-50 hover:text-amber-700'
                            }`
                          }
                        >
                          <Icon className="w-6 h-6 flex-shrink-0" />
                          <span className="font-semibold text-lg">{item.label}</span>
                        </NavLink>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Click outside handlers */}
      {showProfileMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={closeProfileMenu}
        />
      )}
    </>
  )
}

export default Navbar
