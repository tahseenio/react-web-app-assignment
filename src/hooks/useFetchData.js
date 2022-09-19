import { useEffect, useState } from 'react';

const useFetchData = (id) => {
  const getInstrument = (instrument) => {
    switch (instrument) {
      case 'piano':
        return 'Piano';
      case 'french_horn':
        return 'French Horn';
      case 'guitar':
        return 'Guitar';
      case 'drums':
        return 'Drums';
    }
  };

  const [samples, setSamples] = useState([]);
  const [name, setName] = useState('');
  const [recordingData, setRecordingData] = useState([]);
  const [currentSample, setCurrentSample] = useState([]);
  const [activeInstrum, setActiveInstrum] = useState('');
  const API_KEY = '1fSDtAex';
  const READ_SAMPLES_LINK = `http://wmp.interaction.courses/api/v1/?apiKey=${API_KEY}&mode=read&endpoint=samples`;

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const promise = await fetch(READ_SAMPLES_LINK);
        const data = await promise.json();
        const resolvedSamples = data.samples;
        setSamples(resolvedSamples);
        if (id) {
          const filteredForSample = resolvedSamples.filter(
            (elem) => elem.id === id
          );
          setCurrentSample(filteredForSample[0]);
          setName(filteredForSample[0].name);
          setActiveInstrum(getInstrument(filteredForSample[0].type));
          setRecordingData(JSON.parse(filteredForSample[0].recording_data));
        }
      } catch (err) {
        console.log(err);
        setSamples([]);
      }
    };
    fetchSamples();
  }, []);
  return { samples, recordingData, currentSample, activeInstrum, name };
};

export default useFetchData;
