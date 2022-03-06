import { Close } from '@mui/icons-material'
import { useIsMobile } from '../../../../../../hooks'
import { ModalProps } from '../../../../../../types/util'
import { getDatabase, ref, set } from 'firebase/database'
import { Drawer, Stack, Typography } from '@mui/material'
import { CartItem, SaleByProps } from '../../../../../../types/item'
import { PaymentMethodTitle } from '../../../../../../types/payment'
import { FullScreenItemCard, Button } from '../../../../../../components'

export type SeeSaleModalProps = ModalProps & SaleByProps

export const SeeSale: React.FC<SeeSaleModalProps> = ({ sale, isOpen, closeModal }) => {
  const db = getDatabase()
  const isMobile = useIsMobile()

  const finishOrder = () => {
    const alertConfirmation = window.confirm('Tem certeza que deseja encerrar este pedido?')
    if(alertConfirmation)
      set(ref(db, 'sales/' + sale.id), null)
  }

  return (
    <Drawer
      anchor='bottom'
      variant='temporary'
      open={isOpen}
      PaperProps={{ sx: {
        paddingY: 2,
        height: '90vh',
        maxHeight: '90vh',
        paddingX: isMobile ? 1 : 4,
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
      } }}
    >

      <Stack alignItems='flex-end'>
        <Close sx={{ cursor: 'pointer', marginX: 1 }} onClick={closeModal} />
      </Stack>

      <Typography variant='h4' mb={3} sx={{ textAlign: 'center' }}>{sale.account.name}</Typography>

      <Typography variant='h6' sx={{ color: '#9CADBF' }}><b>Telefone:</b> {sale.account.phone}</Typography>
      <Typography variant='h6' sx={{ color: '#9CADBF' }}><b>E-mail:</b> {sale.account.email}</Typography>
      <Typography variant='h6' sx={{ color: '#9CADBF' }}><b>Endereço:</b> {sale.account.address}, {sale.account.district} - {sale.account.houseNumber}</Typography>
      <Typography variant='h6' sx={{ color: '#9CADBF' }}><b>Pagamento:</b> {PaymentMethodTitle[sale.paymentMethod]}</Typography>

      <Stack mt={2} sx={{ flexWrap: 'wrap' }} direction='row' alignItems='flex-start'>
        {sale.items.map((item: CartItem, index)=>(
          <FullScreenItemCard item={item} key={index} />
        ))}
      </Stack>

      <Stack alignItems='center'>
        <Button
          variant='primary'
          onClick={finishOrder}
          sx={{ 
            margin: '0 auto',
            position: 'fixed',
            bottom: 25,
          }}
        >
          Finalizar pedido
        </Button>
      </Stack>
    </Drawer>
  )
}
