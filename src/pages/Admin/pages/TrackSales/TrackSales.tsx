import { Box } from '@mui/system'
import { SeeSale } from './components'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import { Sale } from '../../../../types/item'
import { Stack, Typography } from '@mui/material'
import { Container } from '../../../../components'
import { app } from '../../../../FIREBASECONFIG.js'
import { useModal } from '../../../../hooks/useModal'
import { getDatabase, ref, child, get } from 'firebase/database'

export const TrackSales: React.FC = () => {
  const db = getDatabase(app)
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
    return <div>nao tem vendas</div>

  return (
    <Container>
      <Stack>
        {sales.map((sale, key)=>(
          <Stack direction='row' key={key}
            sx={{
              marginY: 2,
              paddingY: 2,
              paddingX: 3,
              borderRadius: 3,
              boxShadow: '0px 2px 5px rgba(0, 0, 0, .1)',
            }}
          >
            <Stack>
              <Typography sx={{ color: '#9CADBF' }}><b>Cliente:</b> {sale.account.name}</Typography>
              <Typography sx={{ color: '#9CADBF' }}><b>Telefone:</b> {sale.account.phone}</Typography>
              <Typography sx={{ color: '#9CADBF' }}><b>Endereço:</b> {sale.account.address}, {sale.account.district} - {sale.account.houseNumber}</Typography>
            </Stack>
            <Stack>
              <Box
                mt={2}
                sx={{
                  padding: 1,
                  marginLeft: 10,
                  color: 'white',
                  cursor: 'pointer',
                  bgcolor: '#a9cf46',
                  textAlign: 'center',
                  borderRadius: '30px',
                  boxShadow: '0px 2px 5px rgba(0, 0, 0, .1)',
                }}
                onClick={()=>setSelectedSale(sale)}
              >
              Ver compra
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