import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ComplaintForm from './components/ComplaintForm/ComplaintForm';
import ComplaintsList from './components/ComplaintsList/ComplaintsList';


function App() {
  return (
    <div>
      <ToastContainer />
      {/* <Navbar /> */}
      
      <Router>
        <Routes>
          
          <Route path="/" exact element={<ComplaintForm />} />
          <Route path="/viewComplaints" element={<ComplaintsList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
