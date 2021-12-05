import React, {Suspense} from 'react'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from 'react-router-dom';
import Clinic from "./components/Clinic/Clinic";
import axios from "axios";

const LandingPage = React.lazy(() => import('./components/LandingPage/LandingPage'));
const Signup = React.lazy(() => import('./components/Signup/Signup'));
const Login = React.lazy(() => import('./components/Login/Login'));

const BASE_URL = "http://localhost:8080";
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers['Accept'] = 'application/json';

function App() {
    return (
        <div className="App">
            <Suspense fallback={
                <div className='centered'>Loading...</div>
            }>
                <Routes>
                    <Route exact path="/" element={<LandingPage/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/clinic" element={<Clinic/>}/>
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
