import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/auth/Dashboard";
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/slices/auth";
import Product from "./pages/ProductPage";
import Cart from "./pages/CartPage";
import UpdatedUser from "./pages/auth/DashboardUpdatePage";
import CreateCategory from "./pages/admin/catgeory/Ccatgeory";
import GetCategory from "./pages/admin/catgeory/Gcatgeory";
import UpdateCategory from "./pages/admin/catgeory/Ucatgeory";
import GetProduct from "./pages/admin/product/Gproduct";
import CreateProduct from "./pages/admin/product/Cproduct";
import UpdateProduct from "./pages/admin/product/Uproduct"
function App() {
  const dispatch = useDispatch();
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    const user = JSON.parse(storedUser);
    dispatch(login(user));
  }
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="products" element={<Product />} />
          <Route path="cart" element={<Cart />} />

          <Route path="admin/catgeory" element={<GetCategory />} />
          <Route path="admin/catgeory/create" element={<CreateCategory />} />
          <Route path="admin/catgeory/update/:id" element={<UpdateCategory />} />
         
          <Route path="admin/product" element={<GetProduct />} />
          <Route path="admin/product/create" element={<CreateProduct />} />
          <Route path="admin/product/update/:id" element={<UpdateProduct />} />
          
          <Route path="/about" exact element={<h2>About US</h2>} />
          <Route path="/contact" exact element={<h2>Contact US</h2>} />
        
          <Route
            path="dashboard/update/:id"
            element={!isAuthenticated ? <LoginPage /> : <UpdatedUser />}
          />
        
          <Route
            path="register"
            element={!isAuthenticated ? <RegisterPage /> : <DashboardPage />}
          />
          <Route
            element={!isAuthenticated ? <LoginPage /> : <DashboardPage />}
            path="login"
          />

          <Route
            element={!isAuthenticated ? <LoginPage /> : <DashboardPage />}
            path="dashboard"
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
