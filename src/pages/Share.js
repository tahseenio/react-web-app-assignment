import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShareOptions from '../components/ui/ShareOptions';

const Share = ({ samples }) => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [currentSample, setCurrentSample] = useState([]);
  const [lastModified, setLastModified] = useState('');

  useEffect(() => {
    const filteredForSample = samples.filter((elem) => elem.id === id);
    console.log(filteredForSample);
    setCurrentSample(filteredForSample[0]);
    setName(filteredForSample[0].name);

    const date = new Date(filteredForSample[0].datetime);
    const time = date
      .toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
      .replace(' PM', 'pm')
      .replace(' AM', 'am');

    const currDate = date
      .toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
      .replace(',', '');

    setLastModified(`${time} on ${currDate}`);
  }, [id, samples]);

  return (
    <main className='Home__container'>
      <div className='row'>
        <h1 className='home__title'>Share This Sample:</h1>
        <div className='SampleCard__container'>
          <div className='sample-card--top-wrapper'>
            <h2 className='sample-card__title'>{name}</h2>
            <p className='sample-card__date'>{lastModified}</p>
          </div>
          <div className='sample-card__button--wrapper'>
            <button className='button--outlined'>Preview</button>
          </div>
        </div>
        <ShareOptions title={'UQ Sport Courts, UQ'} />
        <ShareOptions title={'UQU Shops, UQ'} />
        <ShareOptions title={'Near UQ Lakes Station, UQ'} />
        <ShareOptions title={'General Purpose South, UQ'} />
        <ShareOptions title={'Great Court, UQ'} />
      </div>
    </main>
  );
};

export default Share;
