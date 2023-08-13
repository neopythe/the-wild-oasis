import { useEffect } from "react";

import { getCabins } from "@/services/apiCabins";

import Division from "@/ui/Division";
import Heading from "@/ui/Heading";

function Cabins() {
  useEffect(() => {
    getCabins().then((cabins) => console.log(cabins));
  }, []);

  return (
    <Division>
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img src="https://sghuourgqtupxysrqqzk.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg" />
    </Division>
  );
}

export default Cabins;
