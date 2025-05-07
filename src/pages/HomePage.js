import React, { useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthForm from "../components/AuthForm";
import ModalWrapper from "../components/ModalWrapper";

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleSwitchMode = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <MainLayout onLoginClick={handleLoginClick}>
      <Container className="text-center my-5">
        <Row>
          <Col md={6} className="mx-auto">
            <Card className="shadow-lg">
              <Card.Body>
                <h2>Witaj w BarMate!</h2>
                <p>
                  Zorganizuj swój domowy bar, zarządzaj zapasami, przepisami i
                  listą zakupów.
                </p>
                <Button variant="primary" onClick={handleLoginClick}>
                  {localStorage.getItem("isLoggedIn") === "true"
                    ? "Zalogowany"
                    : "Zaloguj się"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Login/Registration Modal */}
      <ModalWrapper
        show={showModal}
        onClose={handleCloseModal}
        title={isLogin ? "Zaloguj się" : "Zarejestruj się"}
      >
        <AuthForm isLogin={isLogin} onSwitchMode={handleSwitchMode} />
      </ModalWrapper>
    </MainLayout>
  );
};

export default HomePage;
