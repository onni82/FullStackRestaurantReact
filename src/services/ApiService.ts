import type { Customer, Table, Booking } from "../types"

const API_BASE = import.meta.env.VITE_API_URL || "https://localhost:7232";

async function handleRes<T>(res: Response): Promise<T> {
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw { status: res.status, body: data };
  return data;
}

export async function getAvailableTables(startIso: string, guests: number, signal?: AbortSignal): Promise<Table[]> {
  // GET /api/Tables/available?start={start}&guests={guests}
  const url = new URL(`${API_BASE}/api/Tables/available`);
  url.searchParams.set("start", startIso);
  url.searchParams.set("guests", String(guests));
  const res = await fetch(url.toString(), { method: "GET", signal });
  return handleRes<Table[]>(res);
}

export async function createCustomer(customer: Omit<Customer, "id">): Promise<Customer> {
  const res = await fetch(`${API_BASE}/api/Customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer)
  });
  return handleRes(res);
}

export async function createBooking(dto: {tableId: number, customerId: number, start: string, guests: number}): Promise<Booking> {
  const res = await fetch(`${API_BASE}/api/Bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto)
  });
  return handleRes<Booking>(res);
}
