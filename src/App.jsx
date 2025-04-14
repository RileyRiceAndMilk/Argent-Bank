import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import Sign from './pages/Sign';
import UserPage from './pages/UserPage';
import TransactionsCheckingPage from './pages/TransactionsCheckingPage';
import TransactionsSavingsPage from './pages/TransactionsSavingsPage';
import TransactionsCreditPage from './pages/TransactionsCreditPage';
import EditNamePage from './pages/EditNamePage';
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/transactions-checking" element={<TransactionsCheckingPage />} />
        <Route path="/transactions-savings" element={<TransactionsSavingsPage />} />
        <Route path="/transactions-credit" element={<TransactionsCreditPage />} />
        <Route path="/edit-name" element={<EditNamePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;




