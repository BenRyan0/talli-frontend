"use client";

import {
  ArrowUpDown,
  Plus,
  BadgeCheck,
  CircleAlert,
  CalendarIcon,
  UserRoundMinus
} from "lucide-react";

import { Button } from "@/components/ui/button";
// import { DeleteAlertDialog } from './../../components/customUI/deleteAlertDialog';

export const payersColumns = (setDrawerOpen, setSelectedRow,selectedRow,toDeleteRow,setToDeleteRow) => [
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

      return (
        <div className="text-wrap items-center gap-5 flex justify-between ">
          <span>{value}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "contact",
    header: ({ column }) => (
      <div className="">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contact
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const value = row.getValue("contact");

      return (
        <div className="text-wrap items-center gap-5 flex justify-between ">
          <span>{value}</span>
        </div>
      );
    },
  },


  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const rowData = row.original;
      const isRowSelected = selectedRow === rowData
      const isRowSelected2Del = toDeleteRow === rowData

      return (
        <div className="flex gap-2">
        
          <Button
            // className={`hidden md:block ${isPaid ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            className={`hidden md:block`}
            variant="secondary"
            disabled={isRowSelected}
            size="sm"
            onClick={() => {
              setSelectedRow(rowData);
            }}
          >
            {isRowSelected ? (
              <div className="flex gap-1 justify-center items-center w-fit text-green-200">
                ...
                Editing
              </div>
            ) : (
              <div className="flex gap-1 justify-center items-center w-fit ">
                <Plus />
                Update Info
              </div>
            )}
            {/* Add Payment */}
          </Button>
          <Button
            // className={`hidden md:block ${isPaid ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            className={`md:hidden block bg-red-500`}
            variant="secondary"
            disabled={isRowSelected}
            size="sm"
            onClick={() => {
              setToDeleteRow(rowData);
            }}
          >
            {isRowSelected2Del ? (
              <div className="flex gap-1 justify-center items-center w-fit text-green-200">
               CONFIRM 
              </div>
            ) : (
              <div className="flex gap-1 justify-center items-center w-fit font-bold ">
                {/* <Plus /> */}
               REMOVE
              </div>
            )}
            {/* Add Payment */}
          </Button>

             {/* <DeleteAlertDialog onConfirm={() => handleDelete(rowData.id)} /> */}
      
      
        </div>
      );
    },
  },
];
