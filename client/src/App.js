import './App.css';
import { useContext } from 'react';
import { AuthContext } from './authContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Customers from './pages/Customers';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateCustomer from './pages/CreateCustomer';

function App() {
  const { user } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Login title="Login to Create" />;
    } else {
      return children;
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<ProtectedRoute><CreateCustomer /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
