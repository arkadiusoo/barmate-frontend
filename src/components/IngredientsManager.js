import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

function IngredientsManager() {
  const [ingredients, setIngredients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "ALCOHOL", // Domyślna wartość
    amount: "",
    unit: "ml", // Domyślna wartość
  });

  const fetchIngredients = async () => {
    try {
      const response = await axios.get("http://localhost:8082/ingredients");
      setIngredients(response.data);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (currentIngredient) {
        // Aktualizacja składnika
        await axios.put(
          `http://localhost:8082/ingredients/${currentIngredient.id}`,
          formData
        );
      } else {
        // Dodanie nowego składnika
        await axios.post("http://localhost:8082/ingredients", formData);
      }
      fetchIngredients();
      setShowModal(false);
      setFormData({
        name: "",
        category: "ALCOHOL",
        amount: "",
        unit: "ml",
      });
      setCurrentIngredient(null);
    } catch (error) {
      console.error("Error saving ingredient:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/ingredients/${id}`);
      fetchIngredients();
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    }
  };

  const openModal = (ingredient = null) => {
    setCurrentIngredient(ingredient);
    setFormData(
      ingredient || {
        name: "",
        category: "ALCOHOL",
        amount: "",
        unit: "ml",
      }
    );
    setShowModal(true);
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Zarządzaj składnikami</h2>
      <Button onClick={() => openModal()} className="mb-3">
        Dodaj składnik
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Kategoria</th>
            <th>Ilość</th>
            <th>Jednostka</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <tr key={ingredient.id}>
              <td>{ingredient.name}</td>
              <td>{ingredient.category}</td>
              <td>{ingredient.amount}</td>
              <td>{ingredient.unit}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => openModal(ingredient)}
                  className="me-2"
                >
                  Edytuj
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(ingredient.id)}
                >
                  Usuń
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentIngredient ? "Edytuj składnik" : "Dodaj składnik"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nazwa</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Kategoria</Form.Label>
              <Form.Select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="ALCOHOL">Alkohol</option>
                <option value="MIXER">Mikser</option>
                <option value="FRUIT">Owoce</option>
                <option value="OTHER">Inne</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ilość</Form.Label>
              <Form.Control
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Jednostka</Form.Label>
              <Form.Select
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
              >
                <option value="ml">ml</option>
                <option value="l">l</option>
                <option value="g">g</option>
                <option value="kg">kg</option>
                <option value="szt">szt</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Anuluj
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Zapisz
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default IngredientsManager;