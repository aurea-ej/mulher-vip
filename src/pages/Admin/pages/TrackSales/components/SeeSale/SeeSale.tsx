import { SeeSaleCard } from '../'
import { Close } from '@mui/icons-material'
import { ModalProps } from '../../../../../../types/util'
import { CartItem, SaleByProps } from '../../../../../../types/item'
import { Box, Drawer, Stack, Typography } from '@mui/material'

export type SeeSaleModalProps = ModalProps & SaleByProps

export const SeeSale: React.FC<SeeSaleModalProps> = ({ sale, isOpen, closeModal }) => {

  return (
    <Drawer
      anchor='bottom'
      variant='temporary'
      open={isOpen}
      PaperProps={{ sx: { maxHeight: '90vh', height: '90vh', padding: 2, borderRadius: 3, cursor: 'pointer' } }}
    >

      <Stack alignItems='flex-end'>
        <Close sx={{ cursor: 'pointer', marginX: 1 }} onClick={closeModal} />
      </Stack>

      <Typography variant='h4' mb={3} sx={{ textAlign: 'center' }}>{sale.account.name}</Typography>

      <Typography variant='h6' sx={{ color: '#9CADBF' }}><b>Telefone:</b> {sale.account.phone}</Typography>
      <Typography variant='h6' sx={{ color: '#9CADBF' }}><b>E-mail:</b> {sale.account.email}</Typography>
      <Typography variant='h6' sx={{ color: '#9CADBF' }}><b>Endereço:</b> {sale.account.address}, {sale.account.district} - {sale.account.houseNumber}</Typography>

      <Stack mt={2} sx={{ flexWrap: 'wrap' }} justifyContent='space-between' direction='row' alignItems='flex-start'>
        {sale.items.map((item: CartItem)=>(
          <SeeSaleCard item={item} />
        ))}
      </Stack>

      <Stack alignItems='center'>
        <Box
          sx={{
            bottom: 25,
            paddingY: 1,
            paddingX: 3,
            color: 'white',
            marginLeft: 10,
            margin: '0 auto',
            position: 'fixed',
            cursor: 'pointer',
            bgcolor: '#a9cf46',
            textAlign: 'center',
            borderRadius: '30px',
            boxShadow: '0px 0px 5px rgba(169, 207, 70, 1)',
          }}
        // onClick={()=>setSelectedSale(sale)}
        >
          <Typography variant='subtitle1'>Finalizar pedido</Typography>
        </Box>
      </Stack>
    </Drawer>
  )
}
