
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
  const [isOpenAddProductForm, setIsOpenAddProductForm] = useState({
    isOpen: false,
    model: '',
  });

  const router = createBrowserRouter([
    {
      path: "/",
      excat: true,
      element: (
        <>

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

        </>
      )
    },

    {
      path: "/login",
      excat: true,
      element: (
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
        <>
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

        </>
      )
    },

    {
      path: "/homeslider/list",
      excat: true,
      element: (
        <>
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

        </>
      )
    },

    {
      path: "/category/list",
      excat: true,
      element: (
        <>
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

        </>
      )
    },

    {
      path: "/subCategory/list",
      excat: true,
      element: (
        <>
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

        </>
      )
    },

    {
      path: "/users",
      excat: true,
      element: (
        <>
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

        </>
      )
    },

    {
      path: "/orders",
      excat: true,
      element: (
        <>
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

        </>
      )
    },

    {
      path: "/bannerV1/list",
      excat: true,
      element: (
        <>
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
        </>
      )
    },

    {
      path: "/bannerV2/list",
      excat: true,
      element: (
        <>
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
        </>
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
    alertBox
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

