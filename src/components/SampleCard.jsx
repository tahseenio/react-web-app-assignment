// TODO: review all commented code

import { Link } from 'react-router-dom';
import { getCorrectFormatDate } from '../hooks/useFetchData';

const SampleCard = ({ title, lastModified, id, recordingData }) => {
  const lastDate = getCorrectFormatDate(lastModified);

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
        {/* {isShared ? (
          <button className='button--outlined button--shared'>Shared</button>
        ) : ( */}
        <Link to={`/share/${id}`}>
          <button
            className='button--outlined'
            // onClick={() => setIsShared(true)}
          >
            Share
          </button>
        </Link>
        {/* )} */}

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
