import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';
import { getTonePart, getToneInstrum } from '../data/instruments.js';
import { useToneContext } from '../context/ToneContext';

export const Sequencer = ({
  toneObject,
  toneTransport,
  letter,
  data,
  recordingData,
  setRecordingData,
  setPreviewing,
  activeInstrum,
}) => {
  let initialSequence = [];
  data.forEach((barIsEnabled, id) => {
    return initialSequence.push({
      barID: id + 1,
      barEnabled: barIsEnabled,
    });
  });

  const [sequence, setSequence] = useState(initialSequence);

  useEffect(() => {
    getTonePart(activeInstrum).clear();
    toneTransport.cancel();

    sequence
      .filter((bar) => bar.barEnabled)
      .forEach((bar) => {
        getTonePart(activeInstrum).add((bar.barID - 1) / 2, `${letter}3`);
      });

    toneTransport.schedule((time) => {
      setPreviewing(false);
      console.log('Preview stopped automatically.');
    }, 16 / 2);
  });

  return (
    <>
      <div className='edit__row'>
        <p className='edit__row--title'>{letter}</p>
        <ul className='edit__list'>
          <Bars
            activeInstrum={activeInstrum}
            letter={letter}
            sequence={sequence}
            setSequence={setSequence}
            toneObject={toneObject}
            recordingData={recordingData}
            setRecordingData={setRecordingData}
          />
        </ul>
      </div>
    </>
  );
};

function Bar({
  barEnabled,
  handleBarClick,
  el,
  id,
  letter,
  recordingData,
  setRecordingData,
}) {
  const [isActive, setIsActive] = useState(el);

  const handleBarChange = () => {
    setIsActive((state) => !state);
    const newRecordingData = recordingData.map((el) => {
      if (Object.keys(el)[0] === letter) {
        let rowArr = el[letter];
        rowArr[id] = !isActive;
        return { [letter]: rowArr };
      } else return el;
    });
    setRecordingData(newRecordingData);
  };

  const handleClick = () => {
    handleBarClick();
    handleBarChange();
  };

  function barSelected() {
    if (barEnabled) {
      return 'edit__musicitem--active';
    }
    return '';
  }

  return (
    <div
      className={`edit__musicitem ${barSelected()}`}
      onClick={handleClick}
    ></div>
  );
}

function Bars({
  sequence,
  setSequence,
  toneObject,
  recordingData,
  setRecordingData,
  letter,
  activeInstrum,
}) {
  function handleBarClick(bar) {
    const now = toneObject.now();
    getToneInstrum(activeInstrum).triggerAttackRelease(`${letter}3`, '8n', now);
    let filteredSequence = sequence.filter((_bar) => _bar.barID !== bar.barID);
    setSequence([...filteredSequence, { ...bar, barEnabled: !bar.barEnabled }]);
  }

  function sortSequence(bar, otherBar) {
    if (bar.barID < otherBar.barID) {
      return -1;
    }
    if (bar.barID > otherBar.barID) {
      return 1;
    }
    return 0;
  }

  return sequence
    .sort(sortSequence)
    .map((bar, id) => (
      <Bar
        key={bar.barID}
        el={bar.barEnabled}
        {...bar}
        handleBarClick={() => handleBarClick(bar)}
        id={id}
        letter={letter}
        recordingData={recordingData}
        setRecordingData={setRecordingData}
      />
    ));
}

export function Preview({
  previewing,
  setPreviewing,
  toneObject,
  toneTransport,
}) {
  function handleButtonClick() {
    toneObject.start();
    toneTransport.stop();

    if (previewing) {
      setPreviewing(false);
      console.log('Preview stopped manually.');
    } else {
      setPreviewing(true);
      console.log('Preview started.');
      toneTransport.start();
    }

    toneTransport.schedule((time) => {
      setPreviewing(false);
      console.log('Preview stopped automatically.');
    }, 16 / 2);
  }

  return (
    <button className='button--outlined' onClick={handleButtonClick}>
      {previewing ? 'Stop Previewing' : 'Preview'}
    </button>
  );
}

const Edit = () => {
  const { toneObject, toneTransport, tonePart, previewing, setPreviewing } =
    useToneContext();
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
      await fetch(
        `http://wmp.interaction.courses/api/v1/?apiKey=1fSDtAex&mode=update&endpoint=samples&sampleType=${activeInstrumForAPI}&sampleName=${name}&id=${id}`,
        options
      );
    } catch (err) {
      console.log(err);
    }
    // console.log(
    //   `NAME: ${name}, TYPE: ${activeInstrum}, FOR API TYPE: ${activeInstrumForAPI}, id: ${id}`
    // );
    // console.log(JSON.stringify(recordingData));
  };

  // const handlePlayMusic = () => {
  //   toneObject.start();
  //   toneTransport.stop();
  // };

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
            activeInstrum={activeInstrum}
            toneObject={toneObject}
            toneTransport={toneTransport}
            tonePart={tonePart}
            letter={Object.keys(elem)[0]}
            data={elem[`${Object.keys(elem)[0]}`]}
            recordingData={recordingData}
            setRecordingData={setRecordingData}
            previewing={previewing}
            setPreviewing={setPreviewing}
          />
        ))}
      </div>
    </main>
  );
};

export default Edit;
