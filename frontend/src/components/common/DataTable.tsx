import React, {
  type Dispatch,
  type HTMLProps,
  type SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Icon } from "@iconify/react";
import {
  type ColumnDef,
  type PaginationState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Input } from "../ui/input";

type Filter<T> = {
  id: Extract<keyof T, string>;
  type: "text" | "date-range";
  options?: string[];
};

interface DataTableProps<T extends object> {
  columns: ColumnDef<T>[];
  data: T[];
  page?: number;
  message?: string;
  limit: number;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  selectable?: boolean;
  heading?: string;
  type?: string;
  selectedItems?: string[] | null;
  handleRowSelection?: (shortUrlIds: string[]) => void;
  isLoading?: boolean;
  loadingMessage?: string;
  count: number;
  paginate?: boolean;
  addButtonIcon?: string;
  addButtonTitle?: string;
  filters?: Filter<T>[];
  searchEnabled?: boolean;
  onAdd?: () => void;
  onExport?: () => void;
  exportText?: string;
  hideExport?: boolean;
  isCustomFilter?: boolean;
  isAttendanceLables?: boolean;
}

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  limit,
  selectable,
  message,
  heading,
  isLoading,
  handleRowSelection,
  pagination,
  setPagination,
  addButtonIcon,
  count,
  addButtonTitle,
  searchEnabled = true,
  onAdd,
  exportText,
  onExport = () => {},
  hideExport = false,
}: DataTableProps<T>) => {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [globalFilter, setGlobalFilter] = useState<any>("");

  // Handle filter changes
  const updateFilter = (id: string, value: any) => {
    setFilterValues((prev) => ({ ...prev, [id]: value }));
  };

  // Filter function
  const filterFunction = (row: any, columnId: string, filterValue: any) => {
    if (!filterValue) return true;
    if (typeof filterValue === "string") {
      return row
        .getValue(columnId)
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    }
    if (
      typeof filterValue === "object" &&
      filterValue.startDate &&
      filterValue.endDate
    ) {
      const rowDate = new Date(row.getValue(columnId));
      return (
        rowDate >= new Date(filterValue.startDate) &&
        rowDate <= new Date(filterValue.endDate)
      );
    }
    return true;
  };

  const handleSelection = useCallback(() => {
    const keysArray = Object.keys(rowSelection);
    handleRowSelection && handleRowSelection(keysArray);
  }, [rowSelection, handleRowSelection]);

  useEffect(() => {
    handleSelection();
  }, [handleSelection]);

  const columnFilters = useMemo(
    () => Object.entries(filterValues).map(([id, value]) => ({ id, value })),
    [filterValues]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      pagination,
      globalFilter,
      columnFilters,
      sorting,
    },
    getRowId: (row) => (row as any)?.shorturlId,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    enableRowSelection: true,
    filterFns: { customFilter: filterFunction },
    pageCount: Math.ceil(count / limit),
    manualPagination: true,
    globalFilterFn: "includesString",
    onGlobalFilterChange: setGlobalFilter,
    debugTable: true,
  });

  // Skeleton component for loading state
  const SkeletonRow = () => (
    <TableRow>
      {selectable && (
        <TableCell>
          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
        </TableCell>
      )}
      {columns.map((_, index) => (
        <TableCell key={index}>
          <div className="h-12 bg-gray-200 rounded-md animate-pulse" />
        </TableCell>
      ))}
    </TableRow>
  );

  return (
    <div
      className={cn("rounded-[40px] pb-[10px] overflow-x-auto border bg-white")}
    >
      <div>
        <div className="flex gap-2 justify-between px-6 py-5">
          {/* titles container */}
          <div className="flex">
            <div className="flex items-center gap-1">
              <h2 className="text-base font-medium leading-6 text-gray whitespace-nowrap">
                {heading}
              </h2>
              <div className="rounded-full px-2 py-[2px] bg-light-gray border border-border-color">
                <h2 className="text-xs text-blue text-center font-medium">
                  {count ?? data.length}
                </h2>
              </div>
            </div>
          </div>
          <div className={cn("flex items-center justify-end gap-4 flex-1")}>
            {searchEnabled && (
              <div className="w-full max-w-[400px]">
                <Input
                  type="text"
                  placeholder={`Search`}
                  value={globalFilter}
                  onChange={(e) =>
                    table.setGlobalFilter(String(e.target.value))
                  }
                />
              </div>
            )}
            {!hideExport && (
              <div className="flex items-center gap-4">
                <Button
                  onClick={onExport}
                  className="text-dark-navy bg-secondary-white hover:bg-secondary-white/70 rounded-full shadow-inner-custom-dark px-[23px] py-[13px] h-12"
                >
                  <Icon
                    icon={"solar:download-bold"}
                    fontSize={20}
                    className="text-dark-navy"
                  />
                  <span className="text-sm">
                    {exportText ? exportText : "Export"}
                  </span>
                </Button>

                {/* add button */}
                {addButtonIcon && addButtonTitle && (
                  <Button
                    onClick={onAdd}
                    className="text-white rounded-full px-[23px] py-[13px] bg-blue hover:bg-blue/90 shadow-inner-custom h-12"
                  >
                    <Icon icon={addButtonIcon} fontSize={20} />
                    <span className="text-sm">{addButtonTitle}</span>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={cn("overflow-hidden")}>
        <div className="overflow-hidden w-full custom-scrollbar">
          <Table className="!border-none  min-w-[900px] w-full">
            <TableHeader className="!border-none">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  className="bg-secondary-white border-y border-y-[#E9EAEB]"
                  key={headerGroup.id}
                >
                  {selectable ? <TableHead /> : null}
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        className={cn(
                          "!py-2 !px-6 !text-text-light font-medium text-base whitespace-nowrap",
                          header.index > 3 && "!text-center"
                        )}
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="!px-[13.5px] !rounded-2xl border-b">
              {isLoading ? (
                // Show loading skeletons
                Array.from({ length: 9 }).map((_, index) => (
                  <SkeletonRow key={index} />
                ))
              ) : table.getRowModel().rows?.length ? (
                // Show actual data rows
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className="transition-all duration-150 hover:bg-secondary-white/55"
                    key={row.id}
                  >
                    {selectable ? (
                      <TableCell>
                        <IndeterminateCheckbox
                          {...{
                            checked: row.getIsSelected(),
                            disabled: Object.keys(rowSelection).length === 5,
                            indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler(),
                          }}
                        />
                      </TableCell>
                    ) : null}
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className="!p-0" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    className="h-[250px] pl-6 py-4 pr-4 text-center text-slate-2000"
                    colSpan={columns.length}
                  >
                    {message || "No data available"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {table.getPageCount() > 1 && (
          <div className="flex justify-between items-center w-full py-5 px-8">
            <Button
              variant="ghost"
              className="px-3 py-2 border border-[#D5D7DA] bg-inherit rounded-full gap-2"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              <ArrowLeft size={20} />
              <span className="text-sm font-normal">Previous</span>
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: table.getPageCount() }, (_, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className={`rounded-lg px-[17px] py-[9px] ${
                    table.getState().pagination.pageIndex === idx
                      ? "text-white bg-blue"
                      : "text-secondary-gray"
                  }`}
                  onClick={() => table.setPageIndex(idx)}
                >
                  {idx + 1}
                </Button>
              ))}
            </div>

            <Button
              variant="ghost"
              className="px-3 py-2 border border-[#D5D7DA] bg-inherit rounded-full gap-2"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              <span className="text-sm font-normal">Next</span>
              <ArrowRight size={20} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <div className="h-full flex items-center justify-center">
      <input
        type="checkbox"
        ref={ref}
        className={className + " cursor-pointer"}
        {...rest}
      />
    </div>
  );
}
