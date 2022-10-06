import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import arrow from '../assets/arrow.png';

const Header = () => {
  let location = useLocation();

  return (
    <header>
      <div className='header--left'>
        {location.pathname !== '/' ? (
          <Link to='/'>
            <img src={arrow} alt='back arrow' className='arrowImg' />
          </Link>
        ) : null}
        <h1>OgCiSum</h1>
      </div>
      <p>{'Create & Share Sample, Listen in Mobile App!'}</p>
    </header>
  );
};

export default Header;
