import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import type { FieldErrors } from "react-hook-form";

import { createCabin } from "@/services/apiCabins";

import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";

import { Cabin } from "@/types";

type FormData = {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList;
};

function CreateCabinForm() {
  const { formState, getValues, handleSubmit, register, reset } =
    useForm<FormData>();

  const { errors } = formState;

  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries(["cabins"]);
      reset();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  function onSubmit(data: FormData) {
    const newCabin: Partial<Cabin> = {
      description: data.description,
      discount: data.discount,
      max_capacity: data.maxCapacity,
      name: data.name,
      regular_price: data.regularPrice,
    };

    mutate(newCabin);
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
          disabled={isCreating}
          {...register("name", {
            required: "Cabin name is required",
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" disabled={isCreating} />
      </FormRow>
      <FormRow>
        <>
          {/* type is an HTML attribute! */}
          <Button $variation="secondary" type="reset">
            Cancel
          </Button>
          <Button disabled={isCreating}>Add cabin</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
