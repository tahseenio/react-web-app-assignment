import React, { useState } from 'react';

const MusicLetter = ({ el, id, letter, recordingData, setRecordingData }) => {
  const [isActive, setIsActive] = useState(el);

  const handleClick = () => {
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

  return (
    <li
      className={`edit__musicitem ${isActive ? 'edit__musicitem--active' : ''}`}
      onClick={() => handleClick()}
    />
  );
};

export default MusicLetter;
