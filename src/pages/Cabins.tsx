import { useState } from "react";

import CabinTable from "@/features/cabins/CabinTable";
import CabinTableOperations from "@/features/cabins/CabinTableOperations";
import CreateCabinForm from "@/features/cabins/CreateCabinForm";

import Button from "@/ui/Button";
import Division from "@/ui/Division";
import Heading from "@/ui/Heading";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Division>
        <Heading $as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Division>
      <Division $type={"vertical"}>
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new cabin
        </Button>
        {showForm && <CreateCabinForm />}
      </Division>
    </>
  );
}

export default Cabins;
