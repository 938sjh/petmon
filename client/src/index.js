import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './shared/App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store, {persistor} from "./redux/configStore";
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
