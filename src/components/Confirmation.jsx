import React from "react";
import { useBooking } from "../context/BookingContext";
import { Button } from "react-bootstrap";

export default function Confirmation(){
  const { bookingResult, reset } = useBooking();

  if (!bookingResult) {
    return (
      <div>
        <h3>Bokningen misslyckades</h3>
        <p>Ingen information hittades.</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Tack — din bokning är registrerad!</h3>
      <p>Bekräftelse-ID: <strong>{bookingResult.id}</strong></p>
      <p>Bord: <strong>#{bookingResult.tableId}</strong></p>
      <p>Start: <strong>{new Date(bookingResult.start).toLocaleString()}</strong></p>
      <p>Antal gäster: <strong>{bookingResult.guests}</strong></p>

      <div className="mt-3">
        <Button variant="primary" onClick={reset}>Gör ny bokning</Button>
      </div>
    </div>
  );
}
