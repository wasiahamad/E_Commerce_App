import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Home from "./Pages/Home";
import ProductListing from "./Pages/ProdustListing";
import Footer from "./components/Footer";
import ProductDetails from "./Pages/ProductDetails";
import { createContext, useEffect, useState } from "react";
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
import { getData } from "./utils/api";
import PrivateRoute from "./components/PrivateRoute";
import Address from "./Pages/MyAccount/Address.jsx";

// react toast alert function
const alertBox = (status, msg) => {
  if (status === "success") {
    toast.success(msg);
  } else {
    toast.error(msg);
  }
}

const MyContext = createContext();
function App() {
  const [openProductDetailModel, setOpenProductDetailModel] = useState(false);
  const [maxWidth, setMaxWidth] = useState("lg");
  const [fullWidth, setFullWidth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const [openCardPanel, setOpenCardPanel] = useState(false);

  // useEffect
  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   if (token !== null && token !== undefined && token !== "") {
  //     setIsLoggedIn(true);
  //     getData("/api/v1/user/details").then((res) => {
  //       setUserData(res.data);
  //       console.log(res?.data?.error);
  //       if (res?.response?.data?.error && res?.response?.data?.error?.message === "Invalid token") {
  //         alertBox("error", res.data.error || "Something went wrong");
  //         localStorage.removeItem("accessToken");
  //         localStorage.removeItem("refreshToken");
  //         window.location.href = "/login"; // redirect to login
  //         setIsLoggedIn(false);
  //       } else {
  //         alertBox("success", "User data fetched successfully");
  //       }

  //     })
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token !== null && token !== undefined && token !== "") {
      setIsLoggedIn(true);
      getData("/api/v1/user/details")
        .then((res) => {
          alertBox("success", "User data fetched successfully");
          setUserData(res?.data);
        })
        .catch((err) => {
          const message = err?.response?.data?.message || err?.message;

          if (message === "Invalid token") {
            alertBox("error", "Session expired. Please login again.");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setIsLoggedIn(false);
            window.location.href = "/login"; // force redirect
          } else {
            alertBox("error", "Something went wrong while fetching user.");
          }
        });
    } else {
      setIsLoggedIn(false);
    }
  }, [ isLoggedIn]);


  const toggleCardPanel = (newOpen) => () => {
    setOpenCardPanel(newOpen);
  };

  const handleCloseProductDetailModel = () => {
    setOpenProductDetailModel(false);
  };

  const value = {
    // Add your context values here
    setOpenProductDetailModel,
    setOpenCardPanel,
    toggleCardPanel,
    openCardPanel,
    alertBox,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={value}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/productListing"
              element={<ProductListing />}
            />
            <Route
              path="/productDetails/:id"
              element={<ProductDetails />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/cart"
              element={<PrivateRoute><Card /></PrivateRoute>}
            />
            <Route
              path="/verify"
              element={<Verify />}
            />
            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />
            <Route
              path="/checkout"
              element={<PrivateRoute><Checkout /></PrivateRoute>}
            />
            <Route
              path="/my-account"
              element={<PrivateRoute><MyAccount /></PrivateRoute>}
            />
            <Route
              path="/my-list"
              element={<PrivateRoute><MyList /></PrivateRoute>}
            />
            <Route
              path="/my-orders"
              element={<PrivateRoute><Orders /></PrivateRoute>}
            />

            <Route
              path="/address"
              element={<PrivateRoute><Address /></PrivateRoute>}
            />
          </Routes>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>

      <Toaster />

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
              {" "}
              <RxCross2 className="text-[#000] !text-[20px] " />
            </Button>
            <div className="col1 w-[40%] px-3">
              <ProductZoom />
            </div>

            <div className="col2 w-[60%] py-5 px-10 productContent">
              <ProductDetailsModel />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
export { MyContext };
