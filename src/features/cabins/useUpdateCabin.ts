import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { manageCabin } from "@/services/apiCabins";

import type { Cabin } from "@/types";

function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: ({ newCabin, id }: { newCabin: Partial<Cabin>; id: number }) =>
      manageCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin successfully updated");
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { updateCabin, isUpdating };
}

export { useUpdateCabin };
