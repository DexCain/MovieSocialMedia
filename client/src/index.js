import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MovieWantContextProvider } from './context/MovieWantContext';
import { MovieWatchedContextProvider } from './context/MovieWatchedContext';
import { AuthContextProvider } from './context/AuthContext';
import { FriendContextProvider } from './context/FriendContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MovieWatchedContextProvider>
        <MovieWantContextProvider>
          <FriendContextProvider>
            <App />
          </FriendContextProvider>
        </MovieWantContextProvider>
      </MovieWatchedContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);