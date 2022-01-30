import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { Close } from '@mui/icons-material'
import { Item } from '../../../../types/item'
import { useIsMobile } from '../../../../hooks'
import { ModalProps } from '../../../../types/util'
import { useMemo, useEffect, useState } from 'react'
import { getDatabase, ref, remove } from 'firebase/database'
import { HfField, SelectInput } from '../../../../components'
import { getProducts } from '../../../../hooks/useGetProducts'
import { useItemsStore } from '../../../../store/items/reducer'
import { Drawer, Stack, Typography, Button } from '@mui/material'

type InsertItemFormValues = Partial<Item> & {
  item?: any
}

export const DeleteItemModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  const db = getDatabase()
  const isMobile = useIsMobile()
  const { enqueueSnackbar } = useSnackbar()
  const [infosChange, toggleInfosChange] = useState<boolean>(false)
  const { storeState: { items }, operations: { updateItems } } = useItemsStore()

  const ItemsOptions = useMemo(()=> {
    return [{ value: '', label: '---' }, ...Object.entries(items).map(item => ({ value: item[1].id, label: item[1].name }))]
  },[items])

  const { control, handleSubmit, watch } = useForm<InsertItemFormValues>()

  const selectedItemWatch = watch('item')

  const onSubmit = () => {
    remove(ref(db, '/products/' + selectedItemWatch)).then(()=>{
      toggleInfosChange(!infosChange)
      return enqueueSnackbar('Item Removido com sucesso!', {
        variant: 'success',
        autoHideDuration: 3000
      })
    }).catch(()=>{
      return enqueueSnackbar('Ops! ocorreu um erro ao tentar remover o item', {
        variant: 'error',
        autoHideDuration: 3000
      })
    })
  }

  const selectedItem = useMemo(() => {
    const item: Item = items.filter(item => item.id === selectedItemWatch)[0]
    return item
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedItemWatch, infosChange])

  useEffect(()=> {
    if(items.length === 0){
      getProducts(updateItems)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <Drawer
      variant='temporary'
      anchor='bottom'
      open={isOpen}
      PaperProps={{ sx: {
        paddingY: 2,
        height: '90vh',
        maxHeight: '90vh',
        paddingX: isMobile ? 1 : 4,
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
      } }}
    >
      <Stack alignItems='flex-end'>
        <Close sx={{ cursor: 'pointer', marginX: 1 }} onClick={closeModal} />
      </Stack>
      <Typography variant='h2' sx={{ textAlign: 'center' }} >Deletar item</Typography>

      <Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <HfField
              name='item'
              label='Item'
              inputType='flat'
              control={control}
              options={ItemsOptions}
              component={SelectInput}
            />
            {selectedItem && (
              <>
                <Stack spacing={2}>
                  <Typography sx={{ color: '#9CADBF', marginTop: 2 }}><b>Nome:</b> {selectedItem?.name}</Typography>
                  <Typography sx={{ color: '#9CADBF' }}><b>Preço:</b> R$ {Number(selectedItem?.price).toFixed(2)}</Typography>
                  <Typography sx={{ color: '#9CADBF' }}><b>Descrição:</b> {selectedItem?.description}</Typography>
                </Stack>
                <Button sx={{ marginTop: 3 }} disabled={!selectedItemWatch} type='submit'>Deletar</Button>
              </>
            )}
          </Stack>
        </form>
      </Stack>
    </Drawer>
  )
}
