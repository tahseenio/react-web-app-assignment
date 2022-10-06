import { useParams } from 'react-router-dom';
import ShareOptions from '../components/ui/ShareOptions';
import useFetchData from '../hooks/useFetchData';
import useFetchLocations from '../hooks/useFetchLocations';
import useReadShareLocation from '../hooks/useReadShareLocation';
// const { sharedLocations } = useReadShareLocation(id);

const Share = () => {
  const { id } = useParams();
  const { name, lastModified } = useFetchData(id);
  const { locations, sharedLocations } = useFetchLocations();

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
        {locations.map((elem) => (
          <ShareOptions
            sampleID={id}
            locID={elem.id}
            title={elem.location}
            key={elem.id}
            sharedLocations={sharedLocations}
          />
        ))}
      </div>
    </main>
  );
};

export default Share;
