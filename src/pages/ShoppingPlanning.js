import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShoppingListApp() {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [selectedListId, setSelectedListId] = useState(null);
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');

  const api = axios.create({
    baseURL: 'http://localhost:8080/shopping-list'
  });

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    // Brak endpointu na listowanie wszystkich list – trzeba dodać w backendzie
  };

  const createList = async () => {
    const res = await api.post('/', { name: newListName });
    setLists([...lists, res.data]);
    setNewListName('');
  };

  const getListDetails = async (id) => {
    const res = await api.get(`/${id}`);
    setSelectedListId(id);
    setItems(res.data.items || []);
  };

  const deleteList = async (id) => {
    await api.delete(`/${id}`);
    setLists(lists.filter(list => list.id !== id));
    if (selectedListId === id) setSelectedListId(null);
  };

  const addItem = async () => {
    const res = await api.post(`/${selectedListId}/items`, { name: newItemName });
    setItems([...items, res.data]);
    setNewItemName('');
  };

  const deleteItem = async (itemId) => {
    await api.delete(`/${selectedListId}/items/${itemId}`);
    setItems(items.filter(item => item.id !== itemId));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Lists</h1>

      <div className="mb-4">
        <input
          className="border p-2 mr-2"
          placeholder="New list name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={createList}>Create List</button>
      </div>

      <ul className="mb-4">
        {lists.map(list => (
          <li key={list.id} className="mb-2">
            <button className="underline text-blue-700 mr-2" onClick={() => getListDetails(list.id)}>
              {list.name || `List ${list.id}`}
            </button>
            <button className="text-red-500" onClick={() => deleteList(list.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedListId && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Items in List #{selectedListId}</h2>

          <ul className="mb-2">
            {items.map(item => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <button className="text-red-500" onClick={() => deleteItem(item.id)}>Delete</button>
              </li>
            ))}
          </ul>

          <input
            className="border p-2 mr-2"
            placeholder="New item name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <button className="bg-green-500 text-white px-4 py-2" onClick={addItem}>Add Item</button>
        </div>
      )}
    </div>
  );
}
