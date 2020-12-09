import { useState, useEffect } from "react";

import axios from 'axios';

const useFetch = ({ method, url, data = null}) => {
  const api = axios.create({
    baseURL: ""
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      api[method](url, null, JSON.parse(data))
        .then(res => {
          setResponse(res.data);
        })
        .catch(err => {
          setError(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchData();
  }, [url]);

  return { response, error, isLoading };
};

export default useFetch;
