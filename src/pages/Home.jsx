// TODO
//  make create sample button work
//  figure out how to add different tones for each music letter
//  how to make preview buttons work for all pages such as home, share and edit pages
//  make share page work

import CreateCard from '../components/CreateCard';
import SampleCard from '../components/SampleCard';
import useFetchData from '../hooks/useFetchData';

const Home = ({ toneObject, toneTransport, tonePart }) => {
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
              toneObject={toneObject}
            />
          ))}
        </div>
        <CreateCard />
      </div>
    </main>
  );
};

export default Home;
