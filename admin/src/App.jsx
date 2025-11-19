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
import axios from 'axios'
import ProductDetails from './Pages/Products/ProductDetails'
import Scanner from './Pages/Scanner'
import UserProfile from './Pages/UserProfile'
import AddRam from './Pages/Products/AddRam'
import AddSize from './Pages/Products/AddSize'
import AddWeight from './Pages/Products/AddWeight'
import NotifyRequests from './Pages/Products/NotifyRequests'


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
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // ✅ Categories fetch
  useEffect(() => {
    // Use centralized api helper so the base URL and headers are consistent
    getData('/api/v1/category')
      .then(res => {
        console.log('Categories fetch', res);
        setCategories(res.data || res || []);
      })
      .catch(err => console.error('Categories fetch error', err));
  }, [refresh]);

  // Run once on mount to check auth and fetch admin details if token exists.
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      // ensure logged-out state if no token
      if (isLoggedIn) setIsLoggedIn(false);
      return;
    }

    // Only call fetch when we have a token. Avoid repeatedly toggling isLoggedIn
    // which can cause effect re-runs when used as a dependency.
    const fetchAdmin = async () => {
      try {
        // optimistically mark logged in
        if (!isLoggedIn) setIsLoggedIn(true);
        const res = await getData("/api/v1/admin/details");
        alertBox("success", "Admin data fetched successfully");
        setUserData(res?.data);
        console.log("admin data", res?.data);
      } catch (err) {
        const message = err?.response?.data?.message || err?.message;

        if (message === "Invalid token") {
          alertBox("error", "Session expired. Please login again.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setIsLoggedIn(false);
          window.location.href = "/login"; // force redirect
        } else if (message === 'Admin not found' || message === 'Forbidden') {
          alertBox('error', 'Admin access required. Please login as admin.');
          localStorage.removeItem('accessToken');
          setIsLoggedIn(false);
          window.location.href = '/login';
        } else {
          alertBox("error", "Something went wrong while fetching admin data.");
        }
      }
    }

    fetchAdmin();
    // Empty dependency array: run once on mount
  }, []); 


  const router = createBrowserRouter([
    {
      path: "/",
      // excat: true,
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
      // excat: true,
      element: (
        <>
          <ForgotPassword />
        </>
      )
    },

    {
      path: "/verify-account",
      // excat: true,
      element: (
        <>
          <VerifyAccount />
        </>
      )
    },

    {
      path: "/change-password",
      // excat: true,
      element: (
        <>
          <ChangePassword />
        </>
      )
    },

    {
      path: "/signup",
      // excat: true,
      element: (
        <>
          <SignUp />
        </>
      )
    },

    {
      path: "/product",
      // excat: true,
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
      path: "/scan",
      element: (
        <ProtectedRoute>
          <section className='main'>
            <Header />
            <div className="containerMain flex">
              <div className={`sideBarWrapper ${isSidebarOpen ? "w-[20%]" : "w-0 opacity-0"} transition-all duration-300`}>
                <Sidebar />
              </div>
              <Scanner />
            </div>
          </section>
        </ProtectedRoute>
      )
    },

    {
      path: "/homeslider/list",
      // excat: true,
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

        </ProtectedRoute >
      )
    },

    {
      path: "/category/list",
      // excat: true,
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
      // excat: true,
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
      // excat: true,
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
      path: "/user/:userId",
      // excat: true,
      element: (
        <ProtectedRoute>
          <section className='main'>
            <Header />
            <div className="containerMain flex">
              <div className={`sideBarWrapper ${isSidebarOpen ? "w-[20%]" : "w-0 opacity-0"} transition-all duration-300`}>
                <Sidebar />
              </div>
              {/* <div className={`contentRight py-4 px-7 ${isSidebarOpen ? "w-[80%]" : "w-[100%]"} transition-all duration-300`}> */}
              <UserProfile />
              {/* </div> */}
            </div>
          </section>

        </ProtectedRoute>
      )
    },

    {
      path: "/orders",
      // excat: true,
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
      // excat: true,
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
      // excat: true,
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
      // excat: true,
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

    // {
    //   path: "/product/:id",
    //   // excat: true,
    //   element: (
    //     <ProtectedRoute>
    //       <section className='main'>
    //         <Header />
    //         <div className="containerMain flex">
    //           <div className={`sideBarWrapper ${isSidebarOpen ? "w-[20%]" : "w-0 opacity-0"} transition-all duration-300`}>
    //             <Sidebar />
    //           </div>
    //           {/* <div className={`contentRight py-4 px-7 ${isSidebarOpen ? "w-[80%]" : "w-[100%]"} transition-all duration-300`}> */}
    //           <ProductDetails />
    //           {/* </div> */}
    //         </div>
    //       </section>
    //     </ProtectedRoute>
    //   )
    // },

    {
      path: "/product/:id",
      element: (
        <ProtectedRoute>
          <section className="main">
            <Header />
            <div className="containerMain flex">
              {/* Sidebar Wrapper */}
              <div
                className={`sideBarWrapper transition-all duration-300 ${isSidebarOpen ? "w-[20%]" : "w-0 opacity-0"
                  }`}
              >
                <Sidebar />
              </div>

              {/* Content Area */}
              <div
                className={`contentRight py-6 px-8 bg-gray-50 min-h-screen transition-all duration-300 ${isSidebarOpen ? "w-[80%]" : "w-full"
                  }`}
              >
                <ProductDetails />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      )
    },
    {
      path: "/product/add-ram",
      element: (
        <ProtectedRoute>
          <section className="main">
            <Header />
            <div className="containerMain flex">
              {/* Sidebar Wrapper */}
              <div
                className={`sideBarWrapper transition-all duration-300 ${isSidebarOpen ? "w-[20%]" : "w-0 opacity-0"
                  }`}
              >
                <Sidebar />
              </div>

              {/* Content Area */}
              <div
                className={`contentRight py-6 px-8 bg-gray-50 min-h-screen transition-all duration-300 ${isSidebarOpen ? "w-[80%]" : "w-full"
                  }`}
              >
                <AddRam />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      )
    },
    {
      path: "/product/add-size",
      element: (
        <ProtectedRoute>
          <section className="main">
            <Header />
            <div className="containerMain flex">
              {/* Sidebar Wrapper */}
              <div
                className={`sideBarWrapper transition-all duration-300 ${isSidebarOpen ? "w-[20%]" : "w-0 opacity-0"
                  }`}
              >
                <Sidebar />
              </div>

              {/* Content Area */}
              <div
                className={`contentRight py-6 px-8 bg-gray-50 min-h-screen transition-all duration-300 ${isSidebarOpen ? "w-[80%]" : "w-full"
                  }`}
              >
                <AddSize />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      )
    },
    {
      path: "/product/add-weight",
      element: (
        <ProtectedRoute>
          <section className="main">
            <Header />
            <div className="containerMain flex">
              {/* Sidebar Wrapper */}
              <div
                className={`sideBarWrapper transition-all duration-300 ${isSidebarOpen ? "w-[20%]" : "w-0 opacity-0"
                  }`}
              >
                <Sidebar />
              </div>

              {/* Content Area */}
              <div
                className={`contentRight py-6 px-8 bg-gray-50 min-h-screen transition-all duration-300 ${isSidebarOpen ? "w-[80%]" : "w-full"
                  }`}
              >
                <AddWeight />
              </div>
            </div>
          </section>
        </ProtectedRoute>
      )
    },
    {
      path: "/product/notify-requests",
      element: (
        <ProtectedRoute>
          <section className="main">
            <Header />
            <div className="containerMain flex">
              {/* Sidebar Wrapper */}
              <div
                className={`sideBarWrapper transition-all duration-300 ${isSidebarOpen ? "w-[20%]" : "w-0 opacity-0"
                  }`}
              >
                <Sidebar />
              </div>

              {/* Content Area */}
              <div
                className={`contentRight py-6 px-8 bg-gray-50 min-h-screen transition-all duration-300 ${isSidebarOpen ? "w-[80%]" : "w-full"
                  }`}
              >
                <NotifyRequests />
              </div>
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
    categories,
    setCategories,
    refresh,
    setRefresh
  };

  return (
    <>
      <MyContext.Provider value={value}>
        <RouterProvider router={router} />
        <AddProductForm />
        <Toaster />
      </MyContext.Provider>
    </>
  );
}

export default App;
// export { MyContext };

