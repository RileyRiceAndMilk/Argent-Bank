import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import './App.css';
import HomePage from './pages/HomePage';
import Sign from './pages/Sign';
import UserPage from './pages/UserPage';
import TransactionsPage from './pages/TransactionsPage';
import EditNamePage from './pages/EditNamePage';

function App() {
  return (
    <Router> 
      <Routes>
        <Route path="/" element={<HomePage/>}/> 
        <Route path="/Sign" element={<Sign />} /> 
        <Route path="/UserPage" element={<UserPage />} /> 
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/edit-name" element={<EditNamePage />} />
      </Routes>
    </Router>
  );
}

export default App;


