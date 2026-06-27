import { Suspense } from "react";
import Header from "../components/Layout/Header.jsx";
import Footer from "../components/Layout/Footer.jsx";
import { Outlet } from "react-router-dom";
const MainLayout = ()=>{
   return (
     <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <Header/>
        <Suspense fallback={null}>
          <Outlet/>
        </Suspense>
        <Footer/>
    </div>
   )
}

export default MainLayout;