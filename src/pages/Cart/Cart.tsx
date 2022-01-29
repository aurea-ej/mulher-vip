import { useEffect, useState } from 'react'
import 'firebase/auth'
import 'firebase/database'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router'
import { app } from '../../FIREBASECONFIG.js'
import { CartItem, Sale } from '../../types/item'
import { Box, Button, Stack } from '@mui/material'
import { getUserInfos } from '../../hooks/useUseInfo'
import { useAccountStore } from '../../store/account/reducer'
import { useCartItemsStore } from '../../store/cartItems/reducer'
import { Container, SmallCardItem, EmptyPage } from '../../components'
import { getDatabase, ref, child, get, set, push, remove } from 'firebase/database'

export const Cart: React.FC = () => {
  const db = getDatabase(app)
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { storeState: { account }, operations: { updateAccount } } = useAccountStore()
  const { storeState: { CartItems }, operations: { updateCartItems, resetCartItems } } = useCartItemsStore()

  const getCartProducts = () => {
    if(account){
      const cartProductsRef = ref(db)
      get(child(cartProductsRef, 'cart/' + account.id)).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val() as CartItem[]
          var items = Object.keys(data).map((key: any) => data[key])
          if(items.length > 0 ){
            updateCartItems(items)
            return
          }
        }
      }).catch(() => {
        return enqueueSnackbar('Ocorreu um erro ao recuperar seus itens do carrinho', { 
          variant: 'error',
          autoHideDuration: 3000
        })
      })
      return
    }

    enqueueSnackbar('Você precisa ter uma conta para acessar o carrinho', { 
      variant: 'warning',
      autoHideDuration: 4000
    })
    return history.push('account')
  }

  const finishBuy = () => {
    if(account && CartItems.length > 0){
      const sale: Sale = {
        account,
        items: CartItems,
      }
      const key = push(child(ref(db), 'sales')).key
      set(ref(db, 'sales/' + key), sale)
        .then(()=>{
          remove(ref(db, '/cart/' +  account.id))
            .then(()=>{
              resetCartItems()
              return enqueueSnackbar('Compra finalizada', { 
                variant: 'success',
                autoHideDuration: 3000
              })
            })
        })
        .catch(() => {
          return enqueueSnackbar('Ops! ocorreu um erro ao realizar o cadastro', { 
            variant: 'error',
            autoHideDuration: 3000
          })
        })
    }
  }

  const clearCart = () => {
    resetCartItems()
    return
  }

  useEffect(()=>{
    if(!account) {
      getUserInfos(updateAccount)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    getCartProducts()
    setIsLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if(isLoading) {
    return <EmptyPage />
  }

  if(CartItems.length === 0) {
    return <EmptyPage />
  }

  return (
    <Box sx={{ backgroundColor: '#3b3b3b' }}>
      <Container>
        {CartItems && (
          <Stack alignItems='center'>
            {CartItems.map(item => <SmallCardItem item={item} />)}
          </Stack>
        )}
        <Button onClick={finishBuy}>Concluir compra</Button>
        <Button onClick={clearCart}>Limpar carrinho</Button>
        {!CartItems && <div>Sem itens</div>}
      </Container>
    </Box>
  )
}
