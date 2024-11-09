import { useState, useEffect } from "react";
import axios from "axios";
//   Env Base Url
const baseURL = import.meta.env.VITE_BASE_URL;

// Fetch from the App Backend Server
const useFetch = (url, token = "") => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //   Axios Instance for Fetching Data
  const apiClient = axios.create({
    baseURL,
  });
  // Get Request
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        setError(null)
      } catch (error) {
        setError(error.response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
