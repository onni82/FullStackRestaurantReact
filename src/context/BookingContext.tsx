import React, { createContext, useContext, useState } from "react";
import type { Customer, Table, BookingResult } from "../types";

type BookingContextType = {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  next: () => void;
  back: () => void;
  reset: () => void;

  date: string;
  setDate: (d: string) => void;
  time: string;
  setTime: (t: string) => void;
  guests: number;
  setGuests: (g: number) => void;

  availableTables: Table[];
  setAvailableTables: (tables: Table[]) => void;
  selectedTable: Table | null;
  setSelectedTable: (table: Table | null) => void;

  customer: Customer;
  setCustomer: React.Dispatch<React.SetStateAction<Customer>>;
  bookingResult: BookingResult | null;
  setBookingResult: (br: BookingResult | null) => void;
}

// shared booking state and helpers
const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(""); // yyyy-MM-dd
  const [time, setTime] = useState(""); // HH:mm
  const [guests, setGuests] = useState(2);
  const [availableTables, setAvailableTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [customer, setCustomer] = useState<Customer>({ name: "", phoneNumber: "" });
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null);

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

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
