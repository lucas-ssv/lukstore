import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

import './config/reactotronConfig';

import history from './services/history';
import { store, persistor } from './store';

import GlobalStyle from './styles/global';

import Routes from './routes';

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router history={history}>
                    <Routes />
                    <GlobalStyle />
                    <ToastContainer autoClose={3000} />
                </Router>
            </PersistGate>
        </Provider>
    );
}
