export type AddFlight = {
  code: string;
  capacity: number;
  departureDate: string;
};

export type AddFlightWithPhoto = AddFlight & {
  photo?: File | null | undefined;
};
