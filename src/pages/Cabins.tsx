import CabinTable from "@/features/cabins/CabinTable";

import Division from "@/ui/Division";
import Heading from "@/ui/Heading";

function Cabins() {
  return (
    <>
      <Division>
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Division>
      <Division>
        <CabinTable />
      </Division>
    </>
  );
}

export default Cabins;
