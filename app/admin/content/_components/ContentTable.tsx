"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Chip,
} from "@nextui-org/react";
import { Edit, Trash2 } from "lucide-react";

const columns = [
  { name: "KEY", uid: "section_key" },
  { name: "TITLE", uid: "title" },
  { name: "PREVIEW", uid: "content" },
  { name: "ACTIONS", uid: "actions" },
];

export default function ContentTable({ initialData }: { initialData: any[] }) {
  return (
    <Table aria-label="Content Table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={initialData} emptyContent={"No content sections found"}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              if (columnKey === "section_key") {
                return (
                  <TableCell>
                    <Chip
                      size="sm"
                      variant="flat"
                      color="secondary"
                      className="font-mono"
                    >
                      {item.section_key}
                    </Chip>
                  </TableCell>
                );
              }
              if (columnKey === "content") {
                return (
                  <TableCell>
                    <p className="text-sm text-gray-500 line-clamp-1 max-w-md">
                      {item.content}
                    </p>
                  </TableCell>
                );
              }
              if (columnKey === "actions") {
                return (
                  <TableCell>
                    <div className="relative flex items-center justify-center gap-2">
                      <Tooltip content="Edit content">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <Edit size={18} />
                        </span>
                      </Tooltip>
                      <Tooltip color="danger" content="Delete">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                          <Trash2 size={18} />
                        </span>
                      </Tooltip>
                    </div>
                  </TableCell>
                );
              }
              return (
                <TableCell>{(item as any)[columnKey as string]}</TableCell>
              );
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
