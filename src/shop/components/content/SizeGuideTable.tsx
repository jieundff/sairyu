import type { SizeRow } from "@/shop/types";
import { cn } from "@/utils/classNames";

interface SizeGuideTableProps {
  /** Header row; the first entry labels the size column. */
  columns: readonly string[];
  rows: readonly SizeRow[];
  caption?: string;
  className?: string;
}

/**
 * The measurements chart under the 사이즈 가이드 tab. Figma draws it as loose
 * rectangles; a real `<table>` keeps the header association intact and lets
 * the columns share the width evenly.
 */
export function SizeGuideTable({
  columns,
  rows,
  caption,
  className,
}: SizeGuideTableProps) {
  return (
    <div className={cn("shop-size-guide", className)}>
      {caption && <p className="shop-size-guide__caption">{caption}</p>}
      <table className="shop-size-guide__table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.size}>
              <th scope="row">{row.size}</th>
              {row.values.map((value, index) => (
                <td key={columns[index + 1] ?? index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
