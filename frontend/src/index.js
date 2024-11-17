import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { JournalsContextProvider } from './context/JournalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <JournalsContextProvider>
      <App />
    </JournalsContextProvider>
  </React.StrictMode>
);
