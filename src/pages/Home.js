// TODO: All preview buttons should change to "Stop Previewing when clicked"

import React from 'react';
import CreateCard from '../components/CreateCard';
import SampleCard from '../components/SampleCard';

const Home = () => {
  return (
    <main className='Home__container'>
      <div className='row'>
        <h1 className='home__title'>Samples You've Created</h1>
        <div className='Cards'>
          <SampleCard title={'Hellz Wind Staff'} />
          <SampleCard title={'C.R.E.A.M'} isInitiallyShared={true} />
          <SampleCard title={'A Better Tommorow'} />
        </div>
        <CreateCard />
      </div>
    </main>
  );
};

export default Home;
