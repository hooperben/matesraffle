import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TicketDetails, useSellTicket } from "@/hooks/use-sell-ticket";

const ticketQuantityToPrice: Record<string, string> = {
  "2": "20",
  "5": "30",
  "10": "50",
  "25": "100",
};

const defaultTicketDetails = {
  name: "",
  email: "",
  amount: "",
  cost: "",
};

const SellTicket = ({
  raffleId,
  handleSuccessfulTicketSale,
}: {
  raffleId: string;
  handleSuccessfulTicketSale: () => Promise<void>;
}) => {
  const [ticketDetails, setTicketDetails] =
    useState<TicketDetails>(defaultTicketDetails);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setTicketDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSelect = (input: string) => {
    const price = ticketQuantityToPrice[input];

    // TODO handle this better
    if (!price) return;

    setTicketDetails((prevDetails) => ({
      ...prevDetails,
      amount: input,
      cost: price,
    }));
  };

  const isDisabled =
    ticketDetails.name.length < 3 ||
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(ticketDetails.email) ||
    ticketDetails.amount === "" ||
    ticketDetails.cost === "";

  const { mutateAsync: sellTicketAsync, isPending: isSellingTicket } =
    useSellTicket(raffleId, ticketDetails);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleTicketSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    if (!showConfirmation) {
      setShowConfirmation(true);
      return;
    }

    await sellTicketAsync();

    handleSuccessfulTicketSale();
    setTicketDetails(defaultTicketDetails);
  };

  return (
    <div className="flex flex-col gap-3 mt-4">
      <div className="flex flex-col w-full max-w-[500px] mx-auto mt-2 gap-3 text-md">
        <h1 className="text-xl font-bold text-[#800080] hover:text-[#9400D3] active:text-[#4B0082] from-35% to-[#000000]">
          {showConfirmation ? "Confirm Ticket Details" : "Sell Ticket"}
        </h1>
      </div>

      {!showConfirmation && (
        <form
          onSubmit={handleTicketSubmit}
          className="flex flex-col w-full max-w-[500px] mx-auto mt-2 gap-3 text-md"
        >
          <div>
            <label>Ticket Holder Name:</label>
            <Input
              type="text"
              name="name"
              className="text-md"
              value={ticketDetails.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Ticket Holder Email:</label>
            <Input
              type="email"
              name="email"
              className="text-md"
              value={ticketDetails.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Amount of Tickets:</label>
            <Select onValueChange={handleSelect}>
              <SelectTrigger className="text-md">
                <SelectValue
                  className="text-md"
                  placeholder={
                    ticketDetails.amount !== ""
                      ? `${ticketDetails.amount} tickets - $${
                          ticketQuantityToPrice[ticketDetails.amount]
                        } `
                      : "Ticket Amount"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 tickets - $20</SelectItem>
                <SelectItem value="5">5 tickets - $30</SelectItem>
                <SelectItem value="10">10 tickets - $50</SelectItem>
                <SelectItem value="25">25 tickets - $100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full mt-4" type="submit" disabled={isDisabled}>
            Next
          </Button>
        </form>
      )}

      {showConfirmation && (
        <div className="mt-2">
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-bold">Name:</span> {ticketDetails.name}
            </p>
            <p>
              <span className="font-bold">Email:</span> {ticketDetails.email}{" "}
            </p>
            <p>
              <span className="font-bold">Number of Tickets: </span>{" "}
              {ticketDetails.amount}
            </p>
            <p className="font-bold">Total Cost: ${ticketDetails.cost}</p>
          </div>

          <div className="flex flex-col gap-3 mt-3">
            <Button
              onClick={() => setShowConfirmation(false)}
              disabled={isSellingTicket}
              className="bg-red-400"
            >
              Edit Ticket Details
            </Button>

            <p className="text-sm text-center">
              Once you have collected payment from the ticket purchaser, please
              click the button below
            </p>
            <Button
              onClick={() => handleTicketSubmit()}
              disabled={isSellingTicket}
              className="bg-green-700"
            >
              Confirm Ticket Purchase
            </Button>
          </div>
        </div>
      )}

      {!showConfirmation && (
        <div className="flex flex-col gap-3 w-full max-w-[500px] mx-auto">
          <Button
            onClick={handleSuccessfulTicketSale}
            variant="destructive"
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default SellTicket;
