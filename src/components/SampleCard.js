// TODO: review all commented code

// import { useState } from 'react';
import { Link } from 'react-router-dom';

const SampleCard = ({ title, lastModified, id, isInitiallyShared = false }) => {
  // const [isShared, setIsShared] = useState(isInitiallyShared);

  const date = new Date(lastModified);

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

  const lastDate = `${time} on ${currDate}`;

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

        <button className='button--outlined'>Preview</button>
        <Link to={`/edit/${id}`}>
          <button className='button button--solid'>Edit</button>
        </Link>
      </div>
    </div>
  );
};

export default SampleCard;
