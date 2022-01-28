import { useState } from 'react'
import { SeeMoreModal } from '..'
import { CartItemByProps } from '../../types/item'
import { RemoveItemModal } from '../../components'
import { formatToRealStr } from '../../utils/format'
import { Card, Avatar, Stack, Typography, Button } from '@mui/material'


export const SmallCardItem: React.FC<CartItemByProps> = ({ item }) => {
  const [seeMoreModalState, setSeeMoreModal] = useState<boolean>(false)
  const [removeItemModalState, setRemoveItemModal] = useState<boolean>(false)

  return (
    <Card sx={{
      marginTop: 3,
      width: '60%',
      height: '150px',
      borderRadius: 3,
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)'
    }}>
      <Stack direction='row' sx={{ height: '100%', padding: 2 }} alignItems='center' justifyContent='center'>
        <Avatar imgProps={{ style: { objectFit: 'contain' } }} variant='square' sx={{ height: '70%', width: '50%' }} src={item.imageUrl} />
        <Typography>{item.name}</Typography>
        <Typography>{formatToRealStr(Number(item.price))}</Typography>
        <Button onClick={()=>setSeeMoreModal(true)}>Ver mais</Button>
        <Button onClick={()=>setSeeMoreModal(true)}>Excluir</Button>
      </Stack>
      <RemoveItemModal onClose={()=>setSeeMoreModal(false)} isOpen={seeMoreModalState} item={item} />
      <SeeMoreModal onClose={()=>setRemoveItemModal(false)} isOpen={removeItemModalState} item={item} />
    </Card>
  )
}