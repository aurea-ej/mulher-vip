import React, { useCallback } from 'react'
import NumberFormat, { NumberFormatProps, NumberFormatValues } from 'react-number-format'

export type MaskedNumberFormatProps = {
  inputRef: (instance: NumberFormat<any> | null) => void,
  onChange: (event: { target: { name: string; value: string } }) => void,
  name: string,
  mask?: string,
  maxLength?: number,
  formatted?: boolean
  value?: string | number | null | undefined
}

export const MaskedNumberFormat = React.forwardRef<React.Component<NumberFormatProps, null>, MaskedNumberFormatProps>((props, ref) => {
  const { inputRef, name, onChange, mask, formatted, maxLength, value, ...other } = props

  const handleChange = useCallback((values: NumberFormatValues) => {
    onChange({
      target: {
        name,
        value: formatted ? values.formattedValue : values.value
      }
    })
  }, [formatted, name, onChange])

  return (
    <NumberFormat
      ref={ref as any}
      {...other}
      name={name}
      value={value || ''}
      maxLength={maxLength}
      getInputRef={inputRef} 
      onValueChange={handleChange}
      format={mask} 
      mask=' '
    />
  )
})
