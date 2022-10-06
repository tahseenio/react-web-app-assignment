import { useState } from 'react';
import { samplePayload } from '../data/samplePayload.js';
import { useNavigate } from 'react-router-dom';
import { useToneContext } from '../context/ToneContext.js';
import { Preview, Sequencer } from './Edit.jsx';

const Create = () => {
  const { toneObject, toneTransport, tonePart, previewing, setPreviewing } =
    useToneContext();
  const navigate = useNavigate();
  const instruments = ['Piano', 'French Horn', 'Guitar', 'Drums'];

  // const [samples, setSamples] = useState([]);
  const [name, setName] = useState('');

  const [recordingData, setRecordingData] = useState(samplePayload);
  // const [currentSample, setCurrentSample] = useState([]);
  const [activeInstrum, setActiveInstrum] = useState('Piano');
  const [activeInstrumForAPI, setActiveInstrumForAPI] = useState('piano');

  const handleInstrumChange = (el) => {
    setActiveInstrum(el);
    setActiveInstrumForAPI(el.split(' ').join('_').toLowerCase());
  };

  const handleSaveChanges = async () => {
    const options = {
      method: 'POST',
      body: `${JSON.stringify(recordingData)}`,
    };
    try {
      await fetch(
        `http://wmp.interaction.courses/api/v1/?apiKey=1fSDtAex&mode=create&endpoint=samples&sampleType=${activeInstrumForAPI}&sampleName=${name}`,
        options
      );
    } catch (err) {
      console.log(err);
    } finally {
      navigate('/');
    }
  };

  return (
    <main className='Home__container'>
      <div className='row'>
        <h1 className='home__title'>Create a new sample:</h1>
        <div className='Edit__container'>
          <input
            className='edit__input'
            defaultValue={'Enter a name'}
            onChange={(e) => setName(e.target.value)}
          />
          <div className='sample-card__button--wrapper'>
            <Preview
              previewing={previewing}
              setPreviewing={setPreviewing}
              toneObject={toneObject}
              toneTransport={toneTransport}
            />
            <button
              className='button button--solid'
              onClick={handleSaveChanges}
            >
              Save
            </button>
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
                onClick={() => handleInstrumChange(el)}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>
        {recordingData.map((elem, id) => (
          <Sequencer
            key={id}
            toneObject={toneObject}
            toneTransport={toneTransport}
            tonePart={tonePart}
            letter={Object.keys(elem)[0]}
            data={elem[`${Object.keys(elem)[0]}`]}
            recordingData={recordingData}
            setRecordingData={setRecordingData}
            activeInstrum={activeInstrum}
          />
        ))}
      </div>
    </main>
  );
};

export default Create;
