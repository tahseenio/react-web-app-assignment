import { useState, useEffect } from 'react';

const API_KEY = '1fSDtAex';
const samples_to_locations = '248';
const READ_SHARE_LINK = `http://wmp.interaction.courses/api/v1/?apiKey=${API_KEY}&mode=read&endpoint=${samples_to_locations}`;

const useReadShareLocation = () => {
  const [SharedLocations, setSharedLocations] = useState([]);
  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const promise = await fetch(READ_SHARE_LINK);
        const data = await promise.json();
        setLocations(data.locations);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSamples();
  }, []);
  return { SharedLocations };
};

export default useReadShareLocation;
