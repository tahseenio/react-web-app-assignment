import { useParams } from 'react-router-dom';
import ShareOptions from '../components/ui/ShareOptions';
import useFetchData from '../hooks/useFetchData';
import useFetchLocations from '../hooks/useFetchLocations';

const Share = () => {
  const { id } = useParams();
  const { name, lastModified } = useFetchData(id);
  const { locations } = useFetchLocations();
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
        {locations.map((elem) =>
          elem.suburb === 'St Lucia' ? (
            <ShareOptions title={elem.location} key={elem.id} />
          ) : null
        )}
      </div>
    </main>
  );
};

export default Share;
