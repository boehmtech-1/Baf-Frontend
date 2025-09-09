import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, useLocation, useNavigate, Navigate, Outlet } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import { BrandPage } from './components/BrandPage/BrandPage.jsx'
import Contact from './pages/Contact.jsx'
import './styles/global.css'
import { BrandDetailPage } from './components/BrandPage/BrandDetailPage.jsx'
import { CatalogPage } from './components/Catalog/CatalogPage.jsx'
import { CatalogDetailPage } from './components/Catalog/CatalogDetailPage.jsx'
import AdminPopup from './pages/AdminPopup.jsx'
import AdminHome from './Admin Pages/Admin.Home.jsx'
import AdminLayout from './Admin Pages/AdminLayout.jsx'

// Wrapper component for Home that handles admin popup
const HomeWithAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAdminPopup, setShowAdminPopup] = useState(false);

  useEffect(() => {
    // Check if admin query parameter is present
    const urlParams = new URLSearchParams(location.search);
    if (urlParams.get('admin') === 'true') {
      setShowAdminPopup(true);
    }
  }, [location.search]);

  const handleCloseAdminPopup = () => {
    setShowAdminPopup(false);
    // Remove the admin query parameter from URL
    navigate('/', { replace: true });
  };

  return (
    <>
      <Home showAdminPopup={showAdminPopup} />
      {showAdminPopup && <AdminPopup onClose={handleCloseAdminPopup} />}
    </>
  );
};

// Authentication check for admin routes
const RequireAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if admin token exists in localStorage
    const checkAuth = () => {
      const token = localStorage.getItem('adminToken');
      console.log('Checking auth token:', token ? 'Token exists' : 'No token');
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  if (isLoading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Verifying authentication...</p>
        </div>
      </div>
    );
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated, render the outlet (child routes)
  console.log('Authenticated, rendering admin page');
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomeWithAdmin /> },
      { path: 'about', element: <About /> },
      { path: 'catalog', element: <CatalogPage /> },
      { path: 'catalog/:slug', element: <CatalogDetailPage /> },
      { path: 'brands', element: <BrandPage /> },
      { path: 'brands/:slug', element: <BrandDetailPage /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
  // Admin routes with authentication and layout
  {
    path: '/admin',
    element: <RequireAuth />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminHome /> },
          // Add more admin routes here as needed
          { path: 'carousel', element: <AdminHome /> }, // Replace with actual component when available
          { path: 'hero', element: <AdminHome /> },     // Replace with actual component when available
          { path: 'brands', element: <AdminHome /> },   // Replace with actual component when available
        ],
      },
    ],
  },
  // Redirect /login to home with admin popup
  { path: '/login', element: <Navigate to="/?admin=true" replace /> },
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