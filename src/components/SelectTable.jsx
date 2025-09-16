import React from "react";
import { useBooking } from "../context/BookingContext";
import { Button, Card } from "react-bootstrap";

export default function SelectTable(){
  const { availableTables, selectedTable, setSelectedTable, back, next, guests } = useBooking();

  if (!availableTables) return <div>Inga data</div>;

  return (
    <div>
      <h5>Välj bord (passar {guests} gäster)</h5>
      <div className="d-flex flex-wrap gap-2 my-3">
        {availableTables.map(t => (
          <Card key={t.id} style={{ width: 160 }} 
                className={`p-2 ${selectedTable?.id === t.id ? "border-primary" : ""}`}>
            <Card.Body>
              <Card.Title>Bord #{t.tableNumber}</Card.Title>
              <Card.Text>
                Kapacitet: {t.capacity}
              </Card.Text>
              <Button variant={selectedTable?.id === t.id ? "primary" : "outline-primary"}
                      onClick={() => setSelectedTable(t)}>
                {selectedTable?.id === t.id ? "Valt" : "Välj"}
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className="d-flex gap-2">
        <Button variant="secondary" onClick={back}>Tillbaka</Button>
        <Button variant="primary" onClick={next} disabled={!selectedTable}>Nästa</Button>
      </div>
    </div>
  );
}
