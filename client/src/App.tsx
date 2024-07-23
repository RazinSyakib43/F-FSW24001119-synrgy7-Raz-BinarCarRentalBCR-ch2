import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// CLient Pages
import SearchCarsPage from './pages/client-side/search-cars';
import Homepage from './pages/client-side/homepage';

// Dashboard Pages
import CarList from './pages/dashboard/carList';
import AddCar from './pages/dashboard/addCar';

import { CarProvider } from './context/carContext';

function App() {
  return (
    <CarProvider>
      <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cars" element={<SearchCarsPage />} />

            <Route path="/dashboard/cars" element={<CarList />} />
            <Route path="/dashboard/car/add-car" element={<AddCar />} />
          </Routes>
      </Router>
    </CarProvider>
  );
}

export default App
