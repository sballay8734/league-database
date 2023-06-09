import "./sidebar-nav.css"
import links from "./links"
import Link from "../Link"
import { useState } from "react"

function SidebarNav() {
  const [navIsShown, setNavIsShown] = useState(false)

  function handleNavClick() {
    setNavIsShown(!navIsShown)
  }

  function handleLinkClick() {
    setNavIsShown(false)
  }

  return (
    <div className="sidebar-wrapper">
      <div className={`sidebar-nav-links ${navIsShown ? "open" : ""}`}>
        {links.map((link) => {
          return (
            <li className="nav-link" key={link.path}>
              <Link onClick={handleLinkClick} to={link.path}>
                {link.label}
              </Link>
            </li>
          )
        })}
      </div>
      <div onClick={handleNavClick} className="sidebar-nav">
        NAV
      </div>
    </div>
  )
}

export default SidebarNav
