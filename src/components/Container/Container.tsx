import React from 'react'
import { Stack } from '@mui/material'
import { Footer, Header } from './components'

export const Container: React.FC = ({ children }) => {
  return (
    <Stack justifyContent='space-between'
      sx={{
        width: '100vw',
        minHeight: '100vh',
        overflowX: 'hidden',
        // backgroundColor: '#FCFCFC'
      }}>
      <Header />
      <Stack alignItems='center' sx={{ padding: 2 }}>
        {children}
      </Stack>
      <Footer />
    </Stack>
  )
}
