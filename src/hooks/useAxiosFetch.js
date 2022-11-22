import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    // if component is unmounted, we can cancel the request.
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          // cancel the reuqest if we unmount the component
          cancelToken: source.token,
        });
        // if we get a response
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err.message);
          setData([]);
        }
      } finally {
        isMounted && setTimeout(() => setIsLoading(false), 2000);
      }
    };
    fetchData(dataUrl);
    // this will run whenever dependancy changes
    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };
    return cleanUp;
  }, [dataUrl]);
  return { data, isLoading, fetchError };
};

export default useAxiosFetch;
