import 'firebase/auth'
import 'firebase/database'
import * as yup from 'yup'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { Box, Button, Stack } from '@mui/material'
import { app } from '../../../../FIREBASECONFIG.js'
import { User, Account } from '../../../../types/user'
import { yupResolver } from '@hookform/resolvers/yup'
import { getDatabase, ref, set } from 'firebase/database'
import { useUserStore } from '../../../../store/user/reducer'
import { Container, HfField, TextInput } from '../../../../components'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

type formValuesType = Omit<Account, 'isAdmin' | 'id'> & { senha: string }

export const SignUp: React.FC = () => {
  const auth = getAuth()
  const db = getDatabase(app)
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const { operations: { updateUser } } = useUserStore()

  const DEFAULT_FORM_VALUES: formValuesType  = {
    cep: '',
    city: '',
    name: '',
    senha: '',
    phone: '',
    email: '',
    address: '',
    district: '',
    houseNumber: '',
  }

  const validationSchema: yup.SchemaOf<formValuesType> = yup.object().shape({
    cep: yup.string().required('Campo obrigatório'),
    senha: yup.string().required('Campo obrigatório'),
    city: yup.string().required('Campo obrigatório'),
    name: yup.string().required('Campo obrigatório'),
    phone: yup.string().required('Campo obrigatório'),
    address: yup.string().required('Campo obrigatório'),
    district: yup.string().required('Campo obrigatório'),
    houseNumber: yup.string().required('Campo obrigatório'),
    email: yup.string().required('Campo obrigatório').email('Email inválido'),
  })

  const onSubmit = (formValues: formValuesType ) => {
    createUserWithEmailAndPassword(auth, formValues.email, formValues.senha)
      .then((userCredential) => {
        const user = userCredential.user as unknown as User
        setUserInfos(user, formValues)
        history.push('account')
      })
      .catch(() => {
        return enqueueSnackbar('Ops! ocorreu um erro ao realizar o cadastro', { 
          variant: 'error',
          autoHideDuration: 3000
        })
      })
  }

  const setUserInfos = (user: User, formValues: formValuesType ) => {

    set(ref(db, 'userInfo/' + user.uid), { ...formValues, id: user.uid, isAdmin: false })
      .then(()=>{
        updateUser(user)
        return enqueueSnackbar('Cadastro realizado com sucesso', { 
          variant: 'success',
          autoHideDuration: 3000
        })
      })
      .catch(() => {
        return enqueueSnackbar('Ops! ocorreu um erro ao realizar o cadastro', { 
          variant: 'error',
          autoHideDuration: 3000
        })
      })
  }

  const { control, handleSubmit, formState: { errors } } = useForm<formValuesType>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(validationSchema)
  })

  return (
    <Box sx={{ backgroundColor: '#3b3b3b' }}>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <HfField
              name='email'
              inputType='flat'
              control={control}
              label='Seu e-mail'
              component={TextInput}
              errorMessage={errors.email?.message}
            />
            <HfField
              name='senha'
              inputType='flat'
              control={control}
              label='Senha'
              component={TextInput}
              errorMessage={errors.senha?.message}
            />
            <HfField
              name='name'
              inputType='flat'
              control={control}
              label='Seu nome'
              component={TextInput}
              errorMessage={errors.name?.message}
            />
            <HfField
              name='phone'
              inputType='flat'
              control={control}
              label='Telefone'
              component={TextInput}
              errorMessage={errors.phone?.message}
            />
            <HfField
              name='city'
              inputType='flat'
              control={control}
              label='Cidade'
              component={TextInput}
              errorMessage={errors.city?.message}
            />
            <HfField
              name='cep'
              inputType='flat'
              control={control}
              label='CEP'
              component={TextInput}
              errorMessage={errors.cep?.message}
            />
            <HfField
              name='address'
              inputType='flat'
              control={control}
              label='Rua'
              component={TextInput}
              errorMessage={errors.address?.message}
            />
            <HfField
              name='district'
              inputType='flat'
              control={control}
              label='Bairro'
              component={TextInput}
              errorMessage={errors.district?.message}
            />
            <HfField
              name='houseNumber'
              inputType='flat'
              control={control}
              label='Número da casa'
              component={TextInput}
              errorMessage={errors.houseNumber?.message}
            />
            <Button type='submit'>Entrar</Button>
          </Stack>
        </form>
      </Container>
    </Box>
  )
}