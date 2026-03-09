import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import{ Provider } from "react-redux";
import appStore from './utils/appStore.ts';
import Login from './pages/login.tsx';
import Profile from './pages/Profile.tsx';
import { Toaster } from './components/ui/sonner.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import Feed from './pages/Feed.tsx';
import Billing from './pages/Billing.tsx';
import Requests from './pages/Requests.tsx';
import Connections from './pages/Connections.tsx';
const appRouter=createBrowserRouter([
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/",
    element:<App/>,
    children:[
      {
        index:true,
        element:(<ProtectedRoute><Feed/></ProtectedRoute>)
      },
      {
        path:"/profile",
        element:(
          <ProtectedRoute>
             <Profile/>
          </ProtectedRoute>
       
      )
      },
      {
        path:"/connections",
        element:(
          <ProtectedRoute>
            <Connections/>
          </ProtectedRoute>
        )
      },
      {
        path:"/billing",
        element:(
          <ProtectedRoute>
            <Billing/>
          </ProtectedRoute>
        )
      },
      {
        path:"/requests",
        element:(
          <ProtectedRoute>
            <Requests/>
          </ProtectedRoute>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={appStore}>
       <Toaster richColors position='top-center'/>
      <RouterProvider router={appRouter}>
       
      </RouterProvider>

       
    </Provider>
   
  </StrictMode>,
)
