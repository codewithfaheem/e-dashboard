import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css'
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PrivateComponent from "../Pages/PrivateComponent";
import ErrorNotFound from "../Pages/ErrorNotFound"
import Home from "../Pages/Home";
import About from "../Pages/About";
import Login from "../Pages/Login";
import SignUp from "../Pages/signUp";
import AddProduct from "../Pages/Products/AddProduct";
import Products from "../Pages/Products/Products";
import MainNav from "../Components/Nav/MainNav";
import UpdateProduct from "../Pages/Products/UpdateProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainNav />
        <Routes>
          <Route path="*" element={<ErrorNotFound/>} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route element={<PrivateComponent />}>
            <Route path="/home" element={<Home />} />
            <Route path="/add-product" element={<AddProduct/>} />
            <Route path="/update-product/:id" element={<UpdateProduct/>} />
            <Route path="/products" element={<Products/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
