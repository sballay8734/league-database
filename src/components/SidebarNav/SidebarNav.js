import "./sidebar-nav.css"
import links from "./links"
import Link from "../Link"
import { NavigationContext } from "../../context/navigation"
import { useContext } from "react"
import PrimaryColorButton from "../PrimaryColorButton"
import { primaryColors } from "../../theme/themeData"
import { RxTriangleLeft, RxTriangleRight } from "react-icons/rx"

function SidebarNav() {
  const { navIsShown, handleNavClick, handleLinkClick } =
    useContext(NavigationContext)

  return (
    <div className="sidebar-wrapper">
      <div className={`sidebar-nav-links ${navIsShown ? "open" : ""}`}>
        {links.map((link) => {
          return (
            <li
              onClick={() => handleLinkClick(link.path)}
              className="nav-link"
              key={link.path}
            >
              <Link>{link.label}</Link>
            </li>
          )
        })}
        <h3 className="theme__header">Customize Theme</h3>
        <div className="small">Change the theme to your preference</div>
        <div className="theme__primary-wrapper">
          <div className="theme__primary-colors">
            {primaryColors.map((color) => {
              return (
                <PrimaryColorButton
                  onClick={handleNavClick}
                  key={color.className}
                  className={color.className}
                  logo={color.logo}
                />
              )
            })}
          </div>
        </div>
      </div>
      <div onClick={handleNavClick} className="sidebar-nav">
        NAV
        <div className="nav-arrow">
          {navIsShown ? <RxTriangleLeft /> : <RxTriangleRight />}
        </div>
      </div>
    </div>
  )
}

export default SidebarNav
