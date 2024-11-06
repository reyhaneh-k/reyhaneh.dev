import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MyName } from "./my-name";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export const MenuBar = () => {
  return (
    <div className="bg-background border-b-2 text-text md:text-3xl text-lg border-b-primary py-10 px-16 m-5 flex md:flex-row gap-5 flex-col justify-between items-center">
      <MyName />
      <section className="flex gap-5 justify-between w-full md:w-fit">
        <span className="tracking-widest gap-3 bg-secondary px-7 py-4 rounded-lg shadow shadow-blue-900 flex hover:shadow-inner hover:shadow-black cursor-pointer">
          <FontAwesomeIcon icon={faDownload} />
          CV
        </span>
        <span className="  px-7 py-4 r">let&apos;s talk</span>
      </section>
    </div>
  );
};
