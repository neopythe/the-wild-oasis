import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import CabinRow from "@/features/cabins/CabinRow";
import { useCabins } from "@/features/cabins/useCabins";

import Spinner from "@/ui/Spinner";

import type { Cabin } from "@/types";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  const filterValue = searchParams.get("discount") || "all";
  console.log(filterValue);

  let filteredCabins: Cabin[] = [];

  if (cabins) {
    switch (filterValue) {
      case "discounted":
        filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
        break;
      case "standard":
        filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
        break;
      default:
        filteredCabins = cabins;
    }
  }

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {filteredCabins?.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}
    </Table>
  );
}

export default CabinTable;
