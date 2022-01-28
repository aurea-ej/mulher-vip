import { Container } from '../../components'
import { useModal } from '../../hooks/useModal'
import { InsertItemModal, UpdateItemModal } from './components'

export const Admin: React.FC = () => {
  const [insertItemIsOpen, toggleInsertItem] = useModal()
  const [updateItemIsOpen, toggleUpdateItem] = useModal()

  return (
    <Container>
      <InsertItemModal closeModal={toggleInsertItem} isOpen={insertItemIsOpen} />
      <UpdateItemModal closeModal={toggleUpdateItem} isOpen={updateItemIsOpen} />
      <button onClick={toggleInsertItem} >Inserir</button>
      <button onClick={toggleUpdateItem} >Atualizar</button>
      <button onClick={toggleUpdateItem} >Deletar</button>
    </Container>
  )
}
