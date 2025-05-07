// src/pages/HomePage.js
import React, { useState } from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import MainLayout from "../layouts/MainLayout";
import ModalWrapper from "../components/ModalWrapper";
import AuthForm from "../components/AuthForm";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleStartClick = () => {
    setIsLogin(true); // domyślnie logowanie
    setShowModal(true);
  };

  return (
    <MainLayout onLoginClick={handleStartClick}>
      <section className="text-center mb-5">
        <h1 className="display-4">Wzbogać Swój Domowy Bar</h1>
        <p className="lead">
          Zarządzaj zapasami, przepisami i analizuj użycie swoich składników.
        </p>
        <Button variant="primary" size="lg" onClick={handleStartClick}>
          Zacznij
        </Button>
      </section>

      <section>
        <h2 className="mb-4 text-center">Dlaczego BarMate?</h2>
        <Row>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Zarządzanie składnikami</Card.Title>
                <Card.Text>Śledź zapasy, dodawaj i usuwaj składniki.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Propozycje przepisów</Card.Title>
                <Card.Text>
                  Otrzymuj sugestie na podstawie posiadanych składników.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Analiza użycia</Card.Title>
                <Card.Text>
                  Śledź, jak często używasz składników i jakie drinki robisz.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      <ModalWrapper
        show={showModal}
        onClose={() => setShowModal(false)}
        title={isLogin ? "Logowanie" : "Rejestracja"}
      >
        <AuthForm isLogin={isLogin} onSwitchMode={() => setIsLogin(!isLogin)} />
      </ModalWrapper>
    </MainLayout>
  );
};

export default HomePage;
