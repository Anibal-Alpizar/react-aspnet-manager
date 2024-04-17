export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white shadow-lg p-10 rounded-md ${className}`}>
      {children}
    </div>
  );
}
