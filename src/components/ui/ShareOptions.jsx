import { useEffect, useState } from 'react';

/**
 * This is the share location component which allows the user to share or unshare the sample to whatever location
 * @property {string} title Name of the location being shared to
 * @property {number} sampleID The sample ID
 * @property {number} locID The location ID
 * @property {Array} sharedLocation An array of all locations currently shared to
 */
const ShareOptions = ({ title, sampleID, locID, sharedLocations }) => {
  const [isShared, setIsShared] = useState(false);
  const [checkSharing, setCheckSharing] = useState([]);
  useEffect(() => {
    setCheckSharing(
      sharedLocations.filter(
        (el) => el.samples_id === sampleID && el.locations_id === locID
      )
    );

    if (checkSharing.length >= 1) {
      setIsShared(true);
    }
  }, [sharedLocations, locID, sampleID, checkSharing.length]);

  /**
   * Creates association between a sampled and a location using the API
   * @async
   */
  const handleWillShareLocation = async () => {
    if (isShared) return;
    await fetch(
      `http://wmp.interaction.courses/api/v1/?apiKey=1fSDtAex&mode=create&endpoint=samples_to_locations&sampleID=${sampleID}&locationID=${locID}`
    );
    setIsShared(true);
  };

  /**
   * Deletes association between a sampled and a location using the API
   * @async
   */
  const handleDeleteShareLocation = async () => {
    if (!isShared) return;
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
