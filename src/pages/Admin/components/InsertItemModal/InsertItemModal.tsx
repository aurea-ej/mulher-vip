import * as yup from 'yup'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { Close } from '@mui/icons-material'
import { Item, Size } from '../../../../types/item'
import { useIsMobile } from '../../../../hooks'
import { ModalProps } from '../../../../types/util'
import { yupResolver } from '@hookform/resolvers/yup'
import { getDatabase, ref, set, child, push } from 'firebase/database'
import { categoryOptions, codeOptions } from '../../../../utils/options'
import { Drawer, Stack, Typography, FormGroup, FormControl } from '@mui/material'
import { HfField, TextInput, SelectInput, CheckBox, Button } from '../../../../components'

type SizeOptions = {
  sizeP?: boolean
  sizeM?: boolean
  sizeG?: boolean
  sizePS?: boolean
  sizeTU?: boolean
}

type InsertItemFormValues = Partial<Item> & SizeOptions

export const InsertItemModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  const db = getDatabase()
  const isMobile = useIsMobile()
  const { enqueueSnackbar } = useSnackbar()
  const isAvailableOptions = [{ value: 0, label: '---' },{ value: 1, label: 'Disponível' }, { value: 2, label: 'Indisponível' }]

  const DEFAULT_FORM_VALUES: InsertItemFormValues  = {
    category: 'CLOTHES',
    code: 'BLUSA',
    description: '',
    imageUrl: '',
    name: '',
    price: '',
    isAvailable: 0,
  }

  const validationSchema: yup.SchemaOf<InsertItemFormValues> = yup.object().shape({
    category: yup.mixed().required('Campo obrigatório'),
    code: yup.mixed().required('Campo obrigatório'),
    description: yup.string().required('Campo obrigatório'),
    imageUrl: yup.string().required('Campo obrigatório'),
    name: yup.string().required('Campo obrigatório'),
    price: yup.number().required('Campo obrigatório'),
    id: yup.string(),
    arraySize: yup.mixed(),
    isAvailable: yup.mixed().test('','Opção inválida',(item) => item > 0).required(),
    sizeP: yup.boolean(),
    sizeM: yup.boolean(),
    sizeG: yup.boolean(),
    sizePS: yup.boolean(),
    sizeTU: yup.boolean(),
  })

  const { control, handleSubmit, watch, formState: { errors } } = useForm<InsertItemFormValues>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(validationSchema)
  })

  const sizeP = watch('sizeP')
  const sizeM = watch('sizeM')
  const sizeG = watch('sizeG')
  const sizePS = watch('sizePS')
  const sizeTU = watch('sizeTU')

  const onSubmit = (formValues: InsertItemFormValues ) => {
    const arraySize = [!!sizeP, !!sizeM, !!sizeG, !!sizePS, !!sizeTU]

    const key = push(child(ref(db), 'products')).key
    set(ref(db, 'products/' + key), { ...formValues, id: key, arraySize })
      .then(() => {
        return enqueueSnackbar('Item inserido com sucesso',{
          variant: 'success',
          autoHideDuration: 3000
        })
      })
      .catch(() => {
        return enqueueSnackbar('Ops, ocorreu um problema ao inserir item',{
          variant: 'error',
          autoHideDuration: 3000
        })
      })
  }

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
      <Typography variant='h2' sx={{ textAlign: 'center' }} >Inserir item</Typography>

      <Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <HfField
              name='name'
              inputType='flat'
              control={control}
              placeholder='Nome'
              component={TextInput}
              errorMessage={errors.name?.message}
            />
            <HfField
              name='description'
              inputType='flat'
              control={control}
              component={TextInput}
              placeholder='Descrição'
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
              placeholder='Categoria'
              options={categoryOptions}
              component={SelectInput}
              errorMessage={errors.category?.message}
            />
            <HfField
              name='code'
              inputType='flat'
              control={control}
              options={codeOptions}
              placeholder='Código'
              component={SelectInput}
              errorMessage={errors.code?.message}
            />
            <HfField
              name='isAvailable'
              inputType='flat'
              control={control}
              options={isAvailableOptions}
              placeholder='Disponibilidade'
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
            <Button sx={{ marginTop: 5 }} variant='primary' type='submit'>Inserir</Button>
          </Stack>
        </form>
      </Stack>
    </Drawer>
  )
}
