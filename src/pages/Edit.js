// TODO: make music buttons actually click and work

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MusicRow from '../components/ui/MusicRow';
import useFetchData from '../hooks/useFetchData';

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
  }
};
const Edit = () => {
  const { id } = useParams();
  const instruments = ['Piano', 'French Horn', 'Guitar', 'Drums'];

  const { samples, name, recordingData, activeInstrum, currentSample } =
    useFetchData(id);

  // const [currentSample, setCurrentSample] = useState([]);
  const [activeInstrum1, setActiveInstrum1] = useState('');
  // const [name, setName] = useState('');
  // const [recordingData, setRecordingData] = useState([]);

  return (
    <main className='Home__container'>
      <div className='row'>
        <h1 className='home__title'>Editing This Sample:</h1>
        <div className='Edit__container'>
          <input className='edit__input' defaultValue={name} />
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
                onClick={() => setActiveInstrum1(el)}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>
        {recordingData.map((elem, id) => (
          <MusicRow
            key={id}
            letter={Object.keys(elem)[0]}
            data={elem[`${Object.keys(elem)[0]}`]}
          />
        ))}
        {/* <pre>{JSON.stringify(currentSample, null, 2)}</pre>
        <pre>{JSON.stringify(recordingData, null, 2)}</pre> */}
      </div>
    </main>
  );
};

export default Edit;
