const API_BASE = import.meta.env.VITE_API_URL || "https://localhost:7232";

async function handleRes(res) {
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw { status: res.status, body: data };
  return data;
}

export async function getAvailableTables(startIso, guests, signal) {
  // GET /api/Tables/available?start={start}&guests={guests}
  const url = new URL(`${API_BASE}/api/Tables/available`);
  url.searchParams.set("start", startIso);
  url.searchParams.set("guests", guests);
  const res = await fetch(url.toString(), { method: "GET", signal });
  return handleRes(res);
}

export async function createCustomer(customer) {
  const res = await fetch(`${API_BASE}/api/Customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer)
  });
  return handleRes(res);
}

export async function createBooking(dto) {
  const res = await fetch(`${API_BASE}/api/Bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto)
  });
  return handleRes(res);
}
