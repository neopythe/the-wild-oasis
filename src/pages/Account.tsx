import Division from "@/ui/Division";
import Heading from "@/ui/Heading";

function Account() {
  return (
    <>
      <Heading $as="h1">Update your account</Heading>
      <Division>
        <Heading $as="h3">Update user data</Heading>
        <p>Update user data form</p>
      </Division>
      <Division>
        <Heading $as="h3">Update password</Heading>
        <p>Update user password form</p>
      </Division>
    </>
  );
}

export default Account;
