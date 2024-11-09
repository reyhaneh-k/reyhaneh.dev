import { AboutMe } from "./aboutMe";

export const Summary = () => {
  return (
    <div className="flex flex-col gap-4">
      <header className="text-5xl tracking-wider leading-snug text-text ">
        <small className="text-base font-light text-secondary">
          &lt;h1&gt;{" "}
        </small>
        <br />
        Hey
        <br />
        I'm <span className="text-secondary">Reyhaneh</span>
        <br />
        Frontend Developer{" "}
        <small className="text-base font-light text-secondary">
          &lt;/h1&gt;{" "}
        </small>
        <br />
      </header>
      <section className="w-96">
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
