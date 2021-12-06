import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom';
import firebase from 'firebase/compat';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';
import store from './store/index';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ReactReduxFirebaseProvider} from "react-redux-firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDoH-So6RgUYsZndUyhOBRwLVikeWiIJNs",
    authDomain: "vaccination-management-app.firebaseapp.com",
    projectId: "vaccination-management-app",
    storageBucket: "vaccination-management-app.appspot.com",
    messagingSenderId: "590788373269",
    appId: "1:590788373269:web:27c0ef6527282e2187971c",
    measurementId: "G-D6Y2LJ6N7J"
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)

const rrfConfig = {
    userProfile: "users",
    // useFirestoreForProfile: true,
};

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    // createFirestoreInstance, //since we are using Firestore
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ReactReduxFirebaseProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
