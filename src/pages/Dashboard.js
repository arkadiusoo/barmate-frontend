import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { handleLogout } from "../utils/logout";

function Dashboard({ onLogout }) {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail") || "Adam@gmail.com";
  const nameFromEmail = email.split("@")[0];
  const capitalizedName =
    nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

  return (
    <MainLayout>
      <Container fluid className="py-4">
        <h1 className="mb-4 text-center">👋 Witaj, {capitalizedName}!</h1>

        <Row className="mb-4">
          <Col md={6} lg={4}>
            <Card className="mb-3 shadow-sm h-100">
              <Card.Body>
                <Card.Title>🍸 Moje Składniki</Card.Title>
                <Card.Text>
                  Zarządzaj zapasami w swoim barze – dodawaj, edytuj i śledź
                  składniki.
                </Card.Text>
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={() => navigate("/ingredients")} // Zmieniono ścieżkę
                >
                  Zarządzaj składnikami
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="mb-3 shadow-sm h-100">
              <Card.Body>
                <Card.Title>🍹 Przepisy</Card.Title>
                <Card.Text>
                  Twórz, przeglądaj i zapisuj przepisy na drinki. Znajdź
                  inspiracje do nowych napojów!
                </Card.Text>
                <Button
                  variant="success"
                  className="w-100"
                  onClick={() => navigate("/recipes")}
                >
                  Zarządzaj przepisami
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="mb-3 shadow-sm h-100">
              <Card.Body>
                <Card.Title>📊 Analiza Użycia</Card.Title>
                <Card.Text>
                  Sprawdzaj, które składniki są najczęściej używane i które
                  drinki robisz najczęściej.
                </Card.Text>
                <Button
                  variant="info"
                  className="w-100"
                  onClick={() => navigate("/analytics")}
                >
                  Sprawdź analizę
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>🗺️ Widok BarMate</Card.Title>
                <Card.Text>
                  Widok podsumowania składników i przepisów – wkrótce!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>📅 Planowanie Zakupów</Card.Title>
                <Card.Text>Funkcja planowania zakupów – wkrótce!</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="text-center mt-5">
          <Button variant="outline-danger" onClick={handleLogout}>
            Wyloguj się
          </Button>
        </div>
      </Container>
    </MainLayout>
  );
}

export default Dashboard;