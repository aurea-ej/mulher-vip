import React from 'react'
import Tooltip, { TooltipProps } from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import { Info } from '@mui/icons-material'

export type StatusTooltipProps = {
  title: string,
  className?: string
} & TooltipProps['sx']

export const StatusTooltip: React.FC<StatusTooltipProps> = ({ title, className }) => {
  return (
    <Tooltip className={className} title={title} placement='top'>
      <Box>
        <Info cursor='default' sx={{ color: 'secondary.main' }} />
      </Box>
    </Tooltip>
  )
}
