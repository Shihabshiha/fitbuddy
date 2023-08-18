import ReactDOM from 'react-dom/client'
import React from 'react'
import { RouterProvider } from 'react-router-dom';
import AppRouter from './routes';
import { ThemeProvider } from "@material-tailwind/react";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    <React.StrictMode>
      <ThemeProvider>
        <RouterProvider router={AppRouter} />
      </ThemeProvider>  
    </React.StrictMode>
  </>
)
