import { useSelector } from "react-redux"
import RemoveModal from "./RemoveModal"
import RenameModal from "./RenameModal"

function Modal() {
  const type = useSelector(state => state.modal.type)
  switch (type){
    case 'rename':
      return <RenameModal />
    case 'remove':
      return <RemoveModal />
    default:
      return null
  }  
}

export default Modal
