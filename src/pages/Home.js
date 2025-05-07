import React, { useState } from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import MainLayout from "../layouts/MainLayout";
import ModalWrapper from "../components/ModalWrapper";
import AuthForm from "../components/AuthForm";

function Home({ onLogin }) {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleStartClick = () => {
    setIsLogin(true); // domyślnie logowanie
    setShowModal(true);
  };

  return (
    <MainLayout onLoginClick={handleStartClick}>
      <section className="text-center mb-5">
        <h1 className="display-4">BarMate 🍸</h1>
        <p className="lead">
          Zarządzaj swoim domowym barem – przechowuj składniki, twórz przepisy i
          analizuj swoje drinki!
        </p>
        <Button variant="primary" size="lg" onClick={handleStartClick}>
          Zaloguj się
        </Button>
      </section>

      <section>
        <h2 className="mb-4 text-center">Dlaczego BarMate?</h2>
        <Row>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Zarządzanie składnikami</Card.Title>
                <Card.Text>
                  Przechowuj swoje składniki, dodawaj nowe i śledź zapasy, aby
                  nigdy nie zabrakło ci czegoś do ulubionych drinków.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Propozycje przepisów</Card.Title>
                <Card.Text>
                  Na podstawie dostępnych składników, BarMate zasugeruje
                  przepisy na drinki, które możesz przygotować.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Analiza użycia</Card.Title>
                <Card.Text>
                  Monitoruj, które składniki najczęściej wykorzystujesz i jak
                  często przygotowujesz swoje ulubione drinki.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      <ModalWrapper
        show={showModal}
        onClose={() => setShowModal(false)}
        title={isLogin ? "Zaloguj się" : "Zarejestruj się"}
      >
        <AuthForm isLogin={isLogin} onSwitchMode={() => setIsLogin(!isLogin)} />
      </ModalWrapper>
    </MainLayout>
  );
}

export default Home;
