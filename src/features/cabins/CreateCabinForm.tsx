import { useForm } from "react-hook-form";

import type { FieldErrors } from "react-hook-form";

import { useCreateCabin } from "@/features/cabins/useCreateCabin";
import { useUpdateCabin } from "@/features/cabins/useUpdateCabin";

import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";

import type { Cabin } from "@/types";

type FormData = Partial<Omit<Cabin, "image">> & {
  image: File[] | File | string;
}; // When updating, image will be a string

interface CreateCabinFormProps {
  cabin?: Cabin;
}

function CreateCabinForm({ cabin }: CreateCabinFormProps) {
  const { ...updateValues } = cabin || {};

  const isUpdateSession = Boolean(cabin);

  const { formState, getValues, handleSubmit, register, reset } =
    useForm<FormData>({
      defaultValues: isUpdateSession ? updateValues : {},
    });

  const { errors } = formState;

  const { createCabin, isCreating } = useCreateCabin();
  const { updateCabin, isUpdating } = useUpdateCabin();

  const isManaging = isCreating || isUpdating;

  function onSubmit(data: FormData) {
    const id = cabin?.id as number;

    const newCabin = {
      ...data,
      image:
        typeof data.image === "string" ? data.image : (data.image as File[])[0],
    };

    if (isUpdateSession)
      updateCabin({ newCabin, id }, { onSuccess: () => reset() });
    else createCabin(newCabin, { onSuccess: () => reset() });
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
              if (value! > +getValues("regularPrice")!)
                return "Discount cannot be greater than regular price";

              if (value! < 0) return "Discount cannot be negative";

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
            required: isUpdateSession ? false : "This field is required",
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
            {isUpdateSession ? "Update cabin" : "Create new cabin"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
