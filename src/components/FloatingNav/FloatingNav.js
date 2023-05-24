import "./floating-nav.css"
import { IoIosPeople } from "react-icons/io"
import { FaPeopleArrows } from "react-icons/fa"
import { FaCrown } from "react-icons/fa"
import { GiBookmarklet } from "react-icons/gi"
import { useContext } from "react"
import { NavigationContext } from "../../context/navigation"

function FloatingNav() {
  const { navigate } = useContext(NavigationContext)

  function handleClick(e, to) {
    e.preventDefault()

    navigate(to)
  }

  return (
    <div className="floating-nav__container">
      <div
        onClick={(e) => handleClick(e, "/owners")}
        className="nav-link-floating"
      >
        Owners
        <span>
          <IoIosPeople />
        </span>
      </div>
      <div
        onClick={(e) => handleClick(e, "/compare")}
        className="nav-link-floating"
      >
        Compare
        <span>
          <FaPeopleArrows />
        </span>
      </div>
      <div
        onClick={(e) => handleClick(e, "/records")}
        className="nav-link-floating"
      >
        Records
        <span>
          <GiBookmarklet />
        </span>
      </div>
      <div
        onClick={(e) => handleClick(e, "/kingofthehill")}
        className="nav-link-floating"
      >
        KotH
        <span>
          <FaCrown />
        </span>
      </div>
    </div>
  )
}

export default FloatingNav
