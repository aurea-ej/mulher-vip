import * as yup from 'yup'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useMemo, useEffect, useState } from 'react'
import { Close } from '@mui/icons-material'
import { Size } from '../../../../types/item'
import { Item } from '../../../../types/item'
import { useIsMobile } from '../../../../hooks'
import { ModalProps } from '../../../../types/util'
import { yupResolver } from '@hookform/resolvers/yup'
import { getDatabase, ref,update } from 'firebase/database'
import { getProducts } from '../../../../hooks/useGetProducts'
import { useItemsStore } from '../../../../store/items/reducer'
import { categoryOptions, codeOptions } from '../../../../utils/options'
import { Drawer, Stack, Typography, FormControl, FormGroup } from '@mui/material'
import { HfField, TextInput, SelectInput, Button, CheckBox } from '../../../../components'
import { uploadBytes, ref as storageRef, getStorage, getDownloadURL } from 'firebase/storage'


type SizeOptions = {
  sizeP?: boolean
  sizeM?: boolean
  sizeG?: boolean
  sizePS?: boolean
  sizeTU?: boolean
}

type InsertItemFormValues = Partial<Item> & SizeOptions & {
  item?: any
}

export const UpdateItemModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  const db = getDatabase()
  const storage = getStorage()
  const isMobile = useIsMobile()
  const { enqueueSnackbar } = useSnackbar()
  const [newProductImage, setProductImage] = useState<any>()
  const [newProductImageUrl, setProductImageUrl] = useState<string>()
  const { storeState: { items }, operations: { updateItems } } = useItemsStore()
  const [insertImageIsLoading, setInsertImageIsLoading] = useState<boolean>(false)
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const isAvailableOptions = [{ value: 0, label: '---' },{ value: 1, label: 'Disponível' }, { value: 2, label: 'Indisponível' }]

  const ItemsOptions = useMemo(()=> {
    return [{ value: '', label: '---' }, ...Object.entries(items).map(item => ({ value: item[1].id, label: item[1].name }))]
  },[items])

  const validationSchema: yup.SchemaOf<InsertItemFormValues> = yup.object().shape({
    category: yup.mixed().required('Campo obrigatório'),
    code: yup.mixed().required('Campo obrigatório'),
    description: yup.string().required('Campo obrigatório'),
    imageUrl: yup.string(),
    name: yup.string().required('Campo obrigatório'),
    price: yup.number().required('Campo obrigatório'),
    id: yup.string(),
    arraySize: yup.mixed(),
    isAvailable: yup.mixed().test('','Opção inválida',(item) => item > 0).required('Campo obrigatório'),
    item: yup.mixed(),
    sizeP: yup.boolean(),
    sizeM: yup.boolean(),
    sizeG: yup.boolean(),
    sizePS: yup.boolean(),
    sizeTU: yup.boolean(),
  })

  const { control, handleSubmit, watch, reset, formState: { errors } } = useForm<InsertItemFormValues>({
    resolver: yupResolver(validationSchema)
  })

  const resetForm = () => {
    reset({
      name: '',
      price: '',
      imageUrl: '',
      description: '',
    })
  }

  const selectedItemWatch = watch('item')
  const sizeP = watch('sizeP')
  const sizeM = watch('sizeM')
  const sizeG = watch('sizeG')
  const sizePS = watch('sizePS')
  const sizeTU = watch('sizeTU')

  const onSubmit = (formValues: InsertItemFormValues ) => {
    setIsUpdating(true)
    const arraySize = [!!sizeP, !!sizeM, !!sizeG, !!sizePS, !!sizeTU]

    update(ref(db, '/products/' + selectedItemWatch), { ...formValues, arraySize, imageUrl: newProductImageUrl } ).then(()=>{
      setIsUpdating(false)
      resetForm()
      return enqueueSnackbar('Item atualizado com sucesso!', {
        variant: 'success',
        autoHideDuration: 3000
      })
    }).catch(()=>{
      setIsUpdating(false)
      return enqueueSnackbar('Ops! ocorreu um erro ao tentar atualizar o item', {
        variant: 'error',
        autoHideDuration: 3000
      })
    })
  }

  const handleImage = (event: any) => {
    const file = event.target.files[0]
    setProductImage(file)
  }

  const generateImageUrl = () => {
    setInsertImageIsLoading(true)
    const imageRef = storageRef(storage,`productsImages/${newProductImage.name.trim()}`)

    uploadBytes(imageRef, newProductImage).then((snapshot: any) => {
      getDownloadURL(storageRef(imageRef))
        .then((downloadURL) => {
          setInsertImageIsLoading(false)
          setProductImageUrl(downloadURL)
        })
      setInsertImageIsLoading(false)
      return enqueueSnackbar('Imagem adicionada com sucesso',{
        variant: 'success',
        autoHideDuration: 3000
      })
    })
  }

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
      <Typography variant='h2' sx={{ textAlign: 'center' }} >Atualizar item</Typography>

      <Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <HfField
              name='item'
              label='Selecionar item'
              inputType='flat'
              control={control}
              options={ItemsOptions}
              component={SelectInput}
            />
            <HfField
              name='name'
              label='Nome'
              inputType='flat'
              control={control}
              component={TextInput}
              errorMessage={errors.name?.message}
            />
            <HfField
              name='description'
              inputType='flat'
              control={control}
              label='Descrição'
              component={TextInput}
              errorMessage={errors.description?.message}
            />
            <HfField
              name='price'
              inputType='flat'
              control={control}
              label='Preço'
              component={TextInput}
              errorMessage={errors.price?.message}
            />
            <HfField
              name='category'
              inputType='flat'
              control={control}
              label='Categoria'
              options={categoryOptions}
              component={SelectInput}
              errorMessage={errors.category?.message}
            />
            <HfField
              name='code'
              inputType='flat'
              control={control}
              options={codeOptions}
              label='Código'
              component={SelectInput}
              errorMessage={errors.code?.message}
            />
            <HfField
              name='isAvailable'
              inputType='flat'
              control={control}
              options={isAvailableOptions}
              label='Disponibilidade'
              component={SelectInput}
              errorMessage={errors.isAvailable?.message}
            />
            <Stack spacing={2} mt={5}>
              <Stack alignItems='center'  direction={isMobile ? 'column' : 'row'} mt={5}>
                <Typography variant='h6' sx={{ color: '#9CADBF', marginRight: 2 }}>Imagem do produto: </Typography>
                <input type='file' onChange={handleImage} accept='image/png, image/jpeg' placeholder='Imagem'/>
              </Stack>
              <Button
                variant='secondary'
                sx={{ width: isMobile? '100%' : '30%' }}
                onClick={generateImageUrl}
                isLoading={insertImageIsLoading}
                disabled={!(!!newProductImage)}
              >
              Inserir imagem
              </Button>
            </Stack>
            <Stack>
              <Typography>Tamanhos disponíveis:</Typography>
              <FormControl>
                <FormGroup sx={{ display: 'flex' }} row>
                  <HfField
                    component={CheckBox}
                    control={control}
                    checked={sizeP}
                    name='sizeP'
                    label={Size.P}
                    color='secondary'
                  />
                  <HfField
                    component={CheckBox}
                    control={control}
                    checked={sizeM}
                    name='sizeM'
                    label={Size.M}
                    color='secondary'
                  />
                  <HfField
                    component={CheckBox}
                    control={control}
                    checked={sizeG}
                    name='sizeG'
                    label={Size.G}
                    color='secondary'
                  />
                  <HfField
                    component={CheckBox}
                    control={control}
                    checked={sizePS}
                    name='sizePS'
                    label={Size.PS}
                    color='secondary'
                  />
                  <HfField
                    component={CheckBox}
                    control={control}
                    checked={sizeTU}
                    name='sizeTU'
                    label={Size.TU}
                    color='secondary'
                  />
                </FormGroup>
              </FormControl>
            </Stack>
            <Button sx={{ marginTop: 5 }} variant='primary' disabled={!selectedItemWatch} isLoading={isUpdating} type='submit'>Atualizar</Button>
          </Stack>
        </form>
      </Stack>
    </Drawer>
  )
}
