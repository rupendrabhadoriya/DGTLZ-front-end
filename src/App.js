import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import Presale from "./components/Presale/Presale";
import Footer from "./components/Footer/Footer";
import Popup from "./components/Popup/Popup";
import Home from './components/Home/Home';
import Profile from './components/Presale/Profile/profile';
import Account from './components/Account/Account';
import Register from './components/Account/signup';
import Verify from './components/Presale/Profile/verify';
import Dashboard from './components/Dashboard/dashboard';
import Plan from './components/Dashboard/Plan';

import 'dotenv/config';

function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/presale" element={<Presale />} />
            <Route path="/login" element={<Account />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plan" element={<Plan />} />
        </Routes>
        <Footer />
        <Popup />
    </div>
  );
}

export default App;
