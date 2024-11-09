export const MyName = () => {
  return (
    <div className="text-text font-code font-bold tracking-wider md:text-3xl text-lg">
      <span className="text-secondary">&lt;&gt;</span> Reyhaneh Khoshghadam{" "}
      <span className="text-secondary">&lt;/&gt;</span>
    </div>
  );
};
export const MyNameMobile = ({ className }: { className?: string }) => {
  return (
    <div
      className={`text-text font-code font-bold tracking-wider text-4xl ${className}`}
    >
      <span className="text-secondary">&lt;</span>R
      <span className="text-secondary">/&gt;</span>
    </div>
  );
};
