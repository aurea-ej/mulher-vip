import { Stack } from '@mui/material'

export const CarouselCard: React.FC = ({ children }) => {
  return (
    <Stack alignItems='center' justifyContent='center' sx={{ width: '100%', height: '100%' }}>
      {children}
    </Stack>
  )
}