import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export async function sendContactMessage(payload: ContactPayload) {
  const { data } = await api.post("/api/contact", payload);
  return data;
}
