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

export type { Cabin };
