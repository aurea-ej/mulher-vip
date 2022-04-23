import React from 'react'
import { Button as MuiButton, Box, ButtonProps, SxProps, CircularProgress } from '@mui/material'

interface CustomButtonProps {
  variant?: 'primary' | 'secondary',
  sx?: SxProps
  isLoading?: boolean
}

export const Button: React.FC<CustomButtonProps & Omit<ButtonProps, 'variant'>> = ((props) => {
  const { children, variant, isLoading, sx, ...rest } = props

  if(variant === 'primary') {
    return (
      <Box
        component={MuiButton}
        {...rest}
        sx={{
          padding: 2,
          color: 'white',
          borderRadius: 3,
          cursor: 'pointer',
          bgcolor: '#a9cf46',
          // width: isMobile ? '80vw' : 'auto',
          '&:hover': { backgroundColor: '#a9cf46' },
          boxShadow: '0px 2px 10px rgba(0, 0, 0, .1)',
          ...sx
        }}
      >
        {isLoading && (
          <CircularProgress sx={{ color: 'white', marginRight: 1, maxWidth: '23px', maxHeight: '23px' }} />
        )}
        {children}
      </Box>
    )
  } else {
    return (
      <Box
        component={MuiButton}
        {...rest}
        sx={{
          padding: 2,
          color: '#a9cf46',
          borderRadius: 3,
          cursor: 'pointer',
          // width: isMobile ? '80vw' : 'auto',
          '&:hover': { backgroundColor: 'white' },
          boxShadow: '0px 2px 10px rgba(0, 0, 0, .1)',
          ...sx
        }}
      >
        {isLoading && (
          <CircularProgress sx={{ color: '#a9cf46', marginRight: 1, maxWidth: '23px', maxHeight: '23px' }} />
        )}
        {children}
      </Box>
    )
  }
})
