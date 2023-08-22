import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../Pages/Home';
import About from '../Pages/About';
import Login from '../Pages/Login';
import SignUp from '../Pages/signUp';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Login />
  },
  {
    path:'/login',
    element: <Login />
  },
  {
    path:'/signup',
    element: <SignUp />
  },
  {
    path:'/home',
    element: <Home />
  },
  {
    path:'/about',
    element: <Home />
  },
  {
    path:'/products',
    element: <Home />
  },
  {
    path:'/add-product',
    element: <Home />
  },
  {
    path:'/update-product',
    element: <About />
  },
  {
    path:'/logout',
    element: <About />
  },
  {
    path:'/profile',
    element: <About />
  },
])

function App() {
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
