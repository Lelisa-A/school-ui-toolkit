import React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  ArrowUpDown,
  Filter,
  MoreVertical,
  Download,
  Settings2
} from 'lucide-react';
import { EduButton } from './EduButton';
import { EduBadge } from './EduBadge';
import { EduCard } from './EduCard';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  title?: string;
  description?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  title,
  description
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-6">
      {(title || searchKey) && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {title && (
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter">{title}</h2>
              {description && <p className="text-sm font-medium text-slate-500">{description}</p>}
            </div>
          )}
          
          <div className="flex flex-1 items-center justify-end space-x-3">
            {searchKey && (
              <div className="relative w-full max-w-xs md:max-w-md">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  placeholder="Search records..."
                  value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    table.getColumn(searchKey)?.setFilterValue(event.target.value)
                  }
                  className="h-12 w-full rounded-2xl border-2 border-slate-100 bg-white pl-11 pr-4 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                />
              </div>
            )}
            <EduButton variant="secondary" size="md" className="rounded-2xl h-12">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </EduButton>
            <EduButton variant="outline" size="icon" className="rounded-2xl h-12 w-12 border-2">
              <Download className="h-4 w-4" />
            </EduButton>
          </div>
        </div>
      )}

      <EduCard className="overflow-hidden border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/60">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-6 py-5 font-black text-[11px] text-slate-400 uppercase tracking-[0.15em] whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-100">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={row.id} 
                    className="hover:bg-slate-50/80 transition-all duration-200 group"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-5 text-sm font-semibold text-slate-600">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="h-32 text-center text-slate-500 font-medium">
                    <div className="flex flex-col items-center gap-2">
                       <Settings2 className="h-8 w-8 text-slate-300" />
                       <span>No matching records found.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-50/50 px-6 py-5 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-3">
            <EduButton
              variant="secondary"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="rounded-xl px-4 font-black text-[10px]"
            >
              <ChevronLeft className="h-3 w-3 mr-1" /> PREV
            </EduButton>
            <EduButton
              variant="secondary"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="rounded-xl px-4 font-black text-[10px]"
            >
              NEXT <ChevronRight className="h-3 w-3 ml-1" />
            </EduButton>
          </div>
        </div>
      </EduCard>
    </div>
  );
}