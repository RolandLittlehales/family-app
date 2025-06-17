"use client";

import React, { useState, useMemo } from "react";
import * as styles from "./Table.css";

export type SortDirection = "asc" | "desc" | null;

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  sortable?: boolean;
  align?: "left" | "center" | "right" | "numeric";
  render?: (value: unknown, row: T) => React.ReactNode;
  width?: string;
}

export interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  caption?: string;
  sortable?: boolean;
  paginated?: boolean;
  pageSize?: number;
  className?: string;
  onRowClick?: (row: T, index: number) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

function SortIcon({ direction }: { direction: SortDirection }) {
  if (direction === "asc") {
    return <span>↑</span>;
  }
  if (direction === "desc") {
    return <span>↓</span>;
  }
  return <span>↕</span>;
}

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= Math.min(maxVisible, totalPages); i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (
          let i = Math.max(1, totalPages - maxVisible + 1);
          i <= totalPages;
          i++
        ) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {getVisiblePages().map(page => (
        <button
          key={page}
          className={
            page === currentPage
              ? styles.paginationButtonActive
              : styles.paginationButton
          }
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={styles.paginationButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>

      <span className={styles.paginationInfo}>
        Showing {startItem}-{endItem} of {totalItems}
      </span>
    </div>
  );
}

export function Table<T = Record<string, unknown>>({
  columns,
  data,
  loading = false,
  emptyMessage = "No data available",
  caption,
  sortable = true,
  paginated = false,
  pageSize = 10,
  className = "",
  onRowClick,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    const column = columns.find(col => col.key === columnKey);
    if (!column?.sortable) return;

    if (sortKey === columnKey) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortKey(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortKey(columnKey);
      setSortDirection("asc");
    }

    setCurrentPage(1);
  };

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection) return data;

    return [...data].sort((a, b) => {
      const aValue = (a as Record<string, unknown>)[sortKey];
      const bValue = (b as Record<string, unknown>)[sortKey];

      if (aValue === bValue) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [data, sortKey, sortDirection]);

  const paginatedData = useMemo(() => {
    if (!paginated) return sortedData;

    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, paginated, currentPage, pageSize]);

  const totalPages = paginated ? Math.ceil(sortedData.length / pageSize) : 1;

  const getCellAlignment = (column: TableColumn<T>) => {
    switch (column.align) {
      case "numeric":
        return styles.tableCellVariants.numeric;
      case "center":
        return styles.tableCellVariants.center;
      default:
        return styles.tableCellVariants.default;
    }
  };

  const renderCellContent = (column: TableColumn<T>, row: T) => {
    const value = (row as Record<string, unknown>)[column.key];
    return column.render ? column.render(value, row) : String(value ?? "");
  };

  if (loading) {
    return (
      <div className={`${styles.tableContainer} ${className}`}>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          Loading...
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`${styles.tableContainer} ${className}`}>
        <div className={styles.emptyState}>{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className={`${styles.tableContainer} ${className}`}>
      <table className={styles.table}>
        {caption && (
          <caption className={styles.tableCaption}>{caption}</caption>
        )}

        <thead className={styles.tableHeader}>
          <tr>
            {columns.map(column => (
              <th
                key={column.key}
                className={styles.tableHeaderCell}
                onClick={() => handleSort(column.key)}
                data-sortable={sortable && column.sortable}
                style={{ width: column.width }}
              >
                {column.header}
                {sortable && column.sortable && (
                  <span
                    className={styles.sortIcon}
                    data-active={sortKey === column.key}
                  >
                    <SortIcon
                      direction={sortKey === column.key ? sortDirection : null}
                    />
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={styles.tableBody}>
          {paginatedData.map((row, index) => (
            <tr
              key={index}
              className={styles.tableRow}
              onClick={() => onRowClick?.(row, index)}
              style={{ cursor: onRowClick ? "pointer" : "default" }}
            >
              {columns.map(column => (
                <td key={column.key} className={getCellAlignment(column)}>
                  {renderCellContent(column, row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {paginated && (
        <div className={styles.tableFooter}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={sortedData.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
