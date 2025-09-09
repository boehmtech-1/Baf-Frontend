import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '/Users/speed/Desktop/Boehmtech_Production/for Cursor copy/baf-frontend/src/Admin Components/Common/Admin.Navbar.jsx';

const AdminLayout = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <AdminNavbar />
      <div className="pt-24"> {/* Add padding top to account for fixed navbar */}
        <Outlet /> {/* This will render the child routes */}
      </div>
    </div>
  );
};

export default AdminLayout;