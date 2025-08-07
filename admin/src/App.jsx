import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
import { createContext, useState } from 'react'
import LogIn from './Pages/LogIn'
import SignUp from './Pages/SignUp'
import Products from './Pages/Products'
import AddProductForm from './Components/AddProductForm'
import HomeSliderBanner from './Pages/HomeSliderBanner'
import AddHomeSlider from './Pages/HomeSliderBanner/AddHomeSlider'
import CategoryList from './Pages/CategoryList'
import SubCategoryList from './Pages/CategoryList/SubCategoryList'
import Users from './Pages/Users'
import Orders from './Pages/Orders'
import ForgotPassword from './Pages/ForgotPassword'
import VerifyAccount from './Pages/VerifyAccount'
import ChangePassword from './Pages/ChangePassword'
import BannerV1 from './Pages/BannerV1'
import BannerV2 from './Pages/BannerV2'
import toast, { Toaster } from 'react-hot-toast';
import { getData } from './utils/api'
import { useEffect } from 'react'
import Profile from './Pages/Profile'
import ProtectedRoute from './ProtectedRoute'



const alertBox = (status, msg) => {
  if (status === "success") {
    toast.success(msg);
  } else {
    toast.error(msg);
  }
}

export const MyContext = createContext();
function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isOpenAddProductForm, setIsOpenAddProductForm] = useState({
    isOpen: false,
    model: '',
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token !== null && token !== undefined && token !== "") {
      setIsLoggedIn(true);
      getData("/api/v1/user/details")
        .then((res) => {
          alertBox("success", "User data fetched successfully");
          setUserData(res?.data);
          console.log("user data", res?.data);
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
  }, [isLoggedIn]);


  const router = createBrowserRouter([
    {
      path: "/",
      excat: true,
      element: (
        <ProtectedRoute>

          <section className='main'>
            <Header />
            <div className="containerMain flex">
              <div className={`sideBarWrapper ${isSidebarOpen ? "w-[20%]" : "w-0 opacity-0"} transition-all duration-300`}>
                <Sidebar />
              </div>
              {/* <div className={`contentRight py-4 px-7 ${isSidebarOpen ? "w-[80%]" : "w-[100%]"} transition-all duration-300`}> */}
              <Dashboard />
              {/* </div> */}
            </div>
          </section>

        </ProtectedRoute>
      )
    },

    {
      path: "/login", element: (
        <>
          <LogIn />
        </>
      )
    },

    {
      path: "/forgot-password",
      excat: true,
      element: (
        <>
          <ForgotPassword />
        </>
      )
    },

    {
      path: "/verify-account",
      excat: true,
      element: (
        <>
          <VerifyAccount />
        </>
      )
    },

    {
      path: "/change-password",
      excat: true,
      element: (
        <>
          <ChangePassword />
        </>
      )
    },

    {
      path: "/signup",
      excat: true,
      element: (
        <>
          <SignUp />
        </>
      )
    },

    {
      path: "/product",
      excat: true,
      element: (
        <ProtectedRoute>
          <section className='main'>
            <Header />
            <div className="containerMain flex">
              <div className={`sideBarWrapper ${isSidebarOpen ? "w-[20%]" : "w-0 opacity-0"} transition-all duration-300`}>
                <Sidebar />
              </div>
              {/* <div className={`contentRight py-4 px-7 ${isSidebarOpen ? "w-[80%]" : "w-[100%]"} transition-all duration-300`}> */}
              <Products />
              {/* </div> */}
            </div>
          </section>

        </ProtectedRoute>
      )
    },

    {
      path: "/homeslider/list",
      excat: true,
      element: (
        <ProtectedRoute>
          <section className='main'>
            <Header />
            <div className="containerMain flex">
              <div className={`sideBarWrapper ${isSidebarOpen ? "w-[20%]" : "w-0 opacity-0"} transition-all duration-300`}>
                <Sidebar />
              </div>
              {/* <div className={`contentRight py-4 px-7 ${isSidebarOpen ? "w-[80%]" : "w-[100%]"} transition-all duration-300`}> */}
              <HomeSliderBanner />
              {/* </div> */}
            </div>
          </section>

        </ProtectedRoute>
      )
    },

    {
      path: "/category/list",
      excat: true,
      element: (
        <ProtectedRoute>
          <section className='main'>
            <Header />
            <div className="containerMain flex">
              <div className={`sideBarWrapper ${isSidebarOpen ? "w-[20%]" : "w-0 opacity-0"} transition-all duration-300`}>
                <Sidebar />
              </div>
              {/* <div className={`contentRight py-4 px-7 ${isSidebarOpen ? "w-[80%]" : "w-[100%]"} transition-all duration-300`}> */}
              <CategoryList />
              {/* </div> */}
            </div>
          </section>

        </ProtectedRoute>
      )
    },

    {
      path: "/subCategory/list",
      excat: true,
      element: (
        <ProtectedRoute>
          <section className='main'>
            <Header />
            <div className="containerMain flex">
              <div className={`sideBarWrapper ${isSidebarOpen ? "w-[20%]" : "w-0 opacity-0"} transition-all duration-300`}>
                <Sidebar />
              </div>
              {/* <div className={`contentRight py-4 px-7 ${isSidebarOpen ? "w-[80%]" : "w-[100%]"} transition-all duration-300`}> */}
              <SubCategoryList />
              {/* </div> */}
            </div>
          </section>

        </ProtectedRoute>
      )
    },

    {
      path: "/users",
      excat: true,
      element: (
        <ProtectedRoute>
          <section className='main'>
            <Header />
            <div className="containerMain flex">
              <div className={`sideBarWrapper ${isSidebarOpen ? "w-[20%]" : "w-0 opacity-0"} transition-all duration-300`}>
                <Sidebar />
              </div>
              {/* <div className={`contentRight py-4 px-7 ${isSidebarOpen ? "w-[80%]" : "w-[100%]"} transition-all duration-300`}> */}
              <Users />
              {/* </div> */}
            </div>
          </section>

        </ProtectedRoute>
      )
    },

    {
      path: "/orders",
      excat: true,
      element: (
        <ProtectedRoute>
          <section className='main'>
            <Header />
            <div className="containerMain flex">
              <div className={`sideBarWrapper ${isSidebarOpen ? "w-[20%]" : "w-0 opacity-0"} transition-all duration-300`}>
                <Sidebar />
              </div>
              {/* <div className={`contentRight py-4 px-7 ${isSidebarOpen ? "w-[80%]" : "w-[100%]"} transition-all duration-300`}> */}
              <Orders />
              {/* </div> */}
            </div>
          </section>

        </ProtectedRoute>
      )
    },

    {
      path: "/bannerV1/list",
      excat: true,
      element: (
        <ProtectedRoute>
          <section className='main'>
            <Header />
            <div className="containerMain flex">
              <div className={`sideBarWrapper ${isSidebarOpen ? "w-[20%]" : "w-0 opacity-0"} transition-all duration-300`}>
                <Sidebar />
              </div>
              {/* <div className={`contentRight py-4 px-7 ${isSidebarOpen ? "w-[80%]" : "w-[100%]"} transition-all duration-300`}> */}
              <BannerV1 />
              {/* </div> */}
            </div>
          </section>
        </ProtectedRoute>
      )
    },

    {
      path: "/bannerV2/list",
      excat: true,
      element: (
        <ProtectedRoute>
          <section className='main'>
            <Header />
            <div className="containerMain flex">
              <div className={`sideBarWrapper ${isSidebarOpen ? "w-[20%]" : "w-0 opacity-0"} transition-all duration-300`}>
                <Sidebar />
              </div>
              {/* <div className={`contentRight py-4 px-7 ${isSidebarOpen ? "w-[80%]" : "w-[100%]"} transition-all duration-300`}> */}
              <BannerV2 />
              {/* </div> */}
            </div>
          </section>
        </ProtectedRoute>
      )
    },

    {
      path: "/profile",
      excat: true,
      element: (
        <ProtectedRoute>
          <section className='main'>
            <Header />
            <div className="containerMain flex">
              <div className={`sideBarWrapper ${isSidebarOpen ? "w-[20%]" : "w-0 opacity-0"} transition-all duration-300`}>
                <Sidebar />
              </div>
              {/* <div className={`contentRight py-4 px-7 ${isSidebarOpen ? "w-[80%]" : "w-[100%]"} transition-all duration-300`}> */}
              <Profile />
              {/* </div> */}
            </div>
          </section>
        </ProtectedRoute>
      )
    },
  ]);

  const value = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLoggedIn,
    setIsLoggedIn,
    isOpenAddProductForm,
    setIsOpenAddProductForm,
    alertBox,
    userData,
    setUserData,
  }


  return (
    <>
      <MyContext.Provider value={value}>
        <RouterProvider router={router} />
        <AddProductForm />
        <Toaster />
      </MyContext.Provider>
    </>
  )
}

export default App;
// export { MyContext };

