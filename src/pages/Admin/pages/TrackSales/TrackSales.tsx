import { Box } from '@mui/system'
import { SeeSale } from './components'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { Sale } from '../../../../types/item'
import { useIsMobile } from '../../../../hooks'
import { Container } from '../../../../components'
import { app } from '../../../../FIREBASECONFIG.js'
import { useModal } from '../../../../hooks/useModal'
import { getDatabase, ref, child, get } from 'firebase/database'
import { CircularProgress, Stack, Typography } from '@mui/material'

export const TrackSales: React.FC = () => {
  const db = getDatabase(app)
  const isMobile = useIsMobile()
  const { enqueueSnackbar } = useSnackbar()
  const [sales, setSales] = useState<Sale[]>()
  const [seeSaleIsOpen, toggleSeeSale] = useModal()
  const [selectedSale, setSelectedSale] = useState<Sale>()

  const getSales = () => {
    const cartProductsRef = ref(db)
    get(child(cartProductsRef, 'sales/')).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val() as Sale[]
        var items = Object.keys(data).map((key: any) => data[key])
        if(items.length > 0 ){
          setSales(items)
          toggleSeeSale()
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

  useEffect(()=>{
    getSales()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if(!sales)
    return (
      <Container>
        <CircularProgress sx={{ color: '#a9cf46' }} />
      </Container>
    )

  return (
    <Container>
      <Stack justifyContent='center' alignItems='center' sx={{ paddingX: 2, width: isMobile ? '85%' : '90%', }}>
        {sales.map((sale, key)=>(
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
              <Typography><b>Endereço:</b> {sale.account.address}, {sale.account.district} - {sale.account.houseNumber}</Typography>
              {/* <Typography><b>Pagamento:</b> {sale.items}</Typography> */}
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
                onClick={()=>setSelectedSale(sale)}
              >
                <Typography sx={{ whiteSpace: 'nowrap' }}>Ver compra</Typography>
              </Box>
            </Stack>
          </Stack>
        )
        )}
      </Stack>
      {selectedSale && <SeeSale sale={selectedSale} isOpen={seeSaleIsOpen} closeModal={toggleSeeSale} />}
    </Container>
  )
}
