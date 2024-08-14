import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Home from "./pages/home";
import {ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer/>
    </div>
    
  );
}

export default App;
