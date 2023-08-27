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
  created_at: string;
  min_booking_length: number;
  max_booking_length: number;
  max_guests_per_booking: number;
  breakfast_price: number;
}

export type { Cabin, Settings };
