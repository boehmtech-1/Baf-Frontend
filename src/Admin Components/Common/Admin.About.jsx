import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../Common/Admin.Navbar'; // Assuming this path
import '../../styles/AboutSection.css'; // General admin styling



export default function AdminAbout() {
  const [aboutData, setAboutData] = useState({
    _id: '',
    description1: '',
    description2: '',
    image: null, // For displaying current image path or object
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null); // For new file upload

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        toast.error('Authentication required. Please log in.');
        setLoading(false);
        return;
      }
      const response = await axios.get(`${CMS_URL}/about`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Assuming the /about endpoint returns an array, and we care about the first item
      if (response.data && response.data.length > 0) {
        setAboutData(response.data[0]);
      } else {
        // If no about section exists, initialize with default values (or an empty state)
        setAboutData({ _id: '', description1: '', description2: '', image: null });
        toast.info('No About section found. You can create one by submitting the form.');
      }
    } catch (err) {
      setError(err);
      toast.error('Failed to fetch about data.');
      console.error('Fetch about data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setAboutData({ ...aboutData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('description1', aboutData.description1);
    formData.append('description2', aboutData.description2);
    if (file) {
      formData.append('image', file); // 'image' should match your backend's expected field name for file upload
    }

    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        toast.error('Authentication required. Please log in.');
        setLoading(false);
        return;
      }

      let response;
      if (aboutData._id) {
        // If _id exists, it's an update operation (PUT/PATCH)
        // Ensure your backend supports PUT/PATCH /about/:id for updates
        response = await axios.put(`${CMS_URL}/about/${aboutData._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Important for file uploads
          },
        });
        toast.success('About section updated successfully!');
      } else {
        // If no _id, it's a creation operation (POST)
        // Ensure your backend supports POST /about for creating a new section
        response = await axios.post(`${CMS_URL}/about`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('About section created successfully!');
      }
      setAboutData(response.data); // Update state with the latest data from backend
      setFile(null); // Clear file input after successful upload
    } catch (err) {
      setError(err);
      toast.error('Failed to update/create about section.');
      console.error('Submit about data error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="admin-container bg-black text-white min-h-screen flex items-center justify-center">
          <p>Loading About CMS...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AdminNavbar />
        <div className="admin-container bg-black text-white min-h-screen flex items-center justify-center">
          <p className="text-red-500">Error: {error.message}</p>
        </div>
      </>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <AdminNavbar />
      <div className="admin-content-area p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Manage About Section</h1>

        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="description1" className="block text-white text-sm font-bold mb-2">
              Description 1:
            </label>
            <textarea
              id="description1"
              name="description1"
              value={aboutData.description1}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="description2" className="block text-white text-sm font-bold mb-2">
              Description 2:
            </label>
            <textarea
              id="description2"
              name="description2"
              value={aboutData.description2}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-white text-sm font-bold mb-2">
              Current Image:
            </label>
            {aboutData.image && aboutData.image.path ? (
              <img
                src={`${CMS_URL}/${aboutData.image.path}`}
                alt="About Section"
                className="max-w-xs h-auto rounded-lg mb-2"
              />
            ) : (
              <p className="text-gray-400">No image currently set. Upload a new one.</p>
            )}
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-300
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-orange-500 file:text-white
                         hover:file:bg-orange-600"
            />
             <p className="text-gray-400 text-xs mt-1">Upload a new image to replace the current one.</p>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save About Section'}
            </button>
          </div>
        </form>
      </div>
    </div>
);}