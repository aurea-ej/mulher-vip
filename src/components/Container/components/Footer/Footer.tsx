import {
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material'

export const Footer: React.FC = () => {
  return (
    <AppBar
      position='relative'
      elevation={2}
      sx={{
        bottom: 0,
        zIndex: 200,
        marginTop: 10,
        height: '90px',
        backgroundColor: '#a9cf46',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ textAlign: 'center' }}>Mulher vip Campos</Typography>
      </Toolbar>
    </AppBar>
  )
}