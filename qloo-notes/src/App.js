import './App.css';
import { Routes, Route } from 'react-router-dom';
import { cardData } from './resources/card_details';

import Home from './pages/home';
import About from './pages/about'; 
import History from './pages/history'; 

import { Sidebar } from './components/sidebar'; // 
import { NotFound } from './components/page_not_found';
import ElementRenderer from './pages/ElementRenderer';

function App() {
  return (
    <div className="App"> 
      <Sidebar /> 

      <div className="page-content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/history" element={<History />} /> 
          <Route path="/elements/:id" element={<ElementRenderer items={cardData}/>}/>
          <Route path='/*' element={<NotFound/>}/> 
        </Routes>
      </div>
    </div>
  );
}

export default App;
