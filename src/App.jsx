import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { AnimatedCursor } from "./components/animations/AnimatedCursor";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/footer/footer";


const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    padding: "1.5rem 2rem",
    backgroundColor: "#000000ff",
    color: "#fff",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logoImage: {
    height: "40px",  // Adjust based on your logo size
    width: "auto",
    maxWidth: "150px",  // Prevents logo from being too wide
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    marginLeft: "auto",
    gap: "2rem",
    marginRight: "2rem",
  },
  navItem: {
    position: "relative",
    cursor: "pointer",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: 500,
    position: "relative",
    padding: "0.25rem 0",
    display: "inline-block",
    transition: "transform 0.3s ease, color 0.3s ease",  // Add transition
  },

  adminButton: {
    display: "flex",
    alignItems: "center",
  },
  adminBtn: {
    background: "transparent",
    border: "1px solid white",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 500,
    transition: "all 0.3s ease",
  },
  mobileMenuButton: {
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    padding: "0.5rem",
    marginLeft: "auto",
  },
  mobileMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#000000ff",
    padding: "1rem",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  mobileMenuItem: {
    color: "white",
    textDecoration: "none",
    padding: "0.75rem 1rem",
    borderRadius: "4px",
    transition: "background-color 0.3s ease",
  },
  mobileAdminBtn: {
    background: "transparent",
    border: "1px solid white",
    color: "white",
    padding: "0.75rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: 500,
    marginTop: "0.5rem",
  },
};



const Section = ({ id, className = '', children }) => (
  <section id={id} className={className}>{children}</section>
)

const Hero = () => (
  <Section id="home" className="relative h-screen flex items-center justify-center text-center pt-20">
    <div className="absolute inset-0 bg-black opacity-60 z-0" />
    <img src="src/images/mainbg.jpeg" alt="Modern Architecture" className="absolute inset-0 w-full h-full object-cover" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'public/images/mainbg.jpeg' }} />
    <div className="relative z-10 p-4">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4">WE BUILD YOUR VISIONS</h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">Delivering exceptional construction and design services with a commitment to quality, innovation, and client satisfaction.</p>
      <a href="#services" className="inline-block px-8 py-4 bg-yellow-400 text-black font-semibold rounded-lg">Our Services</a>
    </div>
  </Section>
)

const About = () => (
  <Section id="about" className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
    <div className="max-w-4xl text-center space-y-4">
      <h2 className="text-4xl font-bold">About Us</h2>
      <p className="text-gray-300">We are a full-service construction and design company specializing in modern architectural solutions, delivering on time with uncompromising quality.</p>
    </div>
  </Section>
)

const Services = () => (
  <Section id="services" className="min-h-screen bg-black flex items-center justify-center px-6">
    <div className="max-w-5xl w-full">
      <h2 className="text-4xl font-bold mb-8 text-center">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Design', 'Construction', 'Renovation'].map((svc) => (
          <div key={svc} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-semibold mb-2">{svc}</h3>
            <p className="text-gray-400">High quality {svc.toLowerCase()} services tailored to your needs.</p>
          </div>
        ))}
      </div>
    </div>
  </Section>
)

const Projects = () => (
  <Section id="projects" className="min-h-screen bg-gray-900 px-6 py-16">
    <h2 className="text-4xl font-bold mb-8 text-center">Projects</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div key={idx} className="relative group h-56 rounded-xl overflow-hidden border border-gray-800">
          <img src={`https://picsum.photos/seed/baf-${idx}/600/400`} alt="Project" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white font-semibold">Project {idx + 1}</span>
          </div>
        </div>
      ))}
    </div>
  </Section>
)

const Contact = () => (
  <Section id="contact" className="bg-black px-6 py-16">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4">Contact</h2>
      <p className="text-gray-400 mb-6">Have a project in mind? Let’s bring it to life.</p>
      <a href="#" className="inline-block px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg">Get a Quote</a>
    </div>
  </Section>
)

const LoginOverlay = ({ open, onClose }) => (
  // 1. The main overlay now listens for a click to close the modal.
  <div
    onClick={onClose}
    className={(open ? 'flex' : 'hidden') + ' fixed inset-0 bg-black/90 items-center justify-center p-4 cursor-pointer'}
  >
    {/* 2. Clicks on the form itself are stopped from bubbling up to the overlay, preventing it from closing. */}
    <div
      onClick={(e) => e.stopPropagation()}
      className="max-w-md w-full mx-auto relative cursor-default"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wider">BAF</h1>
        <h2 className="mt-2 text-2xl font-bold text-gray-200">Admin Panel</h2>
      </div>
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg relative">
        {/* 3. Added a dedicated close button in the top-right corner. */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          aria-label="Close login form"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <form className="space-y-6" action="#" method="POST" onSubmit={(e) => { e.preventDefault(); }}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email address</label>
            <input id="email" name="email" type="email" required className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="admin@example.com" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input id="password" name="password" type="password" required className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400" placeholder="••••••••" />
          </div>
          <div className="flex items-center justify-between">
            <a href="#" className="text-sm font-medium text-yellow-400 hover:text-yellow-300">Forgot your password?</a>
          </div>
          <div>
            <button type="submit" className="w-full justify-center py-3 px-6 font-semibold rounded-lg bg-yellow-400 text-black">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="bg-black text-white min-h-screen" style={{ cursor: 'none' }}>
      <AnimatedCursor style={{
        width: 13,
        height: 13,
        borderRadius: "50%",
        position: "fixed",
        left: cursorPos.x - 16,
        top: cursorPos.y - 16,
        zIndex: 9999,
        pointerEvents: "none",

        backgroundColor: "#ffffffff",
        boxShadow: "0 0 12px rgba(255, 255, 255, 0.7)",
      }} />
      <Navbar />
      <main style={{ paddingTop: '80px' }}>
        <Outlet />
      </main>
      <Footer />
      <LoginOverlay open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  )
}
