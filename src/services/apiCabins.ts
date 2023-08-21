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

export async function createCabin(
  newCabin: Omit<Partial<Cabin>, "image"> & { image: File }
) {
  const imageName = `${String(Math.random()).replace(".", "")}-${
    newCabin.image.name
  }`.replace("/", "");
  const imagePath = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/cabin-images/${imageName}`;

  // Create cabin
  const { error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // Delete cabin if image upload failed
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", newCabin.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
