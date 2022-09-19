import { useEffect, useState } from 'react';

const API_KEY = '1fSDtAex';
const LOCATIONS_LINK = `http://wmp.interaction.courses/api/v1/?apiKey=${API_KEY}&mode=read&endpoint=locations`;

const useFetchLocations = () => {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const promise = await fetch(LOCATIONS_LINK);
        const data = await promise.json();
        setLocations(data.locations);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSamples();
  }, []);
  return { locations };
};

export default useFetchLocations;
