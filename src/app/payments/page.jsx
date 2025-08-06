// import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";


// import Data from "../dashboard/data.json"

export default function DemoPage({Data}) {
  return (
    <div className="container mx-auto px-3">
      <DataTable columns={columns} data={Data} />
    </div>
  );
}
