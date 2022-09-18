import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MusicRow from '../components/ui/MusicRow';
import { MusicalRows } from '../data';

const Home = () => {
  const [activeInstrum, setActiveInstrum] = useState('Drums');
  const instruments = ['Piano', 'French Horn', 'Guitar', 'Drums'];

  const { id } = useParams();

  return (
    <main className='Home__container'>
      <div className='row'>
        <h1 className='home__title'>Editing This Sample:</h1>
        <div className='Edit__container'>
          <input className='edit__input' defaultValue={id} />
          <div className='sample-card__button--wrapper'>
            <button className='button--outlined'>Preview</button>
            <button className='button button--solid'>Save</button>
          </div>
        </div>
        <div className='edit__row'>
          <p className='edit__row--title'>Type</p>
          <ul className='edit__list'>
            {instruments.map((el, id) => (
              <li
                className={`edit__listitem ${
                  activeInstrum === el ? 'edit__listitem--active' : ''
                }`}
                key={id}
                onClick={() => setActiveInstrum(el)}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>
        {MusicalRows.map((elem, id) => (
          <MusicRow
            key={id}
            letter={Object.keys(elem)[0]}
            data={elem[`${Object.keys(elem)[0]}`]}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
