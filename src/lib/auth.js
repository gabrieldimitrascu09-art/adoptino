const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.adoptino.ro';

export async function loginUser(email, password) {
  try {
    const res = await fetch(`${API_URL}/api/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: email, password }),
    });
    const data = await res.json();
    if (data.error) return { error: data.error.message || 'Email sau parolă incorectă.' };
    return { user: data.user, jwt: data.jwt };
  } catch (err) {
    return { error: 'Eroare de conexiune. Încearcă din nou.' };
  }
}

export async function registerUser({ username, email, password }) {
  try {
    const res = await fetch(`${API_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (data.error) return { error: data.error.message || 'Eroare la înregistrare.' };
    return { user: data.user, jwt: data.jwt };
  } catch (err) {
    return { error: 'Eroare de conexiune. Încearcă din nou.' };
  }
}

export function saveAuth(jwt, user) {
  localStorage.setItem('adoptino-jwt', jwt);
  localStorage.setItem('adoptino-user', JSON.stringify(user));
}

export function getAuth() {
  if (typeof window === 'undefined') return null;
  const jwt = localStorage.getItem('adoptino-jwt');
  const user = localStorage.getItem('adoptino-user');
  if (!jwt || !user) return null;
  try { return { jwt, user: JSON.parse(user) }; } catch { return null; }
}

export function logout() {
  localStorage.removeItem('adoptino-jwt');
  localStorage.removeItem('adoptino-user');
}