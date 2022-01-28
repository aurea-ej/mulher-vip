import * as yup from 'yup'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useMemo, useEffect } from 'react'
import { Close } from '@mui/icons-material'
import { Item } from '../../../../types/item'
import { ModalProps } from '../../../../types/util'
import { yupResolver } from '@hookform/resolvers/yup'
import { getDatabase, ref,update } from 'firebase/database'
import { getProducts } from '../../../../hooks/useGetProducts'
import { useItemsStore } from '../../../../store/items/reducer'
import { Drawer, Stack, Typography, Button } from '@mui/material'
import { categoryOptions, codeOptions } from '../../../../utils/options'
import { HfField, TextInput, SelectInput } from '../../../../components'

type InsertItemFormValues = Partial<Item> & {
  item?: any
}

export const UpdateItemModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  const db = getDatabase()
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
    // size: yup.mixed(),
    isAvailable: yup.mixed().test('','Opção inválida',(item) => item > 0).required('Campo obrigatório'),
    item: yup.mixed()
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

  const onSubmit = (formValues: InsertItemFormValues ) => {
    update(ref(db, '/products/' + selectedItemWatch), formValues ).then(()=>{
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

  useEffect(() => {
    const item: Item = items.filter(item => item.id === selectedItemWatch)[0]
    if(item){
      setValue('name', item?.name)
      setValue('price', item?.price)
      setValue('imageUrl', item?.imageUrl)
      setValue('description', item?.description)
      return
    }
    resetForm()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedItemWatch])

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
      PaperProps={{ sx: { maxHeight: '90vh', height: '90vh', padding: 2, borderRadius: 3 } }}
    >
      <Stack alignItems='flex-end'>
        <Close sx={{ cursor: 'pointer', marginX: 1 }} onClick={closeModal} />
      </Stack>
      <Typography variant='h2' sx={{ textAlign: 'center' }} >Atualizar item</Typography>

      <Stack>
        <button onClick={resetForm}>resetar</button>
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
              name='imageUrl'
              inputType='flat'
              control={control}
              label='Url'
              component={TextInput}
              errorMessage={errors.imageUrl?.message}
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
            <Button disabled={!selectedItemWatch} type='submit'>Atualizar</Button>
          </Stack>
        </form>
      </Stack>
    </Drawer>
  )
}
