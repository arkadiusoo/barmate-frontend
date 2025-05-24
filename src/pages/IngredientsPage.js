import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import IngredientsManager from "../components/IngredientsManager";

function IngredientsPage() {
  const navigate = useNavigate();

  return (
    <Container className="py-4">
      <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>
        ⬅ Powrót
      </Button>
      <IngredientsManager />
    </Container>
  );
}

export default IngredientsPage;