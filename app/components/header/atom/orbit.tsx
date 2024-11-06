export const Orbit = ({ size }: { size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 }) => {
  const margin = {
    1: "m-0",
    2: "m-7",
    3: "m-14",
    4: "m-20",
    5: "m-28",
    6: "m-36",
    7: "m-44",
    8: "m-56",
  };
  return (
    <div
      className={`border border-solid border-text rounded-full absolute inset-0 border-opacity-35 ${margin[size]}`}
    />
  );
};
