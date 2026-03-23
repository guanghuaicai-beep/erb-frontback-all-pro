import { useState,useEffect} from 'react'
import React from 'react';
import { BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Course from './pages/Course';
import Contact from './pages/Contactc';
import CourseDetail from './pages/CourseDetail';
import Footer from './components/Footer';
import JoinUs from './pages/JoinUs';
import Donation from './pages/Donation';
import Network from './pages/Network';
import Companyrecruitment from './pages/Companyrecruitment';
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import SignUp from "./components/SignUp";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import WishList from "./components/WishList";
import { AuthProvider } from "./context/AuthContext";
// import ForgetPassword from './components/ForgetPassword';
// import ResePassword from './components/ForgetPassword';
// import SingIn from './components/SignIn';
// import SingUp from './components/SignUp';
// 新增：创建滚动到顶部的组件
const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    // 每次路由变化，滚动到页面顶部
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 平滑滚动，可选
    });
  }, [location.pathname]); // 监听路由路径变化

  return null;
};
function App() {
  const [count, setCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [heartCount, setHeartCount] = useState(0);

  return (
    <div>
      <AuthProvider>
      <ScrollToTop />
      <Navbar 
        setCartCount={setCartCount}  
        setHeartCount={setHeartCount} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/course" element={<Course />} />
          <Route path="/course/:slug" element={<CourseDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/joinus" element={<JoinUs />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/network" element={<Network />} />
          <Route path="/companyrecruitment" element={<Companyrecruitment />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/favorite" element={<WishList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
      <Footer />
      </AuthProvider>
    </div>

  );
}

export default App
