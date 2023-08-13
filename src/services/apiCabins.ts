import supabase from "@/services/supabase";

import type { PostgrestError } from "@supabase/supabase-js";

import type { Cabin } from "@/types";

export async function getCabins() {
  const {
    data,
    error,
  }: {
    data: Cabin[] | null;
    error: PostgrestError | null;
  } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
