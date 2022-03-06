import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { Close } from '@mui/icons-material'
import { Item } from '../../../../types/item'
import { useIsMobile } from '../../../../hooks'
import { ModalProps } from '../../../../types/util'
import { useMemo, useEffect, useState } from 'react'
import { Drawer, Stack, Typography } from '@mui/material'
import { getDatabase, ref, remove } from 'firebase/database'
import { HfField, SelectInput, Button } from '../../../../components'
import { getStorage, listAll, ref as storageRef, uploadBytes, deleteObject, StorageReference } from 'firebase/storage'

type InsertItemFormValues = Partial<Item> & {
  bannerImageInput?: any
}

interface BannerImages {
  name: string,
  imageRef: any
}
export const AlterBannerModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  const db = getDatabase()
  const isMobile = useIsMobile()
  const storage = getStorage()
  const { enqueueSnackbar } = useSnackbar()
  const [bannerImages, setBannerImages] = useState<BannerImages[]>([])
  const [newBannerImage, setNewBannerImage] = useState<any>()
  const [infosChange, toggleInfosChange] = useState<boolean>(false)

  const { control, handleSubmit, watch } = useForm<InsertItemFormValues>()

  const selectedItemWatch = watch('bannerImageInput')

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
    const item: BannerImages = bannerImages.filter(item => item.imageRef === selectedItemWatch)[0]
    return item
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedItemWatch, infosChange])

  const addBannerImage = () => {
    const imageRef = storageRef(storage,`bannerImages/${newBannerImage.name.trim()}`)

    uploadBytes(imageRef, newBannerImage).then((snapshot: any) => {
      return enqueueSnackbar('Imagem adicionada com sucesso',{
        variant: 'success',
        autoHideDuration: 3000
      })
    })
  }

  const removeBannerImage = () => {
    deleteObject(selectedItem.imageRef as StorageReference).then(() => {
      enqueueSnackbar('Imagem removida com sucesso',{
        variant: 'success',
        autoHideDuration: 3000
      })
      window.location.reload()
      return
    }).catch(() => {
      enqueueSnackbar('Erro ao remover imagem',{
        variant: 'error',
        autoHideDuration: 3000
      })
      window.location.reload()
      return
    })
  }

  const handleImage = (event: any) => {
    const file = event.target.files[0]
    setNewBannerImage(file)
  }

  useEffect(()=>{
    const listRef = storageRef(storage, 'bannerImages/')
    listAll(listRef)
      .then((res) => {
        res.items.map((itemRef) => {
          return setBannerImages([{
            name: itemRef.name,
            imageRef: itemRef
          },...bannerImages])
        })
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const setBannerImagesOptions = useMemo(()=>{
    return [{ value: '', label: '---' }, ...Object.entries(bannerImages).map(item => ({ value: item[1].imageRef, label: item[1].name }))]
  },[bannerImages])

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
      <Typography variant='h2' sx={{ textAlign: 'center' }}>Banner</Typography>

      <Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <HfField
              name='bannerImageInput'
              label='Deletar Item'
              inputType='flat'
              control={control}
              component={SelectInput}
              options={setBannerImagesOptions}
            />
            {selectedItem && (
              <Stack spacing={2}>
                <Typography sx={{ color: '#9CADBF', marginTop: 2 }}><b>Nome:</b> {selectedItem?.name}</Typography>
                <Button onClick={removeBannerImage} sx={{ marginTop: 3 }} disabled={!selectedItemWatch} type='submit'>Deletar</Button>
              </Stack>
            )}

            <Stack spacing={2} mt={5}>
              <Stack alignItems='center'  direction={isMobile ? 'column' : 'row'} mt={5}>
                <Typography variant='h6' sx={{ color: '#9CADBF', marginRight: 2 }}>Nova imagem: </Typography>
                <input type='file' onChange={handleImage} accept='image/png, image/jpeg' placeholder='Imagem'/>
              </Stack>
              <Button
                variant='primary'
                onClick={addBannerImage}
                disabled={!(!!newBannerImage)}
              >
              Inserir imagem
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Drawer>
  )
}
