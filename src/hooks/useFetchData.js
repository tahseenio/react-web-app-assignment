import { useEffect, useState } from 'react';

const useFetchData = () => {
  const [samples, setSamples] = useState([]);
  const API_KEY = '1fSDtAex';
  const READ_SAMPLES_LINK = `http://wmp.interaction.courses/api/v1/?apiKey=${API_KEY}&mode=read&endpoint=samples`;

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const promise = await fetch(READ_SAMPLES_LINK);
        const data = await promise.json();
        setSamples(data.samples);
      } catch (err) {
        console.log(err);
        setSamples([]);
      }
    };
    fetchSamples();
  }, []);
  return { samples };
};

export default useFetchData;
