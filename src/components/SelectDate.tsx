import { useState } from "react";
import { useBooking } from "../context/BookingContext";
import { combineDateAndTimeToIso } from "../utils/date";
import { getAvailableTables } from "../services/ApiService";
import { Button, Form } from "react-bootstrap";
import SpinnerInline from "./SpinnerInline";

export default function SelectDate(){
  const {
    date, setDate, time, setTime, guests, setGuests,
    setAvailableTables, setSelectedTable, next, back
  } = useBooking();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAvailable = async () => {
    setError("");
    const iso = combineDateAndTimeToIso(date, time);
    if (!iso) { setError("Vänligen ange datum och tid."); return; }
    if (!guests || guests < 1) { setError("Ange antal gäster."); return; }

    setLoading(true);
    setSelectedTable(null);

    const ac = new AbortController();
    try {
      const res = await getAvailableTables(iso, guests, ac.signal);
      setAvailableTables(res || []);
      if (!res || res.length === 0) setError("Inga lediga bord för valt tid.");
      else next();
    } catch (err: any) {
      console.error(err);
      setError(err?.body?.error || "Kunde inte hämta tillgängliga bord.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-2">
          <Form.Label>Datum</Form.Label>
          <Form.Control type="date" value={date} onChange={e => setDate(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Tid</Form.Label>
          <Form.Control type="time" value={time} onChange={e => setTime(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Antal gäster</Form.Label>
          <Form.Control type="number" min="1" max="20" value={guests} onChange={e => setGuests(Number(e.target.value))} />
        </Form.Group>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={back}>Tillbaka</Button>
          <Button variant="primary" onClick={fetchAvailable} disabled={loading}>
            Sök lediga bord {loading && <SpinnerInline/>}
          </Button>
        </div>
      </Form>
    </div>
  );
}
