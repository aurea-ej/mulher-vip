import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import { TextInput, TextInputProps } from '../TextInput'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'

export type PasswordInputProps = TextInputProps

export const PasswordInput = React.forwardRef<HTMLDivElement, PasswordInputProps>((props, ref) => {
  const [isPasswordType, setIspasswordType] = useState(true)

  const toggleInputType = () => {
    setIspasswordType(!isPasswordType)
  }

  return (
    <TextInput
      {...props}
      ref={ref}
      type={isPasswordType ? 'password' : 'text'}
      InputProps={{
        startAdornment: <LockOutlinedIcon sx={{ color: '#a9cf46' }} opacity={0.25} />,
        endAdornment: (
          <IconButton color='primary' onClick={toggleInputType}>
            {isPasswordType ? <VisibilityRoundedIcon sx={{ color: '#a9cf46' }} /> : <VisibilityOffRoundedIcon sx={{ color: '#a9cf46' }} />}
          </IconButton>
        )
      }}
    />
  )
})
