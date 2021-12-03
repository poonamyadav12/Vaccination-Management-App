import React, { Suspense } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Clinic from "./components/Clinic/Clinic";

const LandingPage = React.lazy(() => import('./components/LandingPage/LandingPage'));
const Signup = React.lazy(() => import('./components/Signup/Signup'));
const Login = React.lazy(() => import('./components/Login/Login'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={
        <div className='centered'>Loading...</div>
      }>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
            <Route path="/clinic" element={<Clinic />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
