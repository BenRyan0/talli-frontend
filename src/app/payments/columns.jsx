"use client";

import { ArrowUpDown,Plus } from "lucide-react";
import { Button } from "@/components/ui/button";


export const columns = (setDrawerOpen, setSelectedRow) => [
  // {
  //   accessorKey: "name",
  //   header: ({ column }) => (
  //     <Button
  //       variant="ghost"
  //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //     >
  //       Name
  //       <ArrowUpDown className="ml-2 h-4 w-4" />
  //     </Button>
  //   ),
  // },
    {
  accessorKey: "name",
  header: ({ column }) => (
    <div className="">
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  ),
  cell: ({ row }) => {
    const value = row.getValue("name");
    const rowData = row.original;


    return (
      <div className=" items-center gap-5 flex justify-between">
        <span>{value}</span>
         <Button
          variant="secondary"
          size="sm"
          className="md:hidden"
          onClick={() => {
            setSelectedRow(rowData);
            setDrawerOpen(true);
          }}
        >
          <Plus />Payment 
        </Button>
      </div>
    );
  },
},
  {
    accessorKey: "paymentMade",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Payment
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) =>
      row.getValue("paymentMade") ? "✅ Paid" : "❌ Not Paid",
  },
  {
  accessorKey: "monthlyProgress",
  header: ({ column }) => (
    <div className="hidden md:table-cell">
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Monthly Progress
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  ),
  cell: ({ row }) => {
    const value = row.getValue("monthlyProgress");
    const rowData = row.original;

    return (
      <div className="hidden md:flex items-center gap-5">
        <span>{value}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            console.log("View progress clicked for:", rowData);
          }}
        >
          View Progress
        </Button>
      </div>
    );
  },
},
  {
    accessorKey: "totalMonthlyAmount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Monthly Total
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

{
  id: "actions",
  header: "Actions",
  cell: ({ row }) => {
    const rowData = row.original;
    return (
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log("View", rowData)}
        >
          View more
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setSelectedRow(rowData);
            setDrawerOpen(true);
          }}
        >
          Add Payment
        </Button>
      </div>
    );
  },
}

];
