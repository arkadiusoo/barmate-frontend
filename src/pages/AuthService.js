const API_URL = 'http://localhost:8081';

export const authService = {
  async login(username, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) throw new Error('Nieprawidłowy login lub hasło');
    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
  },

  async register(username, password, email) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email }),
    });

    if (!response.ok) throw new Error('Błąd rejestracji');
    return await response.text();
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('userEmail');
    localStorage.setItem('isLoggedIn', 'false');
  },
};

