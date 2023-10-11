import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CrudProvider } from './crudContext';
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <CrudProvider>
      <App/>
   </CrudProvider>
  </React.StrictMode>
);

