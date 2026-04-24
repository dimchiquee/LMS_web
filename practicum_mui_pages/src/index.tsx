import React from 'react';
import ReactDOM from 'react-dom/client';
import {
 createBrowserRouter,
 RouterProvider,
} from "react-router-dom";

import List from "./list/List";
import Main from "./main/Main";
import Building from "./building/Building";
import Chart from "./chart/Chart";
import Testing from "./testing/Testing";
import store from './store';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/list",
    element: <List />,
  },
  {
    path: "/building/:id",
    element: <Building />,
  },
  {
  path: "/chart",
  element: <Chart />,
  },
  {
  path: "/testing",
  element: <Testing />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
   </Provider>
  </React.StrictMode>
);


