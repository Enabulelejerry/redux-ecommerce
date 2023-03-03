import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import { persistStore } from "redux-persist"
let persistor = persistStore(store);

 const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
  domain={process.env.REACT_APP_AUTH_DOMAIN}
  clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
  redirectUri={window.location.origin}
  cacheLocation='localstorage'
>
    <Provider store={store}>
        <App />
    </Provider>
    </Auth0Provider>
  );
