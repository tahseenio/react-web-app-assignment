import { useEffect, useState } from 'react';

const API_KEY = '1fSDtAex';
const READ_SAMPLES_LINK = `https://wmp.interaction.courses/api/v1/?apiKey=${API_KEY}&mode=read&endpoint=samples`;

/**
 * Converts UTCDate to format required by assignment
 *
 */
export const getCorrectFormatDate = (UTCDate) => {
  const date = new Date(UTCDate);
  const time = date
    .toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    .replace(' PM', 'pm')
    .replace(' AM', 'am');

  const currDate = date
    .toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
    .replace(',', '');

  return `${time} on ${currDate}`;
};

/**
 * Returns all critical information of a sample such as name, activeInstrument, recording data and various setters for useState
 */
const useFetchData = (id) => {
  /**
   * Returns the UI friendly instrument name based on the API equivalent instrument name
   */
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
      default:
        console.log(`Wrong instrument, ${instrument} try again!`);
    }
  };

  const [samples, setSamples] = useState([]);
  const [name, setName] = useState('');
  const [recordingData, setRecordingData] = useState([]);
  const [currentSample, setCurrentSample] = useState([]);
  const [activeInstrum, setActiveInstrum] = useState('');
  const [activeInstrumForAPI, setActiveInstrumForAPI] = useState('');
  const [lastModified, setLastModified] = useState('');

  useEffect(() => {
    /**
     * Fetches all sample data and sets state for last modified date, current sample, name, active instrument, recording data
     */
    const fetchSamples = async () => {
      try {
        const promise = await fetch(READ_SAMPLES_LINK);
        const data = await promise.json();
        const resolvedSamples = data.samples;
        if (resolvedSamples) {
          setSamples(resolvedSamples);
        }
        if (id) {
          const filteredForSample = resolvedSamples.filter(
            (elem) => elem.id === id
          );
          setLastModified(filteredForSample[0].datetime);
          setCurrentSample(filteredForSample[0]);
          setName(filteredForSample[0].name);
          setActiveInstrumForAPI(filteredForSample[0].type);
          setActiveInstrum(getInstrument(filteredForSample[0].type));
          setRecordingData(JSON.parse(filteredForSample[0].recording_data));
          setLastModified(getCorrectFormatDate(filteredForSample[0].datetime));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSamples();
  }, [id]);
  return {
    samples,
    recordingData,
    currentSample,
    activeInstrum,
    name,
    lastModified,
    activeInstrumForAPI,
    setName,
    setActiveInstrum,
    setRecordingData,
    setActiveInstrumForAPI,
  };
};

export default useFetchData;
