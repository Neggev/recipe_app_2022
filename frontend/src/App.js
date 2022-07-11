// react imports

import React from 'react';
import { Routes, Route } from "react-router-dom";

// components imports
import Appbar from './components/Appbar'
import Footer from './components/Footer'

// pages imports
import About from './pages/About'
import Favorites from './pages/Favorites'
import Landing from './pages/Landing'
import Profile from './pages/Profile'
import Search from './pages/Search'
import LoginComp from './components/login/LoginComp'
import RegisterComp from './components/register/RegisterComp'
import Reset from './components/reset/Reset'
import Logout from './pages/Logout'
import DeleteUser from './pages/DeleteUser'


function App() {
  return (

    <>
      {/* navBar */}
      <Appbar />
      {/* Routes */}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/" element={<Landing />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/register" element={<RegisterComp />} />
        <Route path="/login" element={<LoginComp />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/delete_user" element={<DeleteUser />} />
      </Routes>
      {/* Footer */}
      <Footer />
    </>

  );
}

export default App;
