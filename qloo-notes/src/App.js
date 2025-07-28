import './App.css';
import { Routes, Route } from 'react-router-dom';

// Import your pages and the global sidebar
import Home from './pages/home';
import About from './pages/about'; // We'll keep this for the example
import History from './pages/history'; // <-- Import the new History page
import { Sidebar } from './components/sidebar'; // <-- Import the Sidebar
import { NotFound } from './components/page_not_found';

function App() {
  return (
    <div className="App"> 
      <Sidebar /> 

      <div className="page-content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/history" element={<History />} /> 
          <Route path='/*' element={<NotFound/>}/> 
        </Routes>
      </div>
    </div>
  );
}

export default App;
