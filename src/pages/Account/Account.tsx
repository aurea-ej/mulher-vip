import { useEffect, useState } from 'react'
import 'firebase/auth'
import 'firebase/database'
import { User } from '../../types/user'
import { useSnackbar } from 'notistack'
import { Container } from '../../components'
import { app } from '../../FIREBASECONFIG.js'
import { SignIn, ProfileCard } from './components'
import { getUserInfos } from '../../hooks/useUseInfo'
import { useUserStore } from '../../store/user/reducer'
import { useAccountStore } from '../../store/account/reducer'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import { formatDateTime } from '../../utils/format'

export const Account: React.FC = () => {
  const auth = getAuth(app)
  const { enqueueSnackbar } = useSnackbar()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { operations: { updateUser }, storeState: { user } } = useUserStore()
  const { operations: { updateAccount }, storeState: { account } } = useAccountStore()

  const getUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        updateUser(user as unknown as User)
        getUserInfos(updateAccount)
      }
      setIsLoading(false)
    })
  }

  const onSignOut = () => {
    signOut(auth).then(()=>{
      window.location.reload()
    }).catch(()=>{
      return enqueueSnackbar('Ocorreu um erro ao sair da sua conta', {
        variant: 'error',
        autoHideDuration: 3000,
      })
    })
  }

  useEffect(()=>{
    if(!user || !account) {
      getUser()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if(isLoading) {
    return (
      <Container>
        <CircularProgress sx={{ color: '#a9cf46' }} />
      </Container>
    )
  }

  if(!isLoading && (!user || !account)) {
    return <SignIn />
  }

  return (
    <Container>
      <Stack alignItems='center' sx={{ height: '100%', bgcolor: 'transparent', width: '100%' }}>
        <Typography variant='h2' sx={{ textAlign: 'center' }}>{account?.name}</Typography>
        <Grid mt={10} container spacing={2} alignItems='center' justifyContent='center' sx={{ width: '100%' }}>
          <Grid item xs={5}>
            <ProfileCard title='Cidade' value={account!.city} />
          </Grid>
          <Grid item xs={5}>
            <ProfileCard title='Bairro' value={account!.district} />
          </Grid>
          <Grid item xs={5}>
            <ProfileCard title='Rua' value={account!.address} />
          </Grid>
          <Grid item xs={5}>
            <ProfileCard title='Número da casa' value={account!.houseNumber} />
          </Grid>
          <Grid item xs={5}>
            <ProfileCard title='Telefone' value={account!.phone} />
          </Grid>
          <Grid item xs={5}>
            <ProfileCard title='E-mail' value={account!.email} />
          </Grid>
          <Grid item xs={5}>
            <ProfileCard title='Data de nascimento' value={formatDateTime(new Date(account!.birthDate!))} />
          </Grid>
        </Grid>
        <Box
          sx={{
            paddingX: 5,
            paddingY: 1,
            color: 'white',
            cursor: 'pointer',
            borderRadius: '30px',
            bgcolor: 'rgba(169, 207, 70, .7)',
          }}
          mt={8}
          // onClick={()=>onSignOut()}
        >
          Sair
        </Box>
      </Stack>
    </Container>
  )
}
