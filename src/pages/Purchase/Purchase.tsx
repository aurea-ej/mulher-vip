import { useIsMobile } from '../../hooks'
import { useEffect, useState } from 'react'
import { ModalProps } from '../../types/util'
import { Stack, Typography } from '@mui/material'
import { getUserInfos } from '../../hooks/useUseInfo'
import { useUserStore } from '../../store/user/reducer'
import { PaymentMethodTitle } from '../../types/payment'
import { useAccountStore } from '../../store/account/reducer'
import { getDatabase, onValue, ref } from 'firebase/database'
import { FullScreenItemCard, Container, EmptyPage } from '../../components'
import { SaleByProps, CartItem, Sale, SaleStatusTitle, SaleStatus } from '../../types/item'

export type PurchaseProps = ModalProps & SaleByProps

export const Purchase: React.FC = () => {
  const db = getDatabase()
  const isMobile = useIsMobile()
  const [sales, setSales] = useState<Sale[]>()
  const { storeState: { user } } = useUserStore()
  const { storeState: { account }, operations: { updateAccount } } = useAccountStore()

  const getSales = () => {
    const productsRef = ref(db, 'sales/')
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val() as Sale[]
      var items = Object.keys(data).map((key: any) => data[key])
      if (items.length > 0) {
        setSales(items.filter(item => item.account.id === account?.id).reverse())
      }
    })
  }

  const saleStatusTextColor = (saleStatus: keyof typeof SaleStatus) => {
    switch (saleStatus) {
      case SaleStatus.IN_PREPARATION:
        return 'orange'

      case SaleStatus.OUT_FOR_DELIVERY:
        return 'red'

      case SaleStatus.DELIVERED:
        return 'green'

      default:
        return 'orange'
    }

  }

  useEffect(() => {
    if (!user || !account) {
      getUserInfos(updateAccount)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getSales()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  if (!sales) {
    return (
      <Container>
        <EmptyPage />
      </Container>
    )
  }

  return (
    <Container>
      <Stack width={isMobile ? 'auto' : '60vw'} mt={2}>
        <Typography mt={3} mb={4} sx={{ textAlign: 'center' }} variant='h4'>Suas Compras</Typography>
        {sales.map((sale: Sale) => (
          <Stack mb={4} width='100%' sx={{ borderBottom: '1px dashed #9CADBF' }}>
            <Typography sx={{ paddingLeft: 1, display: 'flex' }}>
              <Typography sx={{ opacity: .4 }}>Status:</Typography>
              <Typography sx={{ paddingLeft: 1, color: saleStatusTextColor(sale.status) }}><b>{SaleStatusTitle[sale.status]}</b></Typography>
            </Typography>
            <Typography sx={{ paddingLeft: 1, opacity: .4 }}>Método de pagamento: {PaymentMethodTitle[sale.paymentMethod]}</Typography>
            <Stack alignItems='center' width='100%'>
              {sale.items.map((item: CartItem, index) => (
                <Stack alignItems='center' sx={{ width: '80%' }}>
                  <FullScreenItemCard item={item} key={index} />
                </Stack>
              ))}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Container>
  )
}
