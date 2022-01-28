import Lottie from 'react-lottie'
import { useHistory } from 'react-router'
import { Container } from '../../components'
import { Stack, Typography, Button, Box } from '@mui/material'
import EmptyStateAnimation from '../../assets/lottie/emptyState.json'

const DEFAULT_OPTIONS = {
  loop: true,
  autoplay: true,
  animationData: EmptyStateAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

export const EmptyPage: React.FC = () => {
  const history = useHistory()

  return (
    <Container>

      <Stack sx={{ height: '100%', padding: 2 }} alignItems='center'>
        <Box sx={{ height: '200px', marginBottom: 2 }}>
          <Lottie options={DEFAULT_OPTIONS} />
        </Box>
        <Typography variant='h4' >Ops! esta página está vazia</Typography>
        <Typography variant='body2' sx={{ marginTop: 2, marginBottom: 2, opacity: '.5' }} >Tente voltar novamente mais tarde ou se preferir entre em contato conosco</Typography>
        <Button onClick={()=>history.push('/')}>Voltar à tela inicial</Button>
      </Stack>
    </Container>
  )
}