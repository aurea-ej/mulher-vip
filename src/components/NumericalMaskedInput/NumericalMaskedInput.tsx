import React from 'react'
import { MaskedNumberFormat } from './components'
import { TextInput, TextInputProps } from '../TextInput'

export type NumericalMaskedInputProps = {
  mask: string | undefined,
  formatted?: boolean,
  maxLength?: number
} & TextInputProps

export const NumericalMaskedInput = React.forwardRef<HTMLDivElement, NumericalMaskedInputProps>((props, ref) => {
  const { mask, maxLength, InputProps, formatted, ...otherProps } = props
  return (
    <TextInput
      ref={ref}
      {...otherProps}
      InputProps={{
        ...InputProps,
        inputComponent: MaskedNumberFormat as any,
        inputProps: { mask, formatted, maxLength }
      }}
    />
  )
})
