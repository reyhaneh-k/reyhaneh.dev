import Navbar from "./components/navbar/Navbar";

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};
export { RootLayout };
