import { useSettings } from "@/features/settings/useSettings";

import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import Spinner from "@/ui/Spinner";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();

  let minBookingLength: number | undefined;
  let maxBookingLength: number | undefined;
  let maxGuestsPerBooking: number | undefined;
  let breakfastPrice: number | undefined;

  if (settings) {
    ({
      min_booking_length: minBookingLength,
      max_booking_length: maxBookingLength,
      max_guests_per_booking: maxGuestsPerBooking,
      breakfast_price: breakfastPrice,
    } = settings);
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input type="number" id="min-nights" defaultValue={minBookingLength} />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input type="number" id="max-nights" defaultValue={maxBookingLength} />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
