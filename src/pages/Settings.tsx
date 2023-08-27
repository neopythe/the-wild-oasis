import UpdateSettingsForm from "@/features/settings/UpdateSettingsForm";

import Division from "@/ui/Division";
import Heading from "@/ui/Heading";

function Settings() {
  return (
    <Division $type="vertical">
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Division>
  );
}

export default Settings;
