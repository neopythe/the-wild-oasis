import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { manageCabin } from "@/services/apiCabins";

import type { Cabin } from "@/types";

function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabin, id }: { newCabin: Partial<Cabin>; id: number }) =>
      manageCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { editCabin, isEditing };
}

export { useEditCabin };
