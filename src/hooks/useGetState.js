import { useState, useEffect } from "react";
import axios from "axios";

// Hook For Get Nigeria Based State

const useGetState = (state = null) => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lga, setLga] = useState([]);
  //   Get Nigeria States
  useEffect(() => {
    // Function to get Nigeria States
    const getState = async () => {
      try {
        const response = await axios.get(
          "https://nga-states-lga.onrender.com/fetch"
        );
        const data = await response.data;
        setStates(data);
      } catch (error) {
        console.log(error);
        setError(error?.message || error?.response?.data);
      } finally {
        setLoading(false);
      }
    };
    getState();
  }, []);
  //  Get Nigeria Local Government Area
  useEffect(() => {
    if (state) {
      // Function to get Nigeria Local Government Area
      const getLga = async () => {
        try {
          const response = await axios.get(
            `https://nga-states-lga.onrender.com/?state=${state}`
          );
          const data = await response.data;
          setLga(data);
          if (data.includes(/Error/gi) || data.length === 0) {
            throw { message: "No Local Government Area Found" };
          }
        } catch (error) {
          setError(error?.message || error?.response?.data);
        } finally {
          setLoading(false);
        }
      };
      //   Call the function
      getLga();
    }
  }, [state]);
  return { states, loading, error, lga };
};

export default useGetState;
