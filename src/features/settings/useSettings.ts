import { useQuery } from "@tanstack/react-query";

import { getSettings } from "@/services/apiSettings";

function useSettings() {
  const { data: settings, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, settings };
}
export { useSettings };
