import React from 'react'

export default function Services() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-5xl w-full">
        <h1 className="text-4xl font-bold mb-8 text-center">Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Design', 'Construction', 'Renovation'].map((svc) => (
            <div key={svc} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-2">{svc}</h3>
              <p className="text-gray-400">High quality {svc.toLowerCase()} services tailored to your needs.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}



