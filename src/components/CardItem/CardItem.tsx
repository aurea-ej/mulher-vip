import Lottie from 'react-lottie'
import { ItemByProps } from '../../types/item'
import { SeeMoreModal } from '../../components'
import { OpenInFull } from '@mui/icons-material'
import { useModal } from '../../hooks/useModal'
import { formatToRealStr } from '../../utils/format'
import errorAnimation from '../../assets/lottie/error.json'
import { Card, Avatar, Stack, Typography, Box } from '@mui/material'

const DEFAULT_OPTIONS = {
  loop: true,
  autoplay: true,
  animationData: errorAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

export const CardItem: React.FC<ItemByProps> = ({ item }) => {
  const [isModalOpen, toggleModal] = useModal()

  return (
    <Card 
      sx={{
        marginX: 3,
        padding: 2,
        marginTop: 3,
        width: '300px',
        height: '500px',
        borderRadius: 3,
        cursor: 'pointer',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, .1)',
        '&:hover': {
          boxShadow: '0px 2px 15px rgba(0, 0, 0, .2)',
        }
      }}>
      <Stack sx={{ height: '100%' }} justifyContent='space-between' onClick={toggleModal}>
        <Avatar
          imgProps={{ style: {
            objectFit: 'contain',
            borderRadius: 10,
          }, loading:'lazy' }}
          variant='square'
          sx={{ height: '70%', width: '100%' }}
          src={item.imageUrl}
        >
          <Stack alignItems='center' direction='row' sx={{ marginBottom: 2 }}>
            <Box sx={{ height: '40px' }}>
              <Lottie options={DEFAULT_OPTIONS} />
            </Box>
            <Typography>Erro ao carregar imagem</Typography>
          </Stack>
        </Avatar>
        <Stack
          alignItems='center'
          justifyContent='space-between'
          sx={{ backgroundColor: 'rgba(169, 207, 70, .7)', borderRadius: 3, margin: .5 }}
        >
          <Stack sx={{ width: '100%', textAlign: 'center' }}>
            <Typography variant='h5' sx={{ color: 'white' }}>{item.name}</Typography>
            <Typography variant='h6'><b>{formatToRealStr(Number(item.price))}</b></Typography>
            <Stack sx={{ width: '100%' }} alignItems='flex-end'>
              <OpenInFull sx={{ color: 'white', paddingRight: 1, paddingBottom: 1 }} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <SeeMoreModal onClose={toggleModal} isOpen={isModalOpen} item={item} />
    </Card>
  )
}