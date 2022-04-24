import { Box } from '@mui/system'
import { SeeSale } from './components'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { useIsMobile } from '../../../../hooks'
import { app } from '../../../../FIREBASECONFIG.js'
import { Container, EmptyPage } from '../../../../components'
import { getDatabase, ref, onValue } from 'firebase/database'
import { PaymentMethodTitle } from '../../../../types/payment'
import { CircularProgress, Stack, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Sale, SaleStatus, SaleStatusTitle } from '../../../../types/item'

export const TrackSales: React.FC = () => {
  const db = getDatabase(app)
  const isMobile = useIsMobile()
  const { enqueueSnackbar } = useSnackbar()
  const [sales, setSales] = useState<Sale[] | []>()
  const [selectedSale, setSelectedSale] = useState<Sale>()
  const [seeSaleIsOpen, setSeeSaleIsOpen] = useState<boolean>(false)

  const getSales = () => {
    const cartProductsRef = ref(db, 'sales/')
    try {
      onValue(cartProductsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val() as Sale[]
          var items = Object.keys(data).map((key: any) => data[key]).reverse()
          if (items.length > 0) {
            setSales(items)
            return
          }
        }
        setSales([])
      })
    } catch (error) {
      return enqueueSnackbar('Ocorreu um erro ao recuperar seus itens do carrinho', {
        variant: 'error',
        autoHideDuration: 3000
      })
    }
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
    getSales()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!sales) {
    return (
      <Container>
        <CircularProgress sx={{ color: '#a9cf46' }} />
      </Container>
    )
  }

  if (sales.length === 0) {
    return (
      <Container>
        <EmptyPage />
      </Container>
    )
  }

  return (
    <Container>
      <Stack justifyContent='center' alignItems='center' sx={{ paddingX: 2, width: isMobile ? '85%' : '90%', }}>
        <Stack width='100%' alignItems='center' marginY={3}>
          <Typography variant='h4'>Acompanhe aqui suas vendas</Typography>
        </Stack>
        {sales.map((sale, key) => (
          <Stack direction={isMobile ? 'column' : 'row'} alignItems='center' justifyContent='center' key={key}
            sx={{
              marginY: 2,
              width: '100%',
              borderRadius: 3,
              paddingY: isMobile ? 1.5 : 2,
              paddingX: isMobile ? 1.5 : 3,
              boxShadow: '0px 2px 5px rgba(0, 0, 0, .1)',
            }}
          >
            <Stack sx={{ color: '#9CADBF', width: '100%' }}>
              <Typography><b>Cliente:</b> {sale.account.name}</Typography>
              <Typography><b>Telefone:</b> {sale.account.phone}</Typography>
              <Typography sx={{ display: 'flex' }}><b>Status:</b>
                <Typography sx={{ paddingLeft: 1, color: saleStatusTextColor(sale.status) }}>
                  <b>{SaleStatusTitle[sale.status]}</b>
                </Typography>
              </Typography>
              <Typography><b>Endereço:</b> {sale.account.address}, {sale.account.district} - {sale.account.houseNumber}</Typography>
              <Typography><b>Pagamento:</b> {PaymentMethodTitle[sale.paymentMethod]}</Typography>
            </Stack>
            <Stack mt={isMobile ? 3 : 0} sx={{ color: '#9CADBF', width: '100%' }}>
              <Typography><b>Itens:</b></Typography>
              {sale.items.map((item, key) => (
                <Stack alignItems='center' key={key} direction='row'>
                  <ArrowForwardIosIcon sx={{ color: '#a9cf46', height: '15px' }} />
                  <Typography>{item.name} - {item.amount} unidade</Typography>
                </Stack>
              ))}
            </Stack>
            <Stack>
              <Box
                mt={2}
                sx={{
                  padding: 1,
                  marginLeft: isMobile ? 0 : 10,
                  color: 'white',
                  cursor: 'pointer',
                  bgcolor: '#a9cf46',
                  textAlign: 'center',
                  borderRadius: '30px',
                  boxShadow: '0px 2px 5px rgba(0, 0, 0, .1)',
                }}
                onClick={() => {
                  setSelectedSale(sale)
                  setSeeSaleIsOpen(true)
                }}
              >
                <Typography sx={{ whiteSpace: 'nowrap' }}>Ver compra</Typography>
              </Box>
            </Stack>
          </Stack>
        )
        )}
      </Stack>
      {selectedSale && <SeeSale sale={selectedSale} isOpen={seeSaleIsOpen} closeModal={() => setSeeSaleIsOpen(false)} />}
    </Container>
  )
}
