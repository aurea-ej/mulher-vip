import { useEffect } from 'react'
import 'firebase/auth'
import 'firebase/database'
import { User } from '../../types/user'
import { useSnackbar } from 'notistack'
import { Container } from '../../components'
import { app } from '../../FIREBASECONFIG.js'
import { SignIn, ProfileCard } from './components'
import { useUserStore } from '../../store/user/reducer'
import { Account as AccountProps } from '../../types/user'
import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useAccountStore } from '../../store/account/reducer'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

export const Account: React.FC = () => {
  const auth = getAuth(app)
  const db = getDatabase(app)
  const { enqueueSnackbar } = useSnackbar()
  const { operations: { updateUser }, storeState: { user } } = useUserStore()
  const { operations: { updateAccount }, storeState: { account } } = useAccountStore()

  const getUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        updateUser(user as unknown as User)
        getUserInfos(user as unknown as User)
      }
    })
  }

  const getUserInfos = (user: User) =>{
    const userInfosRef = ref(db, 'userInfo/' + user.uid)
    onValue(userInfosRef, (snapshot) => {
      const data = snapshot.val() as AccountProps
      if(data){
        updateAccount(data)
        return 
      }
      return enqueueSnackbar('Ops! ocorreu um erro ao recuperar suas informações', { 
        variant: 'error',
        autoHideDuration: 3000
      })
    })
  }

  useEffect(()=>{
    if(!user) {
      getUser()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])

  if(!account) {
    return (
      <Container>
        <CircularProgress sx={{ color: '#a9cf46' }} />
      </Container>
    )
  }

  if(!user) {
    return <SignIn />
  }

  return (
    <Container>
      <Stack alignItems='center' sx={{ height: '100%', bgcolor: 'transparent', width: '100%' }}>
        <Typography variant='h2' sx={{ textAlign: 'center' }}>{account?.name}</Typography>
        <Grid mt={10} container spacing={2}>
          <Grid item xs={4}>
            <ProfileCard title='Cidade' value={account!.city} />
          </Grid>
          <Grid item xs={4}>
            <ProfileCard title='Bairro' value={account!.district} />
          </Grid>
          <Grid item xs={4}>
            <ProfileCard title='Rua' value={account!.address} />
          </Grid>
          <Grid item xs={4}>
            <ProfileCard title='Número da casa' value={account!.houseNumber} />
          </Grid>
          <Grid item xs={4}>
            <ProfileCard title='Telefone' value={account!.phone} />
          </Grid>
          <Grid item xs={4}>
            <ProfileCard title='E-mail' value={account!.email} />
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
          onClick={()=>signOut(auth)}>
          Sair
        </Box>
      </Stack>
    </Container>
  )
}
