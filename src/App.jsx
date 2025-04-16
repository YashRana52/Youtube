import React from 'react';
import Navbar from './components/Navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Body from './components/Body';
import Watch from './components/Watch';
import Feed from './components/Feed';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "/watch",
        element: <Watch />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
