interface EmptyStateProps {
  message: string;
}

/** `The cart is empty.` — the one empty state in the design. */
export function EmptyState({ message }: EmptyStateProps) {
  return <p className="shop-empty">{message}</p>;
}
