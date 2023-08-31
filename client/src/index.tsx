import ReactDOM from 'react-dom/client'
import React from 'react'
import { RouterProvider } from 'react-router-dom';
import AppRouter from './routes';
import { ThemeProvider } from "@material-tailwind/react";
import "./index.css";
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import config from './config';


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    <React.StrictMode>
      <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
        <ThemeProvider>
          <Provider store={store}>
            <RouterProvider router={AppRouter} />
          </Provider> 
        </ThemeProvider>
      </GoogleOAuthProvider>    
    </React.StrictMode>
  </>
)
