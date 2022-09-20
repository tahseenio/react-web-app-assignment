// TODO: All preview buttons should change to "Stop Previewing when clicked"
// TODO: get createcard working
// TODO: get sharing location working
// TODO: get rows implemented with tone.js
import React, { useEffect, useState } from 'react';
import CreateCard from '../components/CreateCard';
import SampleCard from '../components/SampleCard';
import useFetchData from '../hooks/useFetchData';
import { synth, guitar } from '../data/instruments.js';

const Sequencer = ({ toneObject, toneTransport, tonePart }) => {
  let initialSequence = [];
  for (let bar = 1; bar <= 16; bar++) {
    initialSequence.push({
      barID: bar,
      barEnabled: false,
      //barEnabled: bar % 2 == 1 ? true : false, // Pre-fill every second bar for testing
    });
  }
  const [sequence, setSequence] = useState(initialSequence);

  const initialPreviewing = false;
  const [previewing, setPreviewing] = useState(initialPreviewing);

  useEffect(() => {
    tonePart.clear();
    toneTransport.cancel();

    sequence
      .filter((bar) => bar.barEnabled)
      .forEach((bar) => {
        tonePart.add((bar.barID - 1) / 2, 'C3'); // Plays an C note on 3rd octave 0.5s apart
      });

    toneTransport.schedule((time) => {
      setPreviewing(false);
      console.log('Preview stopped automatically.');
    }, 16 / 2);
  });

  return (
    <>
      <div className='sequencer'>
        <Bars
          sequence={sequence}
          setSequence={setSequence}
          toneObject={toneObject}
        />
      </div>
      <h4>Play Multiple Bars From Sequence</h4>
      <p>
        <Preview
          previewing={previewing}
          setPreviewing={setPreviewing}
          toneObject={toneObject}
          toneTransport={toneTransport}
        />
      </p>
    </>
  );
};

function Bar({ barID, barEnabled, handleBarClick }) {
  function barSelected() {
    if (barEnabled) {
      return 'selected';
    }
    return '';
  }

  return (
    <div
      className={`bar bar-${barID} ${barSelected()}`}
      onClick={handleBarClick}
    >
      {barID}
    </div>
  );
}

function Bars({ sequence, setSequence, toneObject }) {
  function handleBarClick(bar) {
    const now = toneObject.now();
    guitar.triggerAttackRelease('C3', '8n', now);
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
    .map((bar) => (
      <Bar
        key={bar.barID}
        {...bar}
        handleBarClick={() => handleBarClick(bar)}
      />
    ));
}

function Preview({ previewing, setPreviewing, toneObject, toneTransport }) {
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
  }

  return (
    <button onClick={handleButtonClick}>
      {previewing ? 'Stop Previewing' : 'Preview'}
    </button>
  );
}

const Home = ({ toneObject, toneTransport, tonePart }) => {
  const { samples } = useFetchData();

  const playMusic = () => {
    const now = toneObject.now();
    const sequence = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4'];
    sequence.forEach((note, time) => {
      synth.triggerAttackRelease(note, '8n', now + time / 2); // Plays 0.5s apart
    });
  };
  return (
    <main className='Home__container'>
      <div className='row'>
        <h1 className='home__title'>Samples You've Created</h1>
        <div className='Cards'>
          {samples.map((elem) => (
            <SampleCard
              title={elem.name}
              key={elem.id}
              id={elem.id}
              recordingData={JSON.parse(elem.recording_data)}
              lastModified={elem.datetime}
              toneObject={toneObject}
            />
          ))}
        </div>
        <CreateCard />
        <button onClick={playMusic}>Test</button>
        <h3>Synth Sequencer</h3>
        <Sequencer
          toneObject={toneObject}
          toneTransport={toneTransport}
          tonePart={tonePart}
        />
      </div>
    </main>
  );
};

export default Home;
