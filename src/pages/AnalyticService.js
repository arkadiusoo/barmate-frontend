import React, { useState, useEffect } from "react";
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
  const [activeIndex, setActiveIndex] = useState(null);
  const [chartUrl, setChartUrl] = useState(null);

  // Load history on mount
  useEffect(() => {
    fetch("http://localhost:8080/api/charts/history?userId=1")
      .then((res) => res.json())
      .then(setHistory)
      .catch((err) => console.error("Błąd pobierania historii:", err));
  }, []);

  const handleGenerate = () => {
    if (!selectedChart) return;

    fetch(
      `http://localhost:8080/api/charts/generate?chartType=${selectedChart}&userId=1`
    )
      .then((res) => res.blob())
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setChartUrl(imageUrl);
        const now = new Date().toLocaleString();
        setGenerationDate(now);
        setActiveIndex(history.length);

        // Odśwież historię po wygenerowaniu
        return fetch("http://localhost:8080/api/charts/history?userId=1");
      })
      .then((res) => res.json())
      .then(setHistory);
  };

  return (
    <MainLayout>
      <Container className="my-4">
        <Row>
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
                  <option value="ConsuptionInTime">
                    Liczba przygotowanych drinków
                  </option>
                  <option value="TheMostPopularRecipies">
                    Najpopularniejsze drinki
                  </option>
                  <option value="TheMostPopularIngredients">
                    Najczęściej używane składniki
                  </option>
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
                {chartUrl ? (
                  <img
                    src={chartUrl}
                    alt="Generated chart"
                    style={{ maxWidth: "100%", borderRadius: "8px" }}
                  />
                ) : (
                  <p className="text-muted">[Chart image placeholder]</p>
                )}
              </div>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm p-3">
              <h5 className="mb-3">📂 Historia</h5>
              {history.length === 0 ? (
                <p className="text-muted">Nie wygenerowano jeszcze wykresów.</p>
              ) : (
                <div style={{ maxHeight: "75vh", overflowY: "auto" }}>
                  <ListGroup>
                    {history.map((item, index) => (
                      <ListGroup.Item
                        key={item.id}
                        active={activeIndex === index}
                        onClick={() => {
                          setSelectedChart(item.chartType);
                          setActiveIndex(index);
                          setGenerationDate(
                            new Date(item.created).toLocaleString()
                          );
                          fetch(
                            `http://localhost:8080/api/charts/regenerate/${item.id}`
                          )
                            .then((res) => res.blob())
                            .then((blob) =>
                              setChartUrl(URL.createObjectURL(blob))
                            );
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <strong>{item.chartType}</strong>
                        <br />
                        <small className="text-muted">
                          {new Date(item.created).toLocaleString()}
                        </small>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default AnalyticsPage;
