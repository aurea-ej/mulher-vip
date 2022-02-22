import { useEffect, useState } from 'react'
import 'firebase/auth'
import 'firebase/database'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router'
import { app } from '../../FIREBASECONFIG.js'
import { CartItem, Sale } from '../../types/item'
import { PaymentMethod } from '../../types/payment'
import { formatToRealStr } from '../../utils/format'
import { getUserInfos } from '../../hooks/useUseInfo'
import { useAccountStore } from '../../store/account/reducer'
import { useCartItemsStore } from '../../store/cartItems/reducer'
import { Box, Button, Stack, Typography, Select, MenuItem } from '@mui/material'
import { getDatabase, ref, child, get, set, push, remove } from 'firebase/database'
import { Container, EmptyPage, FullScreenItemCard, selectOptionProps } from '../../components'

export const Cart: React.FC = () => {
  const db = getDatabase(app)
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { storeState: { account }, operations: { updateAccount } } = useAccountStore()
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<selectOptionProps>()
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
      if(selectedPaymentOption){
        const sale: Sale = {
          account,
          items: CartItems,
          paymentMethod: selectedPaymentOption as unknown as keyof typeof PaymentMethod
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
      } else
        return enqueueSnackbar('Você precisa informar um método de pagamento', { 
          variant: 'error',
          autoHideDuration: 3000
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
    return (
      <Container>
        <EmptyPage />
      </Container>
    )
  }

  if(CartItems.length === 0) {
    return (
      <Container>
        <EmptyPage />
      </Container>
    )
  }
  let total = 0

  const selectOption: selectOptionProps[] = [
    { value: '', label: '---' },
    { value: PaymentMethod.PIX, label: 'PIX' },
    { value: PaymentMethod.MONEY, label: 'DINHEIRO' },
    { value: PaymentMethod.CART_DEBIT, label: 'CARTÃO DE CRÉDITO' },
    { value: PaymentMethod.CART_CREDIT, label: 'CARTÃO DE DÉBITO' },
  ]

  return (  
    <Container>
      <Stack sx={{ width: '50vw' }}>
        {CartItems && (
          <Stack sx={{ width: '100%' }} alignItems='center' justifyContent='center'>
            {CartItems.map((item, index) => {
              total = total + (Number(item.price) * item.amount)
              return <FullScreenItemCard key={index} item={item} />
            })}
          </Stack> 
        )}
        <Stack alignItems='flex-end' sx={{ width: '100%' }}>
          <Typography sx={{ display: 'flex', alignItems: 'center' }} variant='h5'>
            <Typography mr={1} variant='h6' sx={{ color: 'gray' }}>Valor total:</Typography>
            {formatToRealStr(total)}
          </Typography>
        </Stack>
        <Stack mt={3} direction='row' justifyContent='flex-end' alignItems='center' spacing={2} sx={{ width: '100%' }}>
          <Typography sx={{ color: 'gray' }} variant='h6'>
            Forma de pagamento
          </Typography>
          <Select
            label='Forma de pagamento'
            placeholder='Forma de pagamento'
            value={selectedPaymentOption}
            labelId='payment-method-label'
            onChange={(option)=>setSelectedPaymentOption(option.target.value as unknown as selectOptionProps)}
          >
            {selectOption.map((option, key) => <MenuItem key={key} value={option.value}>{option.label}</MenuItem>)}
          </Select>
        </Stack>
        <Stack mt={8} direction='row' justifyContent='space-between' sx={{ width: '100%' }}>
          <Box
            type='submit'
            component={Button}
            onClick={clearCart}
            sx={{
              padding: 2,
              color: '#a9cf46',
              borderRadius: 3,
              cursor: 'pointer',
              // width: isMobile ? '80vw' : 'auto',
              '&:hover': { backgroundColor: 'white' },
              boxShadow: '0px 2px 10px rgba(0, 0, 0, .1)'
            }}
          >Limpar carrinho</Box>
          <Box
            type='submit'
            component={Button}
            onClick={finishBuy}
            sx={{
              padding: 2,
              color: 'white',
              borderRadius: 3,
              cursor: 'pointer',
              bgcolor: '#a9cf46',
              // width: isMobile ? '80vw' : 'auto',
              '&:hover': { backgroundColor: '#a9cf46' },
              boxShadow: '0px 2px 10px rgba(0, 0, 0, .1)'
            }}
          >Concluir compra</Box>
        </Stack>
        {!CartItems && <div>Sem itens</div>}
      </Stack>
    </Container>
  )
}
