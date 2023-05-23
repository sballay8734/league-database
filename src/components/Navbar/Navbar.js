import Link from "../Link"
import links from "./links"

function Navbar() {
  return (
    <nav className="navbar w-screen h-16 fixed top-0 left-0 flex items-center justify-center">
      <ul className="flex gap-12">
        {links.map((link) => {
          return (
            <li key={link.path}>
              <Link to={link.path}>{link.label}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Navbar
