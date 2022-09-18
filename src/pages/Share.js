import { useParams } from 'react-router-dom';
import ShareOptions from '../components/ui/ShareOptions';

const Home = () => {
  const { id } = useParams();

  return (
    <main className='Home__container'>
      <div className='row'>
        <h1 className='home__title'>Share This Sample:</h1>
        <div className='SampleCard__container'>
          <div className='sample-card--top-wrapper'>
            <h2 className='sample-card__title'>{id}</h2>
            <p className='sample-card__date'>7.40pm on 25 August 2022</p>
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

export default Home;
