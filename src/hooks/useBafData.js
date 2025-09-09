import { useState, useEffect } from 'react';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://baf-backend-18y5.onrender.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false
});

export function useBafData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log("🔄 Fetching data from backend...");

        const response = await instance.get('/');

        if (response.data) {
          console.log('✅ Data fetched successfully:', response.data);
          setData(response.data);
          setError(null);
        }
      } catch (err) {
        console.error('❌ Error fetching data:', err);
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Response data:', err.response.data);
          console.error('Response status:', err.response.status);
          console.error('Response headers:', err.response.headers);
          setError(`Server error: ${err.response.status} - ${err.response.data.message || err.message}`);
        } else if (err.request) {
          // The request was made but no response was received
          console.error('No response received:', err.request);
          setError('No response received from server');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up request:', err.message);
          setError(`Request setup error: ${err.message}`);
        }
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}