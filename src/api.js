const API_URL = 'http://localhost:8000/api';

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('access_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  // Try to parse error body if any
  if (!res.ok) {
    let errBody = {};
    try {
      errBody = await res.json();
    } catch {
      // If body is empty or invalid, leave errBody as empty object
    }
    throw errBody;
  }

  // If no content (204 or 205), return null
  if (res.status === 204 || res.status === 205) {
    return null;
  }

  return res.json();
}
