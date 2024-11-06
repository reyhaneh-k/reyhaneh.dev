export const Orbit = ({ size }: { size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 }) => {
  const margin = {
    1: "w-full",
    2: "w-[90%] h-[90%]",
    3: "w-[80%] h-[80%]",
    4: "w-[70%] h-[70%]",
    5: "w-[60%] h-[60%]",
    6: "w-[50%] h-[50%]",
    7: "w-[40%] h-[40%]",
    8: "w-[30%] h-[30%]",
  };
  return (
    <div
      className={`border border-solid border-text rounded-full absolute inset-0  mx-auto my-auto border-opacity-35 ${margin[size]}`}
    />
  );
};
