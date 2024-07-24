import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Auth pages
import Login from './pages/auth/login';

// // Client side pages
import Homepage from './pages/client-side/homepage';
import SearchCarsPage from './pages/client-side/search-cars';

// Dashboard pages
import DashboardMain from './pages/dashboard/dashboardHome';
import CarList from './pages/dashboard/carList';
import AddCar from './pages/dashboard/addCar';

import Protected from './components/auth/protected';
import { AuthProvider } from './hooks/useAuth';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/cars" element={<SearchCarsPage />} />
          <Route path="/dashboard" element={<DashboardMain />} />
          <Route path="/dashboard/cars" element={<Protected><CarList /></Protected>} />
          <Route path="/dashboard/cars/add-car" element={<Protected><AddCar /></Protected>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
