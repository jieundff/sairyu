import { cn } from "@/utils/classNames";

interface TabNavProps<T extends string> {
  tabs: readonly { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
  className?: string;
}

/**
 * 상품 정보 / 사이즈 가이드 / 배송안내. Active tab is ink, the rest are muted,
 * with a hairline under the row.
 */
export function TabNav<T extends string>({
  tabs,
  value,
  onChange,
  className,
}: TabNavProps<T>) {
  return (
    <div className={cn("shop-tabs", className)} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={tab.id === value}
          className={cn(
            "shop-tabs__tab",
            tab.id === value && "shop-tabs__tab--active",
          )}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
