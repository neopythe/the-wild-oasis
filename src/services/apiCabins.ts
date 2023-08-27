import supabase from "@/services/supabase";

import type { PostgrestError } from "@supabase/supabase-js";

import { keysToCamelCase, keysToSnakeCase } from "@/utils/helpers";

import type { Cabin } from "@/types";

export async function getCabins() {
  const {
    data,
    error,
  }: {
    data: Record<string, unknown>[] | null;
    error: PostgrestError | null;
  } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data
    ? data.map((cabin) => keysToCamelCase(cabin) as unknown as Cabin)
    : null;
}

export async function manageCabin(
  newCabin: Partial<Cabin>,
  id?: number | undefined
) {
  const hasImagePath = typeof newCabin.image === "string";

  const imageName = `${String(Math.random()).replace(".", "")}-${
    (newCabin.image as File).name
  }`.replace("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/cabin-images/${imageName}`;

  let query;

  // Create cabin
  if (!id)
    query = supabase
      .from("cabins")
      .insert([{ ...keysToSnakeCase(newCabin), image: imagePath }]);
  // Update cabin
  else
    query = supabase
      .from("cabins")
      .update({ ...keysToSnakeCase(newCabin), image: imagePath })
      .eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin management unsuccessful");
  }

  // Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image as File);

  // Delete cabin if image upload failed
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", newCabin.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}
