import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <nav>
      <ol>
        <li>
          <Link to="/">{/* <img src={""} /> */}</Link>
        </li>
      </ol>
    </nav>
  );
};

export default Navbar;
