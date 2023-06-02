import { useContext } from "react"
import { ModalContext } from "../context/modal-context"

function useModal() {
  return useContext(ModalContext)
}

export default useModal
