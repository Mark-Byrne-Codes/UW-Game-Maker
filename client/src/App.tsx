import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />

      <h1>Ultimate Werewolf Game Maker!</h1>
      <Routes>
        <Route path="/" element={<main></main>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;