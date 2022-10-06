import { useState, useEffect } from 'react';

const useReadShareLocation = (id) => {
  const API_KEY = '1fSDtAex';
  const READ_SHARE_LINK = `http://wmp.interaction.courses/api/v1/?apiKey=${API_KEY}&mode=read&endpoint=${id}`;
  const [sharedLocations, setSharedLocations] = useState([]);
  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const promise = await fetch(READ_SHARE_LINK);
        const data = await promise.json();
        console.log(data);
        setSharedLocations(data.locations);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSamples();
  }, [READ_SHARE_LINK]);
  return { sharedLocations };
};

export default useReadShareLocation;
