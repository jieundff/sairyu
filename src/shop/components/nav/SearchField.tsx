import type { FormEvent } from "react";
import { SearchIcon } from "@/shop/components/icons";
import { cn } from "@/utils/classNames";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
}

/** Underlined search input revealed when SEARCH is tapped in the drawer. */
export function SearchField({
  value,
  onChange,
  onSubmit,
  className,
}: SearchFieldProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit?.(value);
  }

  return (
    <form className={cn("shop-search", className)} onSubmit={handleSubmit}>
      <input
        className="shop-search__input"
        type="search"
        placeholder="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="검색"
      />
      <button type="submit" className="shop-search__button">
        <SearchIcon />
        <span className="shop-sr-only">검색</span>
      </button>
    </form>
  );
}
