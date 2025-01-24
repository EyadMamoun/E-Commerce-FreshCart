import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Login from './Components/Login/Login';
import AuthContextProvider from './Components/Context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Components/Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Payment from './Components/Payment/Payment';
import { Offline } from 'react-detect-offline'

const myRouter = createBrowserRouter([
  {
    path: '/', element: <Layout />, children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'productdetails/:id',
        element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute>
      },
      {
        path: 'categories',
        element: <ProtectedRoute> <Categories /> </ProtectedRoute>
      },
      {
        path: 'brands',
        element: <ProtectedRoute> <Brands /> </ProtectedRoute>
      },
      {
        path: 'cart',
        element: <ProtectedRoute> <Cart /> </ProtectedRoute>
      },
      {
        path: 'payment',
        element: <ProtectedRoute> <Payment /> </ProtectedRoute>
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: '*',
        element: <NotFound />
      },
    ]
  },
])

function App() {

  const myClient = new QueryClient();

  return <>

    <QueryClientProvider client={myClient}>

      <AuthContextProvider>

        <CartContextProvider>
          <RouterProvider router={myRouter} />
        </CartContextProvider>
        
      </AuthContextProvider>

    </QueryClientProvider>

    <Toaster />

    {/* This div is rendered only when the user goes offline */}
    <Offline>
      <div className='bg-danger fixed-bottom text-white text-center'>Internet connection has been lost...</div>
    </Offline>

  </>
}

export default App;
