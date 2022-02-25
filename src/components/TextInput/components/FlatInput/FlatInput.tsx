import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import { TextInputProps } from '../../TextInput'
import { useDeviceDetect } from '../../../../utils/format'

// TODO: Add styles to input on the theme
export const FlatInput = React.forwardRef<HTMLDivElement, TextInputProps>((props, ref) => {
  const { label, errorMessage, helperText, variant, labelTip, sx, ...rest } = props
  const { isMobile } = useDeviceDetect()

  const hasError = Boolean(errorMessage)

  return (
    <Box>
      {label ? (
        <InputLabel
          sx={{
            // fontFamily: (theme) => theme.typography.text5.fontFamily,
            // fontSize: (theme) => theme.typography.text5.fontSize,
            // fontWeight: (theme) => theme.typography.text5.fontWeight,
            // lineHeight: (theme) => theme.typography.text5.lineHeight,
            fontFamily: (theme) => theme.typography.body1.fontFamily,
            fontSize: (theme) => theme.typography.body1.fontSize,
            fontWeight: (theme) => theme.typography.body1.fontWeight,
            lineHeight: (theme) => theme.typography.body1.lineHeight,
            color: 'grey.300',
            paddingBottom: 1
          }}
          htmlFor={rest.name}
        >
          <Stack direction='row' justifyContent='space-between'>
            {label}
            {(labelTip && !isMobile) && <Typography variant='h6' sx={{ color: 'grey[400]' }}>{labelTip}</Typography>}
            {/* {(labelTip && !isMobile) && <Typography variant='text6' sx={{ color: 'grey[400]' }}>{labelTip}</Typography>} */}
          </Stack>
        </InputLabel>
      ) : null}
      <TextField
        sx={{
          marginTop: '0px !important',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none',
              boxShadow: '0px 2px 10px rgba(0, 0, 0, .1)',
              transition: (theme) => theme.transitions.create(['border-color', 'background-color', 'box-shadow'])
            },
            '&:hover fieldset': {
              borderColor: (theme) => theme.palette.grey[50]
            },
            color: 'grey.600',
          },
          ...sx
        }}
        ref={ref}
        id={rest.name}
        error={hasError}
        variant={variant}
        helperText={hasError ? errorMessage : helperText}
        {...rest}
      />
    </Box>
  )
})
