import React from 'react'
import { MenuItem } from '@mui/material'
import { TextInput, TextInputProps } from '../TextInput'

export type Option = {
  value: string | number,
  label: string
}

export type SelectInputProps = TextInputProps & {
  options: Option[]
}

export const SelectInput = React.forwardRef<HTMLDivElement, SelectInputProps>((props, ref) => {
  const { options, fullWidth = true, ...rest } = props

  return (
    <TextInput
      ref={ref}
      select
      fullWidth={fullWidth}
      {...rest}
    >
      {options.map((option, index) => (
        <MenuItem key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextInput>
  )
})
