import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import EventsPage from './pages/Events.jsx' // Events listing page (you need to create this)
import EventDetailpage from './EventsPage/EventDetailpage.jsx' // Individual event detail page
import { BrandPage } from './components/BrandPage/BrandPage.jsx'
import Contact from './pages/Contact.jsx'
import './styles/global.css'
import { BrandDetailPage } from './components/BrandPage/BrandDetailPage.jsx'
import { CatalogPage } from './components/Catalog/CatalogPage.jsx'
import { CatalogDetailPage } from './components/Catalog/CatalogDetailPage.jsx'

import { NotFoundPage } from './pages/404.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'events', element: <EventsPage /> }, // Events listing page
      { path: 'events/:slug', element: <EventDetailpage /> }, // Individual event detail - ADD THIS LINE
      { path: 'catalog', element: <CatalogPage /> },
      { path: 'catalog/:slug', element: <CatalogDetailPage /> },
      { path: 'brands', element: <BrandPage /> },
      { path: 'brands/:slug', element: <BrandDetailPage /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
  // Add the catch-all route here to handle any unmatched URLs
  { path: '*', element: <NotFoundPage /> },
], {
  future: {
    v7_startTransition: true,
  },
})

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)