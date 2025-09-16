import React, { useState } from "react";
import { useBooking } from "../context/BookingContext";
import { createCustomer, createBooking } from "../services/ApiService";
import { combineDateAndTimeToIso } from "../utils/date";
import { Form, Button } from "react-bootstrap";
import SpinnerInline from "./SpinnerInline";

export default function CustomerForm(){
  const { date, time, guests, selectedTable, customer, setCustomer, setBookingResult, next, back, reset } = useBooking();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!customer.name || !customer.phoneNumber) {
      setError("Fyll i namn och telefonnummer.");
      return;
    }

    const iso = combineDateAndTimeToIso(date, time);
    if (!iso) { setError("Datum/tid saknas."); return; }
    if (!selectedTable) { setError("Välj ett bord."); return; }

    setLoading(true);
    try {
      // create or reuse customer: createCustomer returns the created customer with id
      const createdCustomer = await createCustomer({ name: customer.name, phoneNumber: customer.phoneNumber });

      // create booking payload expected by API:
      const bookingDto = {
        tableId: selectedTable.id,
        customerId: createdCustomer.id,
        start: iso,
        guests: guests
      };

      const createdBooking = await createBooking(bookingDto);
      setBookingResult(createdBooking);
      next(); // go to confirmation
    } catch (err) {
      console.error(err);
      if (err.status === 400) {
        setError(err.body?.error || "Valideringsfel från servern.");
      } else {
        setError("Kunde inte skapa bokning. Försök igen.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h5>Kontaktuppgifter</h5>
      <Form onSubmit={submit}>
        <Form.Group className="mb-2">
          <Form.Label>Namn</Form.Label>
          <Form.Control value={customer.name} onChange={e => setCustomer(c => ({...c, name: e.target.value}))} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Telefonnummer</Form.Label>
          <Form.Control value={customer.phoneNumber} onChange={e => setCustomer(c => ({...c, phoneNumber: e.target.value}))} />
        </Form.Group>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="d-flex gap-2">
          <Button variant="secondary" onClick={back}>Tillbaka</Button>
          <Button variant="success" type="submit" disabled={loading}>
            Boka bord {loading && <SpinnerInline/>}
          </Button>
        </div>
      </Form>
    </div>
  );
}
