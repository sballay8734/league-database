import { useContext } from "react"
import useModal from "../hooks/useModal"
import useTheme from "../hooks/useTheme"
import { NavigationContext } from "../context/navigation"

function PrimaryColorButton({ className, logo }) {
  const { themeHandler } = useTheme()
  const { hideModal } = useModal()
  const { handleNavClose } = useContext(NavigationContext)

  function handleClick() {
    hideModal()
    localStorage.setItem("theme", className)
    themeHandler(className)
    handleNavClose()
  }

  return (
    <button className={className} onClick={handleClick}>
      <img src={logo} alt="team logo" />
    </button>
  )
}

export default PrimaryColorButton
