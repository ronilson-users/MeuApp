const API_URL = 'http://192.168.0.14:4000';

export const loginUser = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  console.log('loginUser', res.json);
  
  return res.json();
};

export const validateToken = async (token) => {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};