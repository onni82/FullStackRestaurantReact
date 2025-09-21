export type Customer = {
  id?: number;
  name: string;
  phoneNumber: string;
}

export type Table = {
  id: number;
  tableNumber: number;
  capacity: number;
}

export type Booking = {
  id: number;
  tableId: number;
  customerId: number;
  start: string; // ISO string
  guests: number;
}

export type BookingResult = Booking;
