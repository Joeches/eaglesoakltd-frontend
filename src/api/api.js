const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('authToken');
  
  const headers = { ...options.headers };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = { ...options, headers };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'An unknown API error occurred' }));
    throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
  }
  
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  }
  return {};
}

export const get = (endpoint) => request(endpoint);

export const post = (endpoint, body, contentType = 'application/json') => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': contentType },
    body: contentType === 'application/json' ? JSON.stringify(body) : body,
  };
  return request(endpoint, options);
};

export const postWithFiles = (endpoint, formData) => {
  const options = {
    method: 'POST',
    body: formData,
  };
  return request(endpoint, options);
};

