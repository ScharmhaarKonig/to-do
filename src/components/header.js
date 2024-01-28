import React from 'react';
import logo from './assets/logo.jpg';
import "./header.css";

const Header = () => {
  return (
    <header>
      <img src={logo} alt="Logo" className="logo" />
      <h1>Gabe's To-do List</h1>
    </header>
  );
};

export default Header;