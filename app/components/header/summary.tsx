import { AboutMe } from "./aboutMe";

export const Summary = () => {
  return (
    <div className="flex flex-col gap-4 md:w-2/5 w-full m-2">
      <header className="text-4xl tracking-wider leading-snug text-text ">
        <small className="text-base font-light text-secondary">
          &lt;h1&gt;{" "}
        </small>
        <br />
        Hey
        <br />
        I'm <span className="text-secondary">Reyhaneh</span>
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
