import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Share from './pages/Share';
import Footer from './components/Footer';
import Create from './pages/Create';
import ToneContextProvider from './context/ToneContext';

function App() {
  return (
    <ToneContextProvider>
      <div className='App'>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/share/:id' element={<Share />} />
            <Route path='/create' element={<Create />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </ToneContextProvider>
  );
}

export default App;
