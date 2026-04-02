import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Main } from '.';
import Cadastro from '../../pages/Cadastro';
import Login from '../../pages/Login';



const router = createBrowserRouter([
  {
    element:<Main />,
    children: [

      {
        path:'/cadastro',
        element:<Cadastro/>
      },
      {
        path:'/login',
        element:<Login/>
      }
    ]

  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>,
)