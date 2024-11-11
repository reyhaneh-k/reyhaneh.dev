import { About } from "./components/about/about";
import { Header } from "./components/header/header";
import { Skills } from "./components/skills/skills";

export default function Home() {
  return (
    <>
      <Header />
      <About />
      <Skills />
    </>
  );
}
