import { useMediaQuery, Breakpoint } from '@mui/material'

export const useIsMobile = (breakpoint: Breakpoint = 'lg') => {
  // Fix this string later
  const isMobile = useMediaQuery('@media (max-width:1199.95px)')

  return isMobile
}
