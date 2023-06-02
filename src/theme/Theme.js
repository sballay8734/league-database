import Modal from "../components/Modal"
import { primaryColors } from "./themeData"
import PrimaryColorButton from "../components/PrimaryColorButton"

function Theme() {
  return (
    <Modal className="theme__modal">
      <h3 className="theme__header">Customize Theme</h3>
      <small>Change the theme to your preference</small>
      <div className="theme__primary-wrapper">
        <div className="theme__primary-colors">
          {primaryColors.map((color) => {
            return (
              <PrimaryColorButton
                key={color.className}
                className={color.className}
                logo={color.logo}
              />
            )
          })}
        </div>
      </div>
    </Modal>
  )
}

export default Theme
