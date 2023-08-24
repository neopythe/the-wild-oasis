import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import type { FieldErrors } from "react-hook-form";

import { manageCabin } from "@/services/apiCabins";

import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";

import type { Cabin } from "@/types";

type FormData = {
  id?: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: File[] | File | string; // When editing, image will be a string
};

interface CreateCabinFormProps {
  cabin?: Cabin;
}

let isEditSession = false;
let id: number;
let image: File | string | undefined;
let maxCapacity: number | undefined;
let regularPrice: number | undefined;
let rest: Partial<Cabin>;

function CreateCabinForm({ cabin }: CreateCabinFormProps) {
  if (cabin) {
    ({
      id,
      image,
      max_capacity: maxCapacity,
      regular_price: regularPrice,
      ...rest
    } = cabin);
    isEditSession = true;
  }

  const { formState, getValues, handleSubmit, register, reset } =
    useForm<FormData>({
      defaultValues: isEditSession
        ? {
            id,
            image,
            maxCapacity,
            regularPrice,
            ...rest,
          }
        : {},
    });

  const { errors } = formState;

  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: manageCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries(["cabins"]);
      reset();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabin, id }: { newCabin: Partial<Cabin>; id: number }) =>
      manageCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries(["cabins"]);
      reset();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const isManaging = isCreating || isEditing;

  function onSubmit(data: FormData) {
    const newCabin = {
      description: data.description,
      discount: data.discount,
      image:
        typeof data.image === "string" ? data.image : (data.image as File[])[0],
      max_capacity: data.maxCapacity,
      name: data.name,
      regular_price: data.regularPrice,
    };

    if (isEditSession) editCabin({ newCabin, id });
    else createCabin(newCabin);
  }

  function onError(errors: FieldErrors<FormData>) {
    console.error(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isManaging}
          {...register("name", {
            required: "Cabin name is required",
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isManaging}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          defaultValue={0}
          disabled={isManaging}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be a positive amount",
            },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isManaging}
          {...register("discount", {
            required: "This field is required",
            validate: (value) => {
              if (value > +getValues("regularPrice"))
                return "Discount cannot be greater than regular price";

              if (value < 0) return "Discount cannot be negative";

              return true;
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isManaging}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isManaging}
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>
      <FormRow>
        <>
          {/* type is an HTML attribute! */}
          <Button $variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isManaging}>
            {isEditSession ? "Edit cabin" : "Create new cabin"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
