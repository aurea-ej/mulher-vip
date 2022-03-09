import { useEffect, useState } from 'react'
import 'firebase/auth'
import 'firebase/database'
import { useSnackbar } from 'notistack'
import { useHistory } from 'react-router'
import { app } from '../../FIREBASECONFIG.js'
import { PaymentMethod } from '../../types/payment'
import { formatToRealStr } from '../../utils/format'
import { getUserInfos } from '../../hooks/useUseInfo'
import { useIsMobile } from '../../hooks/useIsMobile'
import { CartItem, Sale, SaleStatus } from '../../types/item'
import { useAccountStore } from '../../store/account/reducer'
import { useCartItemsStore } from '../../store/cartItems/reducer'
import { Stack, Typography, Select, MenuItem } from '@mui/material'
import { getDatabase, ref, child, get, set, push, remove } from 'firebase/database'
import { Container, EmptyPage, FullScreenItemCard, selectOptionProps, Button } from '../../components'

export const Cart: React.FC = () => {
  const db = getDatabase(app)
  const history = useHistory()
  const isMobile = useIsMobile()
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
        const key = push(child(ref(db), 'sales')).key
        const sale: Sale = {
          account,
          id: key!,
          items: CartItems,
          status: SaleStatus.IN_PREPARATION,
          paymentMethod: selectedPaymentOption as unknown as keyof typeof PaymentMethod
        }
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
      <Stack sx={{ width: isMobile ? '80vw' : '50vw' }}>
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
        <Stack mt={8} spacing={2} direction={isMobile ? 'column' :'row'} justifyContent='space-between' sx={{ width: '100%' }}>
          <Button
            variant='secondary'
            onClick={clearCart}
          >Limpar carrinho</Button>
          <Button
            variant='primary'
            onClick={finishBuy}
          >Concluir compra</Button>
        </Stack>
        {!CartItems && <div>Sem itens</div>}
      </Stack>
    </Container>
  )
}
