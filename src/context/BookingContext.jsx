import React, { createContext, useContext, useState } from "react";

// shared booking state and helpers
const BookingContext = createContext();

export function BookingProvider({ children }){
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(""); // yyyy-MM-dd
  const [time, setTime] = useState(""); // HH:mm
  const [guests, setGuests] = useState(2);
  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [customer, setCustomer] = useState({ name: "", phoneNumber: "" });
  const [bookingResult, setBookingResult] = useState(null);

  const next = () => setStep(s => Math.min(4, s+1));
  const back = () => setStep(s => Math.max(1, s-1));
  const reset = () => {
    setStep(1);
    setDate("");
    setTime("");
    setGuests(2);
    setAvailableTables([]);
    setSelectedTable(null);
    setCustomer({ name: "", phoneNumber: "" });
    setBookingResult(null);
  };

  return (
    <BookingContext.Provider value={{
      step, setStep, next, back, reset,
      date, setDate, time, setTime, guests, setGuests,
      availableTables, setAvailableTables, selectedTable, setSelectedTable,
      customer, setCustomer, bookingResult, setBookingResult
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
