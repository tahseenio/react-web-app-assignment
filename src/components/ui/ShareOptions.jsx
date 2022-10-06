import { useEffect } from 'react';
import { useState } from 'react';

const ShareOptions = ({ title, sampleID, locID, sharedLocations }) => {
  const [isShared, setIsShared] = useState(false);
  const [checkSharing, setCheckSharing] = useState([]);
  useEffect(() => {
    // console.log(sharedLocations);
    setCheckSharing(
      sharedLocations.filter(
        (el) => el.samples_id === sampleID && el.locations_id === locID
      )
    );

    if (checkSharing.length >= 1) {
      setIsShared(true);
    }
    // console.log('FLTERING for', locID, isFoundSharing);
  }, [sharedLocations, locID, sampleID, checkSharing.length]);

  const handleWillShareLocation = async () => {
    if (isShared) return;
    await fetch(
      `http://wmp.interaction.courses/api/v1/?apiKey=1fSDtAex&mode=create&endpoint=samples_to_locations&sampleID=${sampleID}&locationID=${locID}`
    );
    setIsShared(true);
  };

  const handleDeleteShareLocation = async () => {
    if (!isShared) return;
    console.log('WANT TO DELETE ENDPOINT:', checkSharing[0].id);
    await fetch(
      `http://wmp.interaction.courses/api/v1/?apiKey=1fSDtAex&mode=delete&endpoint=samples_to_locations&id=${checkSharing[0].id}`
    );
    setIsShared(false);
  };

  return (
    <div className='share__row'>
      <p className='share__row--title'>{title}</p>
      <ul className='share__list'>
        <li
          className={`share__listitem ${
            !isShared ? 'share__listitem--active' : ''
          }`}
          onClick={handleDeleteShareLocation}
        >
          Not Shared
        </li>
        <li
          className={`share__listitem ${
            isShared ? 'share__listitem--active' : ''
          }`}
          onClick={handleWillShareLocation}
        >
          Shared
        </li>
      </ul>
    </div>
  );
};

export default ShareOptions;
