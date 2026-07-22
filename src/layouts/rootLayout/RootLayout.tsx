import Navbar from "./components/navbar/Navbar";

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <section className="p-4">
      <Navbar />
      {children}
    </section>
  );
};
export { RootLayout };
