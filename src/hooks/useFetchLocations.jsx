import { useEffect, useState } from 'react';

const API_KEY = '1fSDtAex';
const LOCATIONS_LINK = `http://wmp.interaction.courses/api/v1/?apiKey=${API_KEY}&mode=read&endpoint=locations`;

const useFetchLocations = () => {
  const [locations, setLocations] = useState([]);
  const [sharedLocations, setSharedLocations] = useState([]);
  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const promise = await fetch(LOCATIONS_LINK);
        const data = await promise.json();
        const inStLucia = data.locations.filter(
          (elem) => elem.suburb === 'St Lucia'
        );
        setLocations(inStLucia);
        const promise2 = await fetch(
          'http://wmp.interaction.courses/api/v1/?apiKey=1fSDtAex&mode=read&endpoint=samples_to_locations'
        );
        const data2 = await promise2.json();
        setSharedLocations(data2.samples_to_locations ?? []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSamples();
  }, []);
  return { locations, sharedLocations };
};

export default useFetchLocations;
