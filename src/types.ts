interface Cabin {
  id: number;
  created_at: string;
  description?: string;
  discount?: number;
  image?: string;
  max_capacity?: number;
  name?: string;
  regular_price?: number;
}

export type { Cabin };
