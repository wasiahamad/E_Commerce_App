import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./Pages/Home";
import ScannerPage from "./Pages/Scanner";
import ProductListing from "./Pages/ProdustListing";
import Footer from "./components/Footer";
import ProductDetails from "./Pages/ProductDetails";
import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ProductZoom from "./components/ProductZoom";
import { RxCross2 } from "react-icons/rx";
import ProductDetailsModel from "./components/ProductDetailsModel";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Card from "./Pages/Card";
import Verify from "./Pages/Verify";
import toast, { Toaster } from 'react-hot-toast';
import ForgotPassword from "./Pages/ForgotPassword";
import Checkout from "./Pages/Checkout";
import MyAccount from "./Pages/MyAccount";
import MyList from "./Pages/MyList";
import Orders from "./Pages/Orders";
import Wishlist from "./Pages/Wishlist";
// CategoryPage is no longer used; productListing will handle category views via query params
import { getData } from "./utils/api";
import PrivateRoute from "./components/PrivateRoute";
import Address from "./Pages/MyAccount/Address.jsx";

const alertBox = (status, msg) => {
  if (status === "success") toast.success(msg);
  else toast.error(msg);
};

export const MyContext = createContext();

export default function App() {
  const [openProductDetailModel, setOpenProductDetailModel] = useState(false);
  const [maxWidth] = useState("lg");
  const [fullWidth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const [openCardPanel, setOpenCardPanel] = useState(false);
  const [openCardPanel2, setOpenCardPanel2] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [myList, setMyList] = useState([]);

  const fetchCartCount = async () => {
    try {
      const res = await getData('/api/v1/cart');
      if (res && Array.isArray(res.data)) setCartCount(res.data.length);
      else setCartCount(0);
    } catch (err) {
      console.error('Error fetching cart count', err);
    }
  };

  const fetchWishlistCount = async () => {
    try {
      const res = await getData('/api/v1/myList');
      if (res && Array.isArray(res.data)) setWishlistCount(res.data.length);
      else setWishlistCount(0);
    } catch (err) {
      console.error('Error fetching wishlist count', err);
    }
  };

  const fetchMyList = async () => {
    try {
      const res = await getData('/api/v1/myList');
      if (res && Array.isArray(res.data)) setMyList(res.data);
      else setMyList([]);
    } catch (err) {
      console.error('Error fetching myList', err);
      setMyList([]);
    }
  };

  // keep wishlist count in sync when myList updates
  useEffect(() => {
    setWishlistCount((myList && Array.isArray(myList)) ? myList.length : 0);
  }, [myList]);

  useEffect(() => {
    fetchCartCount();
    fetchWishlistCount();
    fetchMyList();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    setIsLoggedIn(true);
    getData('/api/v1/user/details')
      .then((res) => setUserData(res?.data))
      .catch((err) => {
        const message = err?.response?.data?.message || err?.message;
        if (message === 'Invalid token') {
          alertBox('error', 'Session expired. Please login again.');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setIsLoggedIn(false);
          window.location.href = '/login';
        } else {
          alertBox('error', 'Something went wrong while fetching user.');
        }
      });
  }, [isLoggedIn]);

  const toggleCardPanel = (newOpen) => () => setOpenCardPanel(newOpen);
  const handleCloseProductDetailModel = () => setOpenProductDetailModel(false);

  const value = {
    setOpenProductDetailModel,
    setCurrentProduct,
    setOpenCardPanel,
    toggleCardPanel,
    openCardPanel,
    cartCount,
    wishlistCount,
    fetchCartCount,
    fetchWishlistCount,
    fetchMyList,
    myList,
    alertBox,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    openCardPanel2,
    setOpenCardPanel2,
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={value}>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productListing" element={<ProductListing />} />
          <Route path="/scan" element={<ScannerPage />} />
          <Route path="/category/:id" element={<RedirectToListing />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<PrivateRoute><Card /></PrivateRoute>} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/my-account" element={<PrivateRoute><MyAccount /></PrivateRoute>} />
          <Route path="/my-list" element={<PrivateRoute><MyList /></PrivateRoute>} />
          <Route path="/my-order" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="/address" element={<PrivateRoute><Address /></PrivateRoute>} />
          <Route path="*" element={<h1 className="text-center mt-10">404 - Page Not Found</h1>} />
        </Routes>

        <Footer />

        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={openProductDetailModel}
          onClose={handleCloseProductDetailModel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="productDetailsModel"
        >
          <DialogContent>
            <div className="flex items-center w-full productDetailsModelContainer relative">
              <Button
                onClick={handleCloseProductDetailModel}
                className="!top-0 !right-0 !absolute !rounded-full !h-[40px] !w-[40px] !min-w-[40px] !bg-[#f1f1f1]"
              >
                <RxCross2 className="text-[#000] !text-[20px] " />
              </Button>

              <div className="col1 w-[40%] px-3">
                <ProductZoom product={currentProduct} />
              </div>

              <div className="col2 w-[60%] py-5 px-10 productContent">
                <ProductDetailsModel product={currentProduct} />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Toaster />
      </MyContext.Provider>
    </BrowserRouter>
  );
}

function RedirectToListing() {
  // small component used only for route redirects
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      navigate(`/productListing?categoryId=${id}`, { replace: true });
    } else {
      navigate(`/productListing`, { replace: true });
    }
  }, [id, navigate]);

  return null;
}
