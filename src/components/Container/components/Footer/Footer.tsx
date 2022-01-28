import {
  AppBar,
  Toolbar,
} from '@mui/material'

export const Footer: React.FC = () => {
  return (
    <AppBar
      position='relative'
      elevation={2}

      sx={{
        bottom: 0,
        zIndex: 200,
        height: '90px',
        backgroundColor: '#a9cf46',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        teste
      </Toolbar>
    </AppBar>
  )
}