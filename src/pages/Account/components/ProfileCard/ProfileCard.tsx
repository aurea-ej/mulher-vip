import { Card, Typography } from '@mui/material'

export interface ProfileCardProps {
  title: string
  value: string
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ title, value }) => {
  return (
    <Card
      sx={{
        padding: 2,
        color: 'white',
        height: '50px',
        borderRadius: 3,
        bgcolor: 'rgba(169, 207, 70, .7)',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, .1)',
      }}>
      <Typography variant='subtitle2' sx={{ }}>{title}:</Typography>
      <Typography variant='subtitle1'>{value}</Typography>
    </Card>
  )
}
