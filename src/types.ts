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

export type UserSignup = {
  name: string;
  email: string;
  password: string;
};

export type SignupRes = {
  id: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
};

export type RequestError = {
  code: number;
  type: string;
  message: string;
};
