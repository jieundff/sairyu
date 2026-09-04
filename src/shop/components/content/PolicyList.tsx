import { cn } from "@/utils/classNames";

interface PolicyListProps {
  title: string;
  items: readonly string[];
  className?: string;
}

/** `REFUND & EXCHANGE` and its bullet list, under the 배송안내 tab. */
export function PolicyList({ title, items, className }: PolicyListProps) {
  return (
    <section className={cn("shop-policy", className)}>
      <h2 className="shop-policy__title">{title}</h2>
      <ul className="shop-policy__list">
        {items.map((item) => (
          <li key={item} className="shop-policy__item">
            <span className="shop-policy__bullet" aria-hidden="true">
              •
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
