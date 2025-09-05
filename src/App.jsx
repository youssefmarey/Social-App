import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import { Toaster } from 'react-hot-toast';
import AuthContextProvider from './Context/AuthContext';
import ProdectedRouter from './Components/ProdectedRouter/ProdectedRouter';
import Profile from './Components/Profile/Profile';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostDetails from './Components/PostDetails/PostDetails';
import { Offline } from 'react-detect-offline';


const App = () => {
  const client = new QueryClient()

   const router = createBrowserRouter(
    [
      {path: "/" , element: <Layout /> ,children : [
        {index: true , element:  <ProdectedRouter>  <Home /> </ProdectedRouter> },
        {path: "profile" , element:  <ProdectedRouter>  <Profile /> </ProdectedRouter> },
        {path: "postdetails/:id" , element:  <ProdectedRouter>  <PostDetails /> </ProdectedRouter> },
        {path: "login" , element: <Login /> },
        {path: "register" , element: <Register /> },
        {path: "*" , element: <NotFound />}
      ] }
    ]
  )

  
  
 

  return (

    
    
    <AuthContextProvider>
      <QueryClientProvider client={client}>
    <Toaster />
      <Offline  >
    <div className='p-3 fixed top-1/2 rounded-xl bg-primary'>
        Only shown offline (surprise!)
    </div>
        </Offline>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </AuthContextProvider>
  )
}

export default App;