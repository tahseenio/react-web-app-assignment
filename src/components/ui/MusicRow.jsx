import MusicLetter from './MusicLetter';

const MusicRow = ({ letter, data, recordingData, setRecordingData }) => {
  return (
    <div className='edit__row'>
      <p className='edit__row--title'>{letter}</p>
      <ul className='edit__list'>
        {data.map((el, id) => (
          <MusicLetter
            el={el}
            key={id}
            id={id}
            letter={letter}
            recordingData={recordingData}
            setRecordingData={setRecordingData}
          />
        ))}
      </ul>
    </div>
  );
};

export default MusicRow;
