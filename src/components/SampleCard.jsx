// TODO: review all commented code

import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCorrectFormatDate } from '../hooks/useFetchData';

const SampleCard = ({ title, lastModified, id, recordingData }) => {
  const [isShared, setIsShared] = useState(false);
  const lastDate = getCorrectFormatDate(lastModified);
  const [sharedLocations, setSharedLocations] = useState([]);
  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const promise = await fetch(
          'http://wmp.interaction.courses/api/v1/?apiKey=1fSDtAex&mode=read&endpoint=samples_to_locations'
        );
        const data = await promise.json();
        setSharedLocations(data.samples_to_locations ?? []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSamples();
  }, []);

  useEffect(() => {
    // console.log(sharedLocations);
    if (sharedLocations.some((el) => el.samples_id === id)) {
      setIsShared(true);
    } else {
      setIsShared(false);
    }
  }, [sharedLocations]);

  const handlePlay = () => {
    console.log(recordingData);
  };

  return (
    <div className='SampleCard__container'>
      <div className='sample-card--top-wrapper'>
        <h2 className='sample-card__title'>{title}</h2>
        <p className='sample-card__date'>{lastDate}</p>
      </div>
      <div className='sample-card__button--wrapper'>
        <Link to={`/share/${id}`}>
          {isShared ? (
            <button className='button--outlined button--shared'>Shared</button>
          ) : (
            <button className='button--outlined'>Share</button>
          )}
        </Link>
        <button className='button--outlined' onClick={handlePlay}>
          Preview
        </button>
        <Link to={`/edit/${id}`}>
          <button className='button button--solid'>Edit</button>
        </Link>
      </div>
    </div>
  );
};

export default SampleCard;
