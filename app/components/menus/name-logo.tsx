export const NameLogo = () => {
  return (
    <div className="text-text font-code font-bold tracking-wider md:text-3xl text-lg cursor-default">
      <span className="text-secondary">&lt;&gt;</span> Reyhaneh Khoshghadam{" "}
      <span className="text-secondary">&lt;/&gt;</span>
    </div>
  );
};
export const NameLogoShort = ({ className }: { className?: string }) => {
  return (
    <div
      className={`text-text font-code font-bold tracking-wider text-4xl cursor-default ${className}`}
    >
      <span className="text-secondary">&lt;</span>R
      <span className="text-secondary">/&gt;</span>
    </div>
  );
};
