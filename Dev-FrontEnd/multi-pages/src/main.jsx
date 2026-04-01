import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Home } from './pages/Home'
import { Sobre } from './pages/Sobre';
import Blog from './pages/Blog';
import { Main } from './layouts/Main';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import PostDetail from './pages/Blog/PostDetail';
import Autores from './pages/Autores';
import AutoresDetails from './pages/Autores/AutoresDetails';

const router = createBrowserRouter([
  {
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "sobre",
        element: <Sobre />
      },
      {
        path: "/blog",
        element: <Blog />
      },
      {
        path: "/post/:id",
        element: <PostDetail />
      },
      {
        path: "/autores",
        element: <Autores />
      },
      {
        path: "/autores/:id",
        element: <AutoresDetails />
      }

    ]
  },
  {
    path: "login",
    element: <Login />
  }
  // {
  // //   path: "/",
  // //   element: <Home />
  // // },
  // // {
  // //   path: "/sobre",
  // //   element: <Sobre />
  // // },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />,
    </AuthProvider>
    {/* <App /> */}
  </StrictMode>,
)
