// src/utils/safeFetch.js
export async function safeFetch(url, fallbackData = [], options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("Backend returned an error");
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`⚠️ safeFetch fallback for ${url}:`, err.message);
    return fallbackData;
  }
}
