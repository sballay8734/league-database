import ReactDOM from "react-dom"
import "./modal.css"
import useModal from "../hooks/useModal"

function Modal({ className, children }) {
  const { hideModal } = useModal()

  function handleClick() {
    hideModal()
  }

  return ReactDOM.createPortal(
    <>
      <div className="modal-background" onClick={handleClick}></div>
      <div className={className}>{children}</div>
    </>,
    document.querySelector("#modal-container")
  )
}

export default Modal
