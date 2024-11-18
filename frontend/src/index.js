import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { JournalsContextProvider } from './context/JournalContext';
import { AuthContextProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <JournalsContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </JournalsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
