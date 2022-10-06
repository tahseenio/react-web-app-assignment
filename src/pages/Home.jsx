import CreateCard from '../components/CreateCard';
import SampleCard from '../components/SampleCard';
import useFetchData from '../hooks/useFetchData';

const Home = () => {
  const { samples } = useFetchData();
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
            />
          ))}
        </div>
        <CreateCard />
      </div>
    </main>
  );
};

export default Home;
