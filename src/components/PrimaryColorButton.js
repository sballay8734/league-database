import useModal from "../hooks/useModal"
import useTheme from "../hooks/useTheme"

function PrimaryColorButton({ className, logo }) {
  const { themeHandler } = useTheme()
  const { hideModal } = useModal()

  function handleClick() {
    hideModal()
    localStorage.setItem("theme", className)
    themeHandler(className)
  }

  return (
    <button className={className} onClick={handleClick}>
      <img src={logo} alt="team logo" />
    </button>
  )
}

export default PrimaryColorButton
