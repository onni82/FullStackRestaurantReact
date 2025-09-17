import { useBooking } from "../context/BookingContext";
import { ProgressBar as BSProgress } from "react-bootstrap";

export default function ProgressBar(){
  const { step } = useBooking();
  const pct = (step-1) / 3 * 100;
  return (
    <>
      <div className="d-flex justify-content-between mb-2 small">
        <div>1. Tid</div><div>2. Bord</div><div>3. Kontakt</div><div>4. Bekräftelse</div>
      </div>
      <BSProgress now={pct} animated />
    </>
  );
}
