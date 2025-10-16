// api/api.js

// ✅ Use environment variable first, fallback to production backend
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://eaglesoakltd-backend.onrender.com";

// ✅ Unified request helper
async function request(endpoint, options = {}, timeoutMs = 10000) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem("authToken");

  const headers = {
    Accept: "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // Setup timeout controller (prevents infinite hang)
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    // ✅ Handle all HTTP errors with clear messages
    if (!response.ok) {
      let errorDetail = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorDetail =
          errorData.detail ||
          errorData.message ||
          `Error ${response.status}: ${response.statusText}`;
      } catch {
        // fallback if not JSON
      }
      throw new Error(errorDetail);
    }

    // ✅ Parse JSON automatically if returned
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return response.json();
    }

    return {};
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Network timeout — please check your connection.");
    }
    console.error("API request failed:", error);
    throw error;
  }
}

// ✅ Simplified HTTP helper functions
export const get = (endpoint) => request(endpoint);

export const post = (endpoint, body, contentType = "application/json") => {
  const options = {
    method: "POST",
    headers: { "Content-Type": contentType },
    body: contentType === "application/json" ? JSON.stringify(body) : body,
  };
  return request(endpoint, options);
};

export const postWithFiles = (endpoint, formData) =>
  request(endpoint, { method: "POST", body: formData });
