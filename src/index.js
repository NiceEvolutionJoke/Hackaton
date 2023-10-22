import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store, { StoreContext } from './controller/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StoreContext.Provider value={{
        store
    }}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StoreContext.Provider>
);
