import { useState } from 'react';

const ShareOptions = ({ title }) => {
  const [isShared, setIsShared] = useState(false);

  return (
    <div className='share__row'>
      <p className='share__row--title'>{title}</p>
      <ul className='share__list'>
        <li
          className={`share__listitem ${
            !isShared ? 'share__listitem--active' : ''
          }`}
          onClick={() => setIsShared(false)}
        >
          Not Shared
        </li>
        <li
          className={`share__listitem ${
            isShared ? 'share__listitem--active' : ''
          }`}
          onClick={() => setIsShared(true)}
        >
          Shared
        </li>
      </ul>
    </div>
  );
};

export default ShareOptions;
