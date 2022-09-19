import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Share from './pages/Share';
import Footer from './components/Footer';

// const API_LINK = 'http://wmp.interaction.courses/api/v1/';

// const LOCATIONS_LINK = `http://wmp.interaction.courses/api/v1/?apiKey=${API_KEY}&mode=read&endpoint=locations`;
// working

// nothing available yet since I havent posted anything

// const SEND_LINK = `http://wmp.interaction.courses/api/v1/?apiKey=${API_KEY}&mode=create&endpoint=samples&sampleType=${SAMPLE_TYPE}&sampleName=${SAMPLE_NAME}`;
// const SAMPLE_TYPE = 'piano';
// const SAMPLE_NAME = 'Testerino';
// SAMPLE_TYPE can be piano, french_horn, guitar, drums
// const SAMPLE_TYPES = ['piano', 'french_horn', 'guitar', 'drums'];

// SAMPLE_NAME can be name of song of type string

// body of request needs to be of similar JSON object. Make sure to JSON parse and stringify when sending payload
// Example can be seen in fakeData.js

// GET to receive AND POST to send data

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/share/:id' element={<Share />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
