import supabase from "@/services/supabase";

import type { PostgrestError } from "@supabase/supabase-js";

import type { Settings } from "@/types";

export async function getSettings() {
  const {
    data,
    error,
  }: {
    data: Settings | null;
    error: PostgrestError | null;
  } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting: Settings) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }

  return data;
}
