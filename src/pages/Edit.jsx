// TODO: make music buttons actually click and work

import { useParams } from 'react-router-dom';
import MusicRow from '../components/ui/MusicRow';
import useFetchData from '../hooks/useFetchData';

const Edit = () => {
  const { id } = useParams();
  const instruments = ['Piano', 'French Horn', 'Guitar', 'Drums'];

  const {
    name,
    recordingData,
    activeInstrum,
    setActiveInstrum,
    setName,
    setRecordingData,
    activeInstrumForAPI,
    setActiveInstrumForAPI,
  } = useFetchData(id);

  const handleInstrumChange = (el) => {
    setActiveInstrum(el);
    setActiveInstrumForAPI(el.split(' ').join('_').toLowerCase());
  };

  const handleSaveChanges = async () => {
    // const options = {
    //   method: 'POST',
    //   body: '[{"B": [true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false]}, {"A": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]}, {"G": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]}, {"F": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]}, {"E": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]}, {"D": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]}, {"C": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]}]'
    // };

    // fetch('http://wmp.interaction.courses/api/v1/?apiKey=1fSDtAex&mode=update&endpoint=samples&sampleType=piano&sampleName=Test2Updated&id=248', options)
    //   .then(response => response.json())
    //   .then(response => console.log(response))
    //   .catch(err => console.error(err));

    console.log(
      `NAME: ${name}, TYPE: ${activeInstrum}, FOR API TYPE: ${activeInstrumForAPI}, id: ${id}`
    );
    console.log(JSON.stringify(recordingData));
  };

  return (
    <main className='Home__container'>
      <div className='row'>
        <h1 className='home__title'>Editing This Sample:</h1>
        <div className='Edit__container'>
          <input
            className='edit__input'
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className='sample-card__button--wrapper'>
            <button className='button--outlined'>Preview</button>
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
          <MusicRow
            key={id}
            letter={Object.keys(elem)[0]}
            data={elem[`${Object.keys(elem)[0]}`]}
            recordingData={recordingData}
            setRecordingData={setRecordingData}
          />
        ))}
        <pre>{JSON.stringify(recordingData, null, 2)}</pre>
      </div>
    </main>
  );
};

export default Edit;
