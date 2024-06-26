import Filter from "@/ui/Filter";
import TableOperations from "@/ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { label: "All", value: "all" },
          { label: "Discounted", value: "discounted" },
          { label: "Standard", value: "standard" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
