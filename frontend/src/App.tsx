import { Toaster } from 'sonner'


import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Community from "./pages/Community";
import OwnProjects from "./pages/OwnProjects";
import Preview from "./pages/Preview";
import ViewProject from "./pages/ViewProject";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Global/Navbar";
import Footer from "./components/Global/Footer";
import Banner from "./components/Global/Banner";
import ProjectPlayGround from "./pages/Project";
import AuthPage from './pages/auth/AuthPage';
import Settings from './pages/auth/Settings';

const App = () => {

  const { pathname } = useLocation();

  const removeNav = pathname.startsWith('/projects/') && pathname !== '/projects/'
  || pathname.startsWith('/view/') || pathname.startsWith('/preview/');

  return (
    <div className="mt-20">
      <Toaster />
      <span className="bg-blue-200 rounded-r-full w-[30%] md:w-[45%] h-[50%] fixed left-0 top-0 -z-1 opacity-30  blur-xl animate-pulse"></span>
      <span className="bg-pink-200 rounded-l-full w-[30%] md:w-[45%] h-[50%] fixed right-0 bottom-0 -z-1 opacity-30  blur-xl animate-pulse"></span>
      
      {!removeNav && <Banner />}
      {!removeNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/community" element={<Community />} />
        <Route path="/projects" element={<OwnProjects />} />
        <Route path="/view" element={<ViewProject />} />
        <Route path="/projects/:projectId" element={<ProjectPlayGround />} />
        <Route path="/preview/:projectId" element={<Preview />} />
        <Route path="/preview/:projectId/:versionId" element={<Preview />} />
        <Route path="/auth/:pathname" element={<AuthPage />} />
        <Route path="/account/settings" element={<Settings />} />
      </Routes>
      {!removeNav && <Footer />}
      <ToastContainer />
    </div>
  );
};

export default App;
