import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";
import MainLayout from "../layouts/MainLayout";

const AnalyticsPage = () => {
  const [selectedChart, setSelectedChart] = useState("");
  const [generationDate, setGenerationDate] = useState(null);
  const [history, setHistory] = useState([]);

  const handleGenerate = () => {
    if (!selectedChart) return;
    const now = new Date().toLocaleString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    setGenerationDate(now);
    setHistory((prev) => [...prev, { type: selectedChart, date: now }]);
  };

  return (
    <MainLayout>
      <Container className="my-4">
        <Row>
          {/* Main analytic section */}
          <Col lg={8}>
            <Card className="p-4 shadow-sm">
              <h2 className="text-center mb-4">📊 Statystyki</h2>

              <Form.Group controlId="chartType" className="mb-3">
                <Form.Label>Wybierz typ wykresu:</Form.Label>
                <Form.Select
                  value={selectedChart}
                  onChange={(e) => setSelectedChart(e.target.value)}
                >
                  <option value="">-- Wybierz opcję --</option>
                  <option value="preparedDrinks">
                    Number of prepared drinks
                  </option>
                  <option value="topRecipes1">Top 1 most popular drinks</option>
                  <option value="topRecipes2">Top 2 most popular drinks</option>
                  <option value="topRecipes3">Top 3 most popular drinks</option>
                </Form.Select>
              </Form.Group>

              <Button
                variant="primary"
                className="w-100 mb-3"
                onClick={handleGenerate}
              >
                Generuj wykres
              </Button>

              {generationDate && (
                <p className="text-muted text-center">
                  Data wygenerowania: <strong>{generationDate}</strong>
                </p>
              )}

              <div className="border rounded p-3 bg-light text-center">
                {selectedChart && generationDate ? (
                  <img
                    src="/path-to-generated-chart.png"
                    alt="Generated chart"
                    style={{ maxWidth: "100%", borderRadius: "8px" }}
                  />
                ) : (
                  <p className="text-muted">[Chart image placeholder]</p>
                )}
              </div>
            </Card>
          </Col>

          {/* History section */}
          <Col lg={4}>
            <Card className="shadow-sm p-3">
              <h5 className="mb-3">📂 Historia</h5>
              {history.length === 0 ? (
                <p className="text-muted">Nie wygenerowano jeszcze wykresów.</p>
              ) : (
                <ListGroup>
                  {history.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      onClick={() => {
                        setSelectedChart(item.type);
                        setGenerationDate(item.date);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <strong>{item.type}</strong>
                      <br />
                      <small className="text-muted">{item.date}</small>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default AnalyticsPage;
