import { formatDistance, parseISO } from "date-fns";
import { differenceInDays } from "date-fns/esm";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateString1: string, dateString2: string) =>
  differenceInDays(
    parseISO(String(dateString1)),
    parseISO(String(dateString2))
  );

export const formatDistanceFromNow = (dateString: string) =>
  formatDistance(parseISO(dateString), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value: number | undefined) => {
  if (value === undefined) return "$0.00";
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "CAD",
  })
    .format(value)
    .replace("CA", "");
};