interface Cabin {
  id: number;
  created_at: string;
  description?: string;
  discount?: number;
  image?: File | string;
  max_capacity?: number;
  name?: string;
  regular_price?: number;
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
