import { useContext } from "react"
import useModal from "../hooks/useModal"
import useTheme from "../hooks/useTheme"
import { NavigationContext } from "../context/navigation"
import { RxTriangleUp } from "react-icons/rx"

function PrimaryColorButton({ className, logo }) {
  const { themeHandler, themeState } = useTheme()
  const { hideModal } = useModal()
  const { handleNavClose } = useContext(NavigationContext)

  function handleClick() {
    hideModal()
    localStorage.setItem("theme", className)
    themeHandler(className)
    handleNavClose()
  }

  return (
    <div className="theme-icon">
      <button
        className={`${className} ${
          themeState.primary === className ? "selected" : ""
        }`}
        onClick={handleClick}
      >
        <img src={logo} alt="team logo" />
      </button>
      <span
        className={`theme-triangle ${
          themeState.primary === className ? "show" : ""
        }`}
      >
        <RxTriangleUp />
      </span>
    </div>
  )
}

export default PrimaryColorButton
