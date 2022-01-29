import { Stack } from '@mui/material'

export const CarouselCard: React.FC = ({ children }) => {
  return (
    <Stack alignItems='center' justifyContent='center' sx={{ width: 'auto', maxWidth: '100vw', height: 'auto', maxHeight: '40vh', overflow: 'hidden' }}>
      {children}
    </Stack>
  )
}
