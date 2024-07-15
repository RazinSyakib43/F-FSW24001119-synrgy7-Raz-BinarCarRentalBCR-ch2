import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarList from './pages/dashboard/carList';
import SearchCarsPage from './pages/client-side/search-cars';

import { CarProvider } from './context/carContext';

function App() {
  return (
    <CarProvider>
      <Router>
        <div className="container mx-auto">
          <Routes>
            <Route path="/dashboard/car" element={<CarList />} />
            <Route path="/search" element={<SearchCarsPage />} />
          </Routes>
        </div>
      </Router>
    </CarProvider>
  );
}

export default App
