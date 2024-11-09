import { useState } from "react";
import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

const usePost = (url, token = "") => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiClient = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  const postData = async (body) => {
    setLoading(true)
    try {
      const response = await apiClient.post(url, body);
      setData(response.data);
      setError(null)
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postData };
};

export default usePost;
