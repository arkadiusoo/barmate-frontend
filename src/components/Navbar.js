// src/components/Navbar.js
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo.png"; // Jeśli masz logo, użyj je

function NavigationBar({ onLoginClick }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Navbar expand="lg" className="navbar">
      {" "}
      {/* Używamy klasy navbar */}
      <Container>
        <Navbar.Brand href="/dashboard" className="navbar-brand">
          <img
            src={logo}
            alt="Logo"
            height="30"
            style={{ objectFit: "contain" }}
          />
          BarMate
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link href="/" className="nav-link">
              Start
            </Nav.Link>
            <Nav.Link href="/about" className="nav-link">
              O nas
            </Nav.Link>
            {isLoggedIn ? (
              <Nav.Link onClick={onLoginClick} className="nav-link">
                Wyloguj
              </Nav.Link>
            ) : (
              <Nav.Link onClick={onLoginClick} className="nav-link">
                Zaloguj
              </Nav.Link>
            )}
            <ThemeToggle />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
