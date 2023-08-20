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

export async function createCabin(newCabin: Partial<Cabin>) {
  const { error } = await supabase.from("cabins").insert([newCabin]).select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
