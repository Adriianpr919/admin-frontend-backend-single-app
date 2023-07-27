import React from 'react';
///////////////////////////////////////////////////////////////////////////////////////////////
import './App.css';
import './NewApp.css';
///////////////////////////////////////////////////////////////////////////////////////////////
import Home from '../Home/Home';
///////////////////////////////////////////////////////////////////////////////////////////////
import { ToastContainer } from 'react-toastify';
///////////////////////////////////////////////////////////////////////////////////////////////
import 'react-toastify/dist/ReactToastify.css';
///////////////////////////////////////////////////////////////////////////////////////////////

function App() {
  return (
    <div className="app">
      <ToastContainer position='bottom-center' limit={1} />
      <Home />
    </div>
  );
};

export default App;