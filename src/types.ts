type FlightStatus = 'none' | 'processing' | 'ready';

export type AddFlight = {
  code: string;
  capacity: number;
  departureDate: string;
};

export type AddFlightWithPhoto = AddFlight & {
  photo?: File | null | undefined;
};

export type Flight = {
  id: string;
  code: string;
  capacity: number;
  departureDate: string; // Alternatively, you might use `Date` if the date is parsed
  status: FlightStatus;
  img: string;
};
