import React from "react";
import SelectDate from "./components/SelectDate";
import SelectTable from "./components/SelectTable";
import CustomerForm from "./components/CustomerForm";
import Confirmation from "./components/Confirmation";
import ProgressBar from "./components/ProgressBar";
import { useBooking } from "./context/BookingContext";
import { Container, Card } from "react-bootstrap";

export default function App(){
  const { step } = useBooking();

  return (
    <Container className="py-4">
      <Card className="p-3 shadow-sm">
        <h1 className="mb-3">Kims kök — Bordsbokning</h1>
        <ProgressBar />
        <div className="mt-3">
          {step === 1 && <SelectDate />}
          {step === 2 && <SelectTable />}
          {step === 3 && <CustomerForm />}
          {step === 4 && <Confirmation />}
        </div>
      </Card>
    </Container>
  );
}
