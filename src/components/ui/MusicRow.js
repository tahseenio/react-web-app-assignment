const MusicRow = ({ letter, data }) => {
  return (
    <div className='edit__row'>
      <p className='edit__row--title'>{letter}</p>
      <ul className='edit__list'>
        {data.map((el, id) => (
          <li
            className={`edit__musicitem ${el ? 'edit__musicitem--active' : ''}`}
            key={id}
          />
        ))}
      </ul>
    </div>
  );
};

export default MusicRow;
