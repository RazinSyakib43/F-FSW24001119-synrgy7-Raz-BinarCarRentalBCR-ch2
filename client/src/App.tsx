import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarList from './pages/dashboard/carList';

import { CarProvider } from './context/carContext';

function App() {
  return (
    <CarProvider>
      <Router>
        <div className="container mx-auto">
          <Routes>
            <Route path="/car" element={<CarList />} />
          </Routes>
        </div>
      </Router>
    </CarProvider>
  );
}

export default App
