import 'firebase/auth'
import 'firebase/database'
import * as yup from 'yup'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { app } from '../../../../FIREBASECONFIG.js'
import { User, Account } from '../../../../types/user'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Grid, Stack } from '@mui/material'
import { getDatabase, ref, set } from 'firebase/database'
import { useIsMobile } from '../../../../hooks/useIsMobile'
import { useUserStore } from '../../../../store/user/reducer'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { Container, HfField, TextInput, PasswordInput, DateInput } from '../../../../components'

type formValuesType = Omit<Account, 'isAdmin' | 'id'> & { senha: string | null }

export const SignUp: React.FC = () => {
  const auth = getAuth()
  const db = getDatabase(app)
  const history = useHistory()
  const isMobile = useIsMobile()
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
    birthDate: null,
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
    birthDate: yup.date().required('Campo obrigatório'),
  })

  const onSubmit = (formValues: formValuesType ) => {
    try {
      createUserWithEmailAndPassword(auth, formValues.email, formValues.senha!)
        .then((userCredential) => {
          const user = userCredential.user as unknown as User
          formValues.senha = null
          formValues.birthDate = formValues.birthDate!.toString()
          set(ref(db, 'userInfo/' + user.uid), { ...formValues, id: user.uid, isAdmin: false })
            .then(()=>{
              updateUser(user)
              history.push('/')
              return enqueueSnackbar('Cadastro realizado com sucesso', { 
                variant: 'success',
                autoHideDuration: 3000
              })
            })
        })
    } catch (error) {
      return enqueueSnackbar('Ops! ocorreu um erro ao realizar o cadastro', { 
        variant: 'error',
        autoHideDuration: 3000
      })
    }
  }

  const { control, handleSubmit, formState: { errors } } = useForm<formValuesType>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: yupResolver(validationSchema)
  })

  return (
    <Container>
      <Box sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid spacing={2} container>
            <Grid item md={isMobile ? 12 : 4} lg={isMobile ? 12 : 4} xs={isMobile ? 12 : 4}>
              <HfField
                name='email'
                inputType='flat'
                control={control}
                placeholder='Seu e-mail'
                component={TextInput}
                errorMessage={errors.email?.message}
              />
            </Grid>
            <Grid item md={isMobile ? 12 : 4} lg={isMobile ? 12 : 4} xs={isMobile ? 12 : 4}>
              <HfField
                name='senha'
                placeholder='Senha'
                inputType='flat'
                control={control}
                component={PasswordInput}
                errorMessage={errors.senha?.message}
              />
            </Grid>
            <Grid item md={isMobile ? 12 : 4} lg={isMobile ? 12 : 4} xs={isMobile ? 12 : 4}>
              <HfField
                name='name'
                inputType='flat'
                control={control}
                placeholder='Seu nome'
                component={TextInput}
                errorMessage={errors.name?.message}
              />
            </Grid>
            <Grid item md={isMobile ? 12 : 4} lg={isMobile ? 12 : 4} xs={isMobile ? 12 : 4}>
              <HfField
                name='phone'
                inputType='flat'
                control={control}
                placeholder='Telefone'
                component={TextInput}
                errorMessage={errors.phone?.message}
              />
            </Grid>
            <Grid item md={isMobile ? 12 : 4} lg={isMobile ? 12 : 4} xs={isMobile ? 12 : 4}>
              <HfField
                name='city'
                inputType='flat'
                control={control}
                placeholder='Cidade'
                component={TextInput}
                errorMessage={errors.city?.message}
              />
            </Grid>
            <Grid item md={isMobile ? 12 : 4} lg={isMobile ? 12 : 4} xs={isMobile ? 12 : 4}>
              <HfField
                name='cep'
                inputType='flat'
                control={control}
                placeholder='CEP'
                component={TextInput}
                errorMessage={errors.cep?.message}
              />
            </Grid>
            <Grid item md={isMobile ? 12 : 4} lg={isMobile ? 12 : 4} xs={isMobile ? 12 : 4}>
              <HfField
                name='address'
                inputType='flat'
                control={control}
                placeholder='Rua'
                component={TextInput}
                errorMessage={errors.address?.message}
              />
            </Grid>
            <Grid item md={isMobile ? 12 : 4} lg={isMobile ? 12 : 4} xs={isMobile ? 12 : 4}>
              <HfField
                name='district'
                inputType='flat'
                control={control}
                placeholder='Bairro'
                component={TextInput}
                errorMessage={errors.district?.message}
              />
            </Grid>
            <Grid item md={isMobile ? 12 : 4} lg={isMobile ? 12 : 4} xs={isMobile ? 12 : 4}>
              <HfField
                name='houseNumber'
                inputType='flat'
                control={control}
                placeholder='Número da casa'
                component={TextInput}
                errorMessage={errors.houseNumber?.message}
              />
            </Grid>
            <Grid item md={isMobile ? 12 : 4} lg={isMobile ? 12 : 4} xs={isMobile ? 12 : 4}>
              <HfField
                name='birthDate'
                inputType='flat'
                control={control}
                component={DateInput}
                label='Data de nascimento'
                errorMessage={errors.birthDate?.message}
              />
            </Grid>
          </Grid>
          <Stack mt={3} alignItems='center' justifyContent='center' sx={{ width: '100%' }}>
            <Box
              type='submit'
              component={Button}
              sx={{
                padding: 2,
                color: 'white',
                borderRadius: 3,
                alignItems: 'center',
                cursor: 'pointer',
                bgcolor: '#a9cf46',
                width: isMobile ? '80vw' : 'auto',
                '&:hover': { backgroundColor: '#a9cf46' },
                boxShadow: '0px 0px 5px rgba(169, 207, 70, 1)',
              }}
            >Criar conta</Box>
          </Stack>
        </form>
      </Box>
    </Container>
  )
}
