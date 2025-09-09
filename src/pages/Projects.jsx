import React from 'react'

export default function Projects() {
  return (
    <div className="min-h-screen bg-gray-900 px-6 py-16 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Projects</h1>
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
    </div>
  )
}



