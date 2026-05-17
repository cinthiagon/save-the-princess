/*
 * Project developed by Cinthia Gonçalez
 * Educational project for elementary school English students
 * © 2026 Cinthia Gonçalez — project developed as a teaching resource for the
 * English subject taught by Teacher Angela Muniz for elementary school students.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root container not found');

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
