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

export const toCamelCase = (string: string): string => {
  return string.replace(/(_[a-z])/g, (group) =>
    group.toUpperCase().replace("_", "")
  );
};

export const keysToCamelCase = (
  object: Record<string, unknown>
): Record<string, unknown> => {
  const newObject: Record<string, unknown> = {};
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      newObject[toCamelCase(key)] = object[key];
    }
  }

  return newObject;
};

export const toSnakeCase = (string: string): string => {
  return string.replace(/([a-z]|(?=[A-Z]))([A-Z])/g, "$1_$2").toLowerCase();
};

export const keysToSnakeCase = (
  object: Record<string, unknown>
): Record<string, unknown> => {
  const newObject: Record<string, unknown> = {};
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      newObject[toSnakeCase(key)] = object[key];
    }
  }

  return newObject;
};
