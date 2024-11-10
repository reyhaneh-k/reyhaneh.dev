import { AboutMe } from "./aboutMe";

export const Summary = () => {
  return (
    <div className="flex flex-col gap-10 md:w-2/5 w-full m-2">
      <header className="md:text-3xl xl:text-4xl text-3xl tracking-wider text-text">
        <small className="text-base font-light text-secondary">
          &lt;h1&gt;{" "}
        </small>
        <br />
        Hey
        <br />
        I'm{" "}
        <span className="text-secondary md:leading-loose leading-normal">
          Reyhaneh
        </span>
        <br />
        Frontend Developer
        <small className="text-base font-light text-secondary">
          &lt;/h1&gt;{" "}
        </small>
        <br />
      </header>
      <section className="">
        <small className="text-base font-light text-secondary">
          &lt;p&gt;{" "}
        </small>
        <br />
        <AboutMe />
        <br />
        <small className="text-base font-light text-secondary">
          &lt;/p&gt;
        </small>
      </section>
    </div>
  );
};
