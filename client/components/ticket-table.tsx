import { useTicketDetails, Ticket } from "@/hooks/use-ticket-details";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Badge } from "./ui/badge";

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
    <div className="flex flex-col p-4">
      {ticketData && <DataTable columns={columns} data={ticketData.tickets} />}
      {ticketData && (
        <div className="flex text-right justify-end m-1 gap-1">
          <Badge
            variant="outline"
            className="flex justify-center w-[140px] text-center"
          >
            Tickets Sold: {ticketData.ticketSums.totalAmount}
          </Badge>
          <Badge
            variant="outline"
            className="flex justify-center w-[140px] text-center"
          >
            Total Raised: ${ticketData.ticketSums.totalCost}
          </Badge>
        </div>
      )}
    </div>
  );
};

export default TicketTable;
