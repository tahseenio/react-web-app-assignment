import React from 'react';

const SampleCard = ({ title, isShared = false }) => {
  const date = new Date();

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
      <div>
        <h2 className='sample-card__title'>{title}</h2>
        <p className='sample-card__date'>{lastDate}</p>
      </div>
      <div className='sample-card__button--wrapper'>
        {isShared ? (
          <button className='button--outlined button--shared'>Shared</button>
        ) : (
          <button className='button--outlined'>Share</button>
        )}

        <button className='button--outlined'>Preview</button>
        <button className='button button--solid'>Edit</button>
      </div>
    </div>
  );
};

export default SampleCard;
