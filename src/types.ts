interface Cabin {
  id: number;
  createdAt: string;
  description: string;
  discount: number;
  image: File | string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}

interface Settings {
  id: number;
  createdAt: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

export type { Cabin, Settings };
