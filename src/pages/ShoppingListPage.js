import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, ListGroup, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
const API_URL = "http://localhost:8083/shopping-list";

export default function ShoppingListPage() {
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  //const [newListName, setNewListName] = useState("");
  const [expandedLists, setExpandedLists] = useState({});
  const [itemInputs, setItemInputs] = useState({});
  const updateItemInput = (listId, field, value) => {
    setItemInputs((prev) => ({
      ...prev,
      [listId]: {
        ...prev[listId],
        [field]: value,
      },
    }));
  };

      const toggleCheckItem = async (listId, itemId, isChecked) => {
      try {
        if (!isChecked) {
          await axios.put(`${API_URL}/${listId}/item/${itemId}`);
          fetchLists();
        }
      } catch (error) {
        console.error("Nie udało się zaktualizować stanu produktu", error);
      }
    };

  const fetchLists = async () => {
    const userId = 1;
    try {
      const res = await axios.get(`${API_URL}/user/${userId}`);
      console.log(res.data);
      setLists(res.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          console.warn("Lista zakupów nie została znaleziona.");
          // Możesz pokazać komunikat w UI, np:
          // setErrorMessage("Nie znaleziono listy zakupów.");
        } else {
          console.error(`Błąd: ${error.response.status}`, error.response.data);
        }
      } else if (error.request) {
        console.error("Brak odpowiedzi od serwera", error.request);
      } else {
        console.error("Błąd w ustawieniu zapytania", error.message);
      }
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const createList = async () => {
    //if (!newListName) return;
    await axios.post(API_URL, 1, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    //setNewListName("");
    fetchLists();
  };

  const deleteList = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchLists();
  };

  const toggleExpandList = (listId) => {
    setExpandedLists((prev) => ({
      ...prev,
      [listId]: !prev[listId],
    }));
  };

  const addItem = async (listId) => {
    const input = itemInputs[listId];
    console.log(input);
    if (!input?.itemName || !input?.itemAmount) return;
    const currentList = lists.find((list) => list.id === listId);
    const shoppingItem = {
      ingredientName: input.itemName,
      amount: input.itemAmount,
      unit: input.itemUnit || "szt.",
      checked: false,
      //userId: 1,
      shoppingListId: currentList.id,
    };
    lists.map((list) => {
      console.log("Id listy: ", list.id === listId);
    });

    await axios.post(`${API_URL}/${listId}/items`, shoppingItem);
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          items: [...(list.items || []), shoppingItem],
        };
      }
      return list;
    });
    /*
    await axios.put(`${API_URL}/${listId}`, {
        userId: 1,
        items: updatedLists
    });*/

    fetchLists();

    // Wyczyść tylko dane dla tej listy
    setItemInputs((prev) => ({
      ...prev,
      [listId]: { itemName: "", itemAmount: "" },
    }));
  };

  const deleteItem = async (listId, itemId) => {
    await axios.delete(`${API_URL}/${listId}/items/${itemId}`);
    fetchLists();
  };

  return (
    <MainLayout>
      <div className="container mt-5">
        <Button
          variant="secondary"
          className="mb-3"
          onClick={() => navigate(-1)}
        >
          ⬅ Powrót
        </Button>

        <h2>🛒 Lista zakupów</h2>
        <Row className="mb-4">
          <Col md={6}>
            {/*
          <Form.Control
            type="text"
            placeholder="Nazwa nowej listy"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />*/}
          </Col>
          <Col md={3}>
            <Button onClick={createList}>➕ Dodaj listę</Button>
          </Col>
        </Row>

        {lists.map((list) => {
          return (
            <Card key={list.id} className="mb-3">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <span
                  onClick={() => toggleExpandList(list.id)}
                  style={{ cursor: "pointer" }}
                >
                  {expandedLists[list.id] ? "🔽" : "▶️"}{" "}
                  {list.name || `Lista #${list.id}`}
                </span>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteList(list.id)}
                >
                  🗑 Usuń listę
                </Button>
              </Card.Header>
              {expandedLists[list.id] && (
                <Card.Body>
                  <ListGroup>
                    {list.items?.map((item) => (
                      <ListGroup.Item
                        key={item.id}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <div className="d-flex align-items-center">
                          <Form.Check
                            type="checkbox"
                            className="me-2"
                            checked={item.checked}
                            onChange={() =>
                              toggleCheckItem(list.id, item.id, item.checked)
                            }
                          />
                          <span
                            style={{
                              textDecoration: item.checked ? "line-through" : "none",
                              color: item.checked ? "black" : "inherit",
                            }}
                          >
                            {item.ingredientName} — {item.amount} {item.unit}
                          </span>
                        </div>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => deleteItem(list.id, item.id)}
                        >
                          ✖
                        </Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  <Row className="mt-3">
                    <Col>
                      <Form.Control
                        type="text"
                        placeholder="Nazwa produktu"
                        value={itemInputs[list.id]?.itemName || ""}
                        onChange={(e) =>
                          updateItemInput(list.id, "itemName", e.target.value)
                        }
                      />
                      <Form.Control
                        className="mt-2"
                        type="number"
                        placeholder="Ilość"
                        value={itemInputs[list.id]?.itemAmount || ""}
                        onChange={(e) =>
                          updateItemInput(list.id, "itemAmount", e.target.value)
                        }
                      />
                      <Form.Select
                        className="mt-2"
                        value={itemInputs[list.id]?.itemUnit || "szt."}
                        onChange={(e) =>
                          updateItemInput(list.id, "itemUnit", e.target.value)
                        }
                      >
                        <option value="ml">ml</option>
                        <option value="l">l</option>
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                        <option value="szt.">szt.</option>
                      </Form.Select>
                    </Col>
                    <Col>
                      <Button
                        variant="success"
                        onClick={() => addItem(list.id)}
                      >
                        ➕ Dodaj produkt
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              )}
            </Card>
          );
        })}
      </div>
    </MainLayout>
  );
}

// Komponent do nawigacji
export function ShoppingPlannerCard() {
  const navigate = useNavigate();
  return (
    <Col md={6}>
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title>📅 Planowanie Zakupów</Card.Title>
          <Card.Text>Funkcja planowania zakupów</Card.Text>
          <Button
            variant="info"
            className="w-100"
            onClick={() => navigate("/shopping-list")}
          >
            Zaplanuj zakupy
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
