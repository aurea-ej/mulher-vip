
import { Stack, Avatar, Typography } from '@mui/material'
import { CartItemByProps } from '../../types/item'

export const FullScreenItemCard: React.FC<CartItemByProps> = ({ item }) => {
  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{
        marginY: 2,
        paddingY: 2,
        paddingX: 4,
        width: '100%',
        borderRadius: 3,
        boxShadow: '0px 2px 10px rgba(0, 0, 0, .1)',
      }}
    >
      <Stack direction='row' alignItems='center'>
        <Avatar variant='circular' sx={{ height: '60px', width: '60px', marginRight: 2 }} src={item.imageUrl} />
        <Typography><b>{item.name}</b></Typography>
      </Stack>
      <Stack mt={1}>
        <Typography>{item.amount} unidades: <b style={{ color: '#a9cf46' }}>R$ {(item.amount * Number(item.price)).toFixed(2)}</b></Typography>
      </Stack>
    </Stack>
  )
}
