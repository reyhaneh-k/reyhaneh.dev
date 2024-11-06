import { MyName } from "./my-name";

export const MenuBar = () => {
  return (
    <div className="bg-background border-b-2 text-text md:text-3xl text-lg border-b-primary py-10 px-16 m-5 flex md:flex-row gap-5 flex-col justify-between items-center">
      <MyName />
      <section className="flex gap-5 justify-between w-full md:w-fit">
        <span className="tracking-widest bg-secondary px-7 py-4 rounded-lg shadow-inner shadow-blue-900">
          CV
        </span>
        <span className="  px-7 py-4 r">let&apos;s talk</span>
      </section>
    </div>
  );
};
