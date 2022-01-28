import { Item } from '../../types/item'
import { Drawer } from '@mui/material'

export interface RemoveItemModalProps {
  item: Item
  isOpen: boolean
  onClose: () => void
  haveSizeOptions?: boolean
}

export const RemoveItemModal: React.FC<RemoveItemModalProps> = ({ item, isOpen, onClose, haveSizeOptions }) => {
  if(isOpen){
    return (
      <Drawer
        variant='temporary'
        anchor='bottom'
        open={isOpen}
        PaperProps={{ sx: { maxHeight: '90vh', height: '100%', flex: 1 } }}
      >
        {item.name}
        <button onClick={onClose}>fechar</button>
      </Drawer>
    )
  }
  return null
}
