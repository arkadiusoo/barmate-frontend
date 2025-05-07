// src/components/MainLayout.js
import React from "react";
import { Container } from "react-bootstrap";
import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children, onLoginClick }) => {
  return (
    <>
      <NavigationBar onLoginClick={onLoginClick} />
      <Container className="my-5">{children}</Container>
      <Footer />
    </>
  );
};

export default MainLayout;
