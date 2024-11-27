import { useTicketDetails, Ticket } from "@/hooks/use-ticket-details";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";

const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "userId.firstName",
    header: "Holder",
  },
  {
    accessorKey: "amount",
    header: "# Tickets",
  },
  {
    accessorKey: "cost",
    header: "Paid",
  },
  {
    accessorKey: "soldBy.firstName",
    header: "Sold By",
  },
];

const TicketTable = ({ raffleId }: { raffleId: string }) => {
  const { data: ticketData } = useTicketDetails(raffleId);

  return (
    <div className="flex flex-col mt-8">
      {ticketData && <DataTable columns={columns} data={ticketData} />}
    </div>
  );
};

export default TicketTable;
