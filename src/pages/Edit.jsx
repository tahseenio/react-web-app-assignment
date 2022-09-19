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
    const options = {
      method: 'POST',
      body: `${JSON.stringify(recordingData)}`,
    };
    try {
      const promise = await fetch(
        `http://wmp.interaction.courses/api/v1/?apiKey=1fSDtAex&mode=update&endpoint=samples&sampleType=${activeInstrumForAPI}&sampleName=${name}&id=${id}`,
        options
      );
      const response = await promise.json();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    // console.log(
    //   `NAME: ${name}, TYPE: ${activeInstrum}, FOR API TYPE: ${activeInstrumForAPI}, id: ${id}`
    // );
    // console.log(JSON.stringify(recordingData));
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
      </div>
    </main>
  );
};

export default Edit;
