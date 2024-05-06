import { useState,useEffect } from "react";
import axios from 'axios'

const useDevis = () => {
  const [devis, setDevis] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getAllDevis = async () => {
    try {
      setIsLoading(true);
      const response = await axios("http://localhost:3000/devis");
      setDevis(response.data);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllDevis();
  }, []);

  return {
    getAllDevis,
    isLoading,
    devis,
  };
};

export default useDevis;
