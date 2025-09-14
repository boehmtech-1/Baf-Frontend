import { useState, useEffect } from 'react';
import axios from 'axios';

const instance = axios.create({
  // The baseURL is removed because we are using a proxy in development.
  // The request path '/api/team' will be automatically proxied by Vite.
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

        // Fetch all necessary data for the homepage concurrently.
        // Using Promise.allSettled to prevent one failed request from blocking others.
        const results = await Promise.allSettled([
          instance.get('/api/AboutSection?depth=1'),
          instance.get('/api/events?limit=10&depth=1'),
          instance.get('/api/brands?depth=1'),
        ]);

        const [aboutResult, eventsResult, brandsResult] = results;

        // --- DEBUGGING LOGS ---
        console.log('API Response for /api/AboutSection:', aboutResult);
        console.log('API Response for /api/events:', eventsResult);
        console.log('API Response for /api/brands:', brandsResult);
        // --- END DEBUGGING LOGS ---

        const combinedData = {
          home: {
            about: aboutResult.status === 'fulfilled' && aboutResult.value.data.docs.length > 0
              ? aboutResult.value.data.docs[0]
              : null,
          },
          events: eventsResult.status === 'fulfilled' ? eventsResult.value.data.docs : [],
          brands: brandsResult.status === 'fulfilled' ? brandsResult.value.data.docs : [],
        };

        if (combinedData) {
          console.log('✅ Data fetched successfully:', combinedData);
          results.forEach((result, index) => {
            if (result.status === 'rejected') {
              const urls = ['/api/AboutSection', '/api/events', '/api/brands'];
              console.error(`❌ A data fetch request failed for ${urls[index]}:`, result.reason.message);
            }
          });
          setData(combinedData);
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