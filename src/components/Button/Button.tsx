import React from 'react'
import { Button as MuiButton, Box } from '@mui/material'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
}

export const Button: React.FC<ButtonProps> = ((props) => {
  const { children, variant, ...rest } = props

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
          boxShadow: '0px 2px 10px rgba(0, 0, 0, .1)'
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
          boxShadow: '0px 2px 10px rgba(0, 0, 0, .1)'
        }}
      >
        {children}
      </Box>
    )
  }
})