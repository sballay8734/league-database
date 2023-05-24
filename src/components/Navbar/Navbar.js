import Link from "../Link"
import links from "./links"
import { BsDroplet } from "react-icons/bs"

function Navbar() {
  return (
    <nav className="navbar w-screen h-16 fixed top-0 left-0 flex items-center justify-between px-8">
      <Link to="/" className="league-logo">
        LLEA
      </Link>
      <ul className="navbar-list">
        {links.map((link) => {
          return (
            <li className="nav-link" key={link.path}>
              <Link to={link.path}>{link.label}</Link>
            </li>
          )
        })}
      </ul>
      <button className="theme-changer">
        {" "}
        <BsDroplet />
      </button>
    </nav>
  )
}

export default Navbar
