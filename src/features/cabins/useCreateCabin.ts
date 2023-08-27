import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { manageCabin } from "@/services/apiCabins";

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: manageCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { createCabin, isCreating };
}

export { useCreateCabin };
