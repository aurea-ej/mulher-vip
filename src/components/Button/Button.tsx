import React from 'react'
import { Button as MuiButton, Box, ButtonProps, SxProps } from '@mui/material'

interface CustomButtonProps {
  variant?: 'primary' | 'secondary',
  sx?: SxProps
}

export const Button: React.FC<CustomButtonProps & Omit<ButtonProps, 'variant'>> = ((props) => {
  const { children, variant, sx, ...rest } = props

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
        {children}
      </Box>
    )
  }
})
