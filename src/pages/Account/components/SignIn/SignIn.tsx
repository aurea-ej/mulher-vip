import { useState } from 'react'
import 'firebase/auth'
import 'firebase/database'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router'
import { User } from '../../../../types/user'
import { Container } from '../../../../components'
import { Box, Button, Input } from '@mui/material'
import { app } from '../../../../FIREBASECONFIG.js'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useUserStore } from '../../../../store/user/reducer'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useAccountStore } from '../../../../store/account/reducer'

export const SignIn: React.FC = () => {
  const auth = getAuth()
  const db = getDatabase(app)
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const[email, setEmail] = useState<string>('')
  const[password, setPassword] = useState<string>('')
  const { operations: { updateUser } } = useUserStore()
  const { operations: { updateAccount } } = useAccountStore()

  const sigIn = () => {
    if(email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user as unknown as User
          updateUser(user)
          getUserInfos(user)
        })
        .catch((error) => {
          return enqueueSnackbar(error.message, { 
            variant: 'error', 
            autoHideDuration: 6000 
          })
        })
    }
  }

  const getUserInfos = (user: User) =>{
    const userInfosRef = ref(db, 'userInfos/' + user.uid)
    onValue(userInfosRef, (snapshot) => {
      const data = snapshot.val()
      // var account = Object.keys(data).map((key: any) => data[key])
      if(data){
        updateAccount(data)
        return history.push('account')
      }
      return enqueueSnackbar('Ops! ocorreu um erro ao tentar buscar suas informações', { 
        variant: 'error',
        autoHideDuration: 3000
      })
    })
  }

  return (
    <Box sx={{ backgroundColor: '#3b3b3b' }}>
      <Container>
        <Input placeholder='Email' onChange={(event)=>setEmail(event.target.value)} />
        <Input placeholder='Senha' onChange={(event)=>setPassword(event.target.value)} />
        <Button onClick={sigIn}>Entrar</Button>
        <Button onClick={()=>history.push('SignUp')}>Cadastrar</Button>
      </Container>
    </Box>
  )
}