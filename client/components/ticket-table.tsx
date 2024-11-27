import { useTicketDetails, Ticket } from "@/hooks/use-ticket-details";
import { Skeleton } from "./ui/skeleton";

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
  const { data: ticketData, isLoading: isLoadingTicketData } =
    useTicketDetails(raffleId);

  return (
    <div className="flex flex-col mt-8">
      {isLoadingTicketData && <Skeleton className="w-full h-[400px]" />}

      {ticketData && <DataTable columns={columns} data={ticketData} />}
    </div>
  );
};

export default TicketTable;
