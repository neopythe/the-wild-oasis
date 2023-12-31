import { useState } from "react";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

import CreateCabinForm from "@/features/cabins/CreateCabinForm";
import { useCreateCabin } from "@/features/cabins/useCreateCabin";
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
    description,
    discount,
    id: cabinId,
    image,
    maxCapacity,
    name,
    regularPrice,
  } = cabin as Omit<Cabin, "image"> & { image: string | undefined };

  const { createCabin, isCreating } = useCreateCabin();
  const { deleteCabin, isDeleting } = useDeleteCabin();

  const [showForm, setShowForm] = useState(false);

  function handleDuplicate() {
    createCabin({
      description,
      discount,
      image,
      maxCapacity,
      name: `Copy of ${name}`,
      regularPrice,
    });
  }

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
          <button disabled={isCreating} onClick={handleDuplicate}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowForm((show) => !show)}>
            <HiPencil />
          </button>
          <button disabled={isDeleting} onClick={() => deleteCabin(cabinId)}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabin={cabin} />}
    </>
  );
}

export default CabinRow;
