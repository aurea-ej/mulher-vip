import React from 'react'
import { Stack } from '@mui/material'
import { Footer, Header } from './components'

export const Container: React.FC = ({ children }) => {
  return (
    <Stack
      justifyContent='space-between'
      sx={{
        width: '100vw',
        minHeight: '100vh',
      }}>
      <Header />
      {/* <Stack alignItems='center' sx={{ width: '100%', marginX: isMobile ? 0 : 2 }}> */}
      <Stack alignItems='center' sx={{ width: '100%' }}>
        {children}
      </Stack>
      <Footer />
    </Stack>
  )
}
