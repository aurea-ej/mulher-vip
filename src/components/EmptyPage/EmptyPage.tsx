import Lottie from 'react-lottie'
import { useHistory } from 'react-router'
import { Stack, Typography, Box } from '@mui/material'
import EmptyStateAnimation from '../../assets/lottie/emptyState.json'

const DEFAULT_OPTIONS = {
  loop: true,
  autoplay: true,
  animationData: EmptyStateAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

export interface EmptyPageProps {
  dontShowActionButton?: boolean
}

export const EmptyPage: React.FC<EmptyPageProps> = ({ dontShowActionButton }) => {
  const history = useHistory()

  return (
    <Stack sx={{ height: '100%', padding: 2 }} alignItems='center'>
      <Box sx={{ height: '200px', marginBottom: 2 }}>
        <Lottie options={DEFAULT_OPTIONS} />
      </Box>
      <Typography variant='h4' sx={{ textAlign: 'center' }}>Ops! esta página está vazia</Typography>
      <Typography variant='body2' sx={{ marginTop: 2, marginBottom: 2, opacity: '.5' }} >Tente voltar novamente mais tarde ou se preferir entre em contato conosco</Typography>
      {!dontShowActionButton && (
        <Box
          sx={{
            padding: 2,
            color: 'white',
            borderRadius: 3,
            cursor: 'pointer',
            bgcolor: '#a9cf46',
            boxShadow: '0px 0px 5px rgba(169, 207, 70, 1)',
          }}
          onClick={()=>history.push('/')}
        >Voltar à tela inicial</Box>
      )}
    </Stack>
  )
}