import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Share from './pages/Share';

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
        <footer />
      </Router>
    </div>
  );
}

export default App;
