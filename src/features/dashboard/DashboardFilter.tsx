import Filter from "@/ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { label: "Last 7 days", value: "7" },
        { label: "Last 30 days", value: "30" },
        { label: "Last 90 days", value: "90" },
      ]}
    />
  );
}

export default DashboardFilter;
