import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, ListGroup, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/shopping-list";

export default function ShoppingListPage() {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [selectedListId, setSelectedListId] = useState(null);

  const fetchLists = async () => {
    const userId = 1;
    const res = await axios.get(`${API_URL}/${userId}`);
    setLists(res.data);
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const createList = async () => {
    if (!newListName) return;
    await axios.post(API_URL, 1, {
    headers: {
        "Content-Type": "application/json"
    }
    });
    setNewListName("");
    fetchLists();
  };

  const deleteList = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchLists();
  };

  const addItem = async () => {
  if (!newItemName || !selectedListId) return;

  const shoppingItem = {
    name: newItemName,
    shoppingListId: selectedListId,
    amount: 1
  };

  await axios.post(`${API_URL}/${selectedListId}/items`, shoppingItem);

  setNewItemName("");
  fetchLists();
};

  const deleteItem = async (listId, itemId) => {
    await axios.delete(`${API_URL}/${listId}/items/${itemId}`);
    fetchLists();
  };

  return (
    <div className="container mt-5">
      <h2>🛒 Lista zakupów</h2>
      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Nazwa nowej listy"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Button onClick={createList}>➕ Dodaj listę</Button>
        </Col>
      </Row>

      {lists.map((list) => (
        <Card key={list.id} className="mb-3">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <span>{list.name || `Lista #${list.id}`}</span>
            <Button variant="danger" size="sm" onClick={() => deleteList(list.id)}>
              🗑 Usuń listę
            </Button>
          </Card.Header>
          <Card.Body>
            <ListGroup>
              {list.items?.map((item) => (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between">
                  {item.name}
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
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                />
              </Col>
              <Col>
                {/*
                <Button
                  variant="success"
                  onClick={() => {
                    setSelectedListId(list.id);
                    addItem();
                  }}
                >
                  ➕ Dodaj produkt
                </Button>
              */}
              </Col>
            </Row>
            
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

// Modyfikowany komponent do nawigacji:
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
