import React from 'react'
import { TextInput, TextInputProps } from '../TextInput'
import DateAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import ptBr from 'date-fns/locale/pt-BR'

export interface DateInputProps extends Omit<TextInputProps, 'onChange' | 'value'> {
  value?: Date | null
  onChange?: (value: Date | null) => void
}

export const DateInput = React.forwardRef<HTMLDivElement, DateInputProps>((props, ref) => {
  const { onChange, value, ...rest } = props

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const emptyFn = () => { } // Remove this later. Reason, to fix a type error

  return (
    <LocalizationProvider dateAdapter={DateAdapter} locale={ptBr}>
      <DatePicker
        value={value}
        onChange={onChange || emptyFn}
        ref={ref}
        renderInput={(params) => {
          return (
            <TextInput
              {...params}
              {...rest}
            />
          )
        }
        }
      />
    </LocalizationProvider>
  )
})
