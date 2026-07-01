import { Suspense } from "react";
import Header from "../components/Layout/Header.jsx";
import Footer from "../components/Layout/Footer.jsx";
import PageTransition from "../components/UI/PageTransition.jsx";
import PageLoading from "../components/UI/PageLoading.jsx";

const MainLayout = () => {
  return (
    <div className="w-full min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header />
      <div className="marketing-main">
        <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12"><PageLoading /></div>}>
          <PageTransition />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;