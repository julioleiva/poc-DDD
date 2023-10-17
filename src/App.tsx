import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import AppsPage from './pages/AppsPage/AppsPage';
import { ToastContainer } from "react-toastify";
import ApplicationDetail from './pages/AppsDetail';


import './styles/index.css';

const App = () => {
  return (
    
    <AppProvider>
      <ToastContainer autoClose={5000} />
      <Router>
        <Routes>
          <Route path="/" element={<AppsPage />} />
          <Route path="/applications/:id" element={<ApplicationDetail />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
