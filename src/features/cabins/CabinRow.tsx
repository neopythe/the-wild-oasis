import { useState } from "react";
import styled from "styled-components";

import CreateCabinForm from "@/features/cabins/CreateCabinForm";
import { useDeleteCabin } from "@/features/cabins/useDeleteCabin";

import { formatCurrency } from "@/utils/helpers";

import type { Cabin } from "@/types";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

interface CabinRowProps {
  cabin: Cabin;
}

function CabinRow({ cabin }: CabinRowProps) {
  const {
    discount,
    id: cabinId,
    image,
    max_capacity: maxCapacity,
    name,
    regular_price: regularPrice,
  } = cabin as Omit<Cabin, "image"> & { image: string | undefined };

  const { deleteCabin, isDeleting } = useDeleteCabin();

  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <TableRow role="Row">
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <span>Fits up to {maxCapacity} guests</span>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={() => setShowForm((show) => !show)}>Edit</button>
          <button disabled={isDeleting} onClick={() => deleteCabin(cabinId)}>
            Delete
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabin={cabin} />}
    </>
  );
}

export default CabinRow;
