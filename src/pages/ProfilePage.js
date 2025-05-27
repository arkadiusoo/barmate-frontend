import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();
  const username = localStorage.getItem("userName") || "Anonimowy";
  const capitalizedName =
    username.charAt(0).toUpperCase() +  username.slice(1);

  return (
    <MainLayout>
      <Container className="py-4">
        <h2 className="mb-4 text-center">👋 Witaj, {capitalizedName}!</h2>

        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="mb-4 shadow-sm h-100">
              <Card.Body className="text-center">
                <Card.Title>🍷 Historia drinków</Card.Title>
                <Card.Text>
                  Przeglądaj, co i kiedy piłeś. Twoje ulubione przepisy, statystyki i więcej!
                </Card.Text>
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={() => navigate("/drink-history")}
                >
                  Pokaż historię
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={5}>
            <Card className="mb-4 shadow-sm h-100">
              <Card.Body className="text-center">
                <Card.Title>Preferencje smakowe</Card.Title>
                <Card.Text>
                  Ustaw swoje preferencje smakowe, ulubione alkohole oraz ulubione składniki.
                </Card.Text>
                <Button
                  variant="secondary"
                  className="w-100"
                  onClick={() => navigate("/preferences")}
                >
                  Edytuj preferencje
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
}

export default ProfilePage;
