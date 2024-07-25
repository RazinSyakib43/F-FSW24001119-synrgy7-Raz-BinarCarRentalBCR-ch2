import './App.css'

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { LoginPage } from './pages/auth/login';

// CLient Pages
import SearchCarsPage from './pages/client-side/search-cars';
import Homepage from './pages/client-side/homepage';

// Dashboard Pages
import CarList from './pages/dashboard/carList';
import AddCar from './pages/dashboard/addCar';

import { CarProvider } from './context/carContext';
import { AuthProvider } from './context/authContext';
import { useAuth } from './hooks/useAuth';

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/auth/login" />;
};

function App() {
  return (
    <AuthProvider>
      <CarProvider>
        <Router>
          <Routes>
            <Route path='/auth/login' element={<LoginPage />} />

            <Route path="/" element={<Homepage />} />
            <Route path="/cars" element={<SearchCarsPage />} />

            <Route path="/dashboard/cars" element={
              <PrivateRoute element={
                <CarList />
              } />
            } />
            <Route path="/dashboard/cars/add-car" element={
              <PrivateRoute element={
                <AddCar />
              } />
            } />
          </Routes>
        </Router>
      </CarProvider>
    </AuthProvider>
  );
}

export default App
