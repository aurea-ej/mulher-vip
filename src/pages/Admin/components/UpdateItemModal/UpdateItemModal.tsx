import * as yup from 'yup'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useMemo, useEffect } from 'react'
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
  const isMobile = useIsMobile()
  const { enqueueSnackbar } = useSnackbar()
  const { storeState: { items }, operations: { updateItems } } = useItemsStore()
  const isAvailableOptions = [{ value: 0, label: '---' },{ value: 1, label: 'Disponível' }, { value: 2, label: 'Indisponível' }]

  const ItemsOptions = useMemo(()=> {
    return [{ value: '', label: '---' }, ...Object.entries(items).map(item => ({ value: item[1].id, label: item[1].name }))]
  },[items])

  const validationSchema: yup.SchemaOf<InsertItemFormValues> = yup.object().shape({
    category: yup.mixed().required('Campo obrigatório'),
    code: yup.mixed().required('Campo obrigatório'),
    description: yup.string().required('Campo obrigatório'),
    imageUrl: yup.string().required('Campo obrigatório'),
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

  const { control, handleSubmit, watch, reset, formState: { errors }, setValue } = useForm<InsertItemFormValues>({
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
    const arraySize = [!!sizeP, !!sizeM, !!sizeG, !!sizePS, !!sizeTU]

    update(ref(db, '/products/' + selectedItemWatch), { ...formValues, arraySize } ).then(()=>{
      return enqueueSnackbar('Item atualizado com sucesso!', {
        variant: 'success',
        autoHideDuration: 3000
      })
    }).catch(()=>{
      return enqueueSnackbar('Ops! ocorreu um erro ao tentar atualizar o item', {
        variant: 'error',
        autoHideDuration: 3000
      })
    })
  }

  // useEffect(() => {
  //   const item: Item = items.filter(item => item.id === selectedItemWatch)[0]
  //   if(item){
  //     setValue('name', item?.name)
  //     setValue('price', item?.price)
  //     setValue('imageUrl', item?.imageUrl)
  //     setValue('description', item?.description)
  //     setValue('sizeP', item?.arraySize[0])
  //     setValue('sizeM', item?.arraySize[1])
  //     setValue('sizeG', item?.arraySize[2])
  //     setValue('sizePS', item?.arraySize[3])
  //     setValue('sizeTU', item?.arraySize[4])
  //     return
  //   }
  //   resetForm()
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[selectedItemWatch])

  useEffect(()=> {
    if(items.length === 0){
      getProducts(updateItems)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // console.log('items',items[selectedItemWatch])

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
              placeholder='Nome'
              inputType='flat'
              control={control}
              component={TextInput}
              errorMessage={errors.name?.message}
            />
            <HfField
              name='description'
              inputType='flat'
              control={control}
              placeholder='Descrição'
              component={TextInput}
              errorMessage={errors.description?.message}
            />
            <HfField
              name='imageUrl'
              inputType='flat'
              control={control}
              placeholder='Url'
              component={TextInput}
              errorMessage={errors.imageUrl?.message}
            />
            <HfField
              name='price'
              inputType='flat'
              control={control}
              placeholder='Preço'
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
            <Button sx={{ marginTop: 5 }} variant='primary' disabled={!selectedItemWatch} type='submit'>Atualizar</Button>
          </Stack>
        </form>
      </Stack>
    </Drawer>
  )
}
