/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { TrashIcon } from "lucide-react";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [deleting, setDeleting] = useState<number>();

  const rowClicked = (rowIndex: number) => {
    console.log(rowIndex);
    console.log(data[rowIndex]);
    setDeleting(rowIndex);
  };

  const confirmDelete = () => {
    if (!deleting) return;
    console.log("would delete", data[deleting]);
  };

  return (
    <div className="rounded-md border">
      {deleting && data[deleting] && (
        <Dialog open={!!deleting} onOpenChange={() => setDeleting(undefined)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Delete {(data[deleting] as any).userId.firstName}s ticket?
              </DialogTitle>
              <DialogDescription>
                <div className="flex flex-col">
                  <p className="flex justify-between">
                    <span style={{ display: "inline-block", width: "30%" }}>
                      Ticket Holder:
                    </span>
                    <span style={{ display: "inline-block" }}>
                      {(data[deleting] as any).userId.firstName} (
                      {(data[deleting] as any).userId.email})
                    </span>
                  </p>

                  <p className="flex justify-between">
                    <span style={{ display: "inline-block", width: "30%" }}>
                      Tickets Bought:
                    </span>
                    <span style={{ display: "inline-block" }}>
                      {(data[deleting] as any).cost}
                    </span>
                  </p>

                  <p className="flex justify-between">
                    <span style={{ display: "inline-block", width: "30%" }}>
                      Total Cost:
                    </span>
                    <span style={{ display: "inline-block" }}>
                      {(data[deleting] as any).amount}
                    </span>
                  </p>

                  <Button
                    variant="destructive"
                    className="mt-2"
                    onClick={confirmDelete}
                    disabled
                  >
                    Confirm Delete
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
              <TableHead>Actions</TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell key={row.id}>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => rowClicked(parseInt(row.id))}
                    className="ml-2 p-1  rounded"
                  >
                    <TrashIcon className="text-xs" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
