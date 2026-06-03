import Header from "../components/Layout/Header.jsx";
import { Outlet } from "react-router-dom";
const MainLayout = ()=>{
   return (
     <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <Header/>
        <Outlet/>
    </div>
   )
}

export default MainLayout;