import React from 'react'
import Button from '@mui/material/Button'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { StatusTooltip, FlatInput } from './components'

type InputType = 'flat' | 'default'

export type InputButton = {
  text: string,
  onClick: () => void
}

export type TextInputProps = Omit<TextFieldProps, 'css'> & {
  errorMessage?: string | null,
  inputButton?: InputButton
  errorTooltip?: boolean,
  labelTip?: string,
  inputType?: InputType
}

export const TextInput = React.forwardRef<HTMLDivElement, TextInputProps>((props, ref) => {
  const { errorMessage = '', inputButton, fullWidth = true, errorTooltip, inputType = 'default', ...otherProps } = props

  const errorAdornment = errorTooltip && (errorMessage || inputButton) && {
    endAdornment: (
      <>
        {inputButton && (
          <Button
            sx={{
              marginRight: 2,
              minWidth: 'fit-content',
              whiteSpace: 'nowrap'
            }}
            type='button'
            onClick={inputButton.onClick}
          >
            {inputButton.text}
          </Button>
        )}
        {errorMessage && (
          <StatusTooltip
            sx={{
              display: 'flex',
              marginRight: 1.5
            }}
            title={errorMessage}
          />
        )}
      </>
    )
  }

  const errorMessageToDisplay = errorTooltip ? null : errorMessage

  if (inputType === 'flat') {
    return (
      <FlatInput
        variant='outlined'
        errorMessage={errorMessage}
        ref={ref}
        fullWidth={fullWidth}
        InputProps={{
          ...props.InputProps,
          ...errorAdornment
        }}
        {...otherProps}
      />
    )
  }

  return (
    <TextField
      variant='outlined'
      error={Boolean(errorMessage)}
      helperText={(!errorMessage && props.helperText) ? props.helperText : errorMessageToDisplay}
      ref={ref}
      fullWidth={fullWidth}
      InputProps={{
        ...props.InputProps,
        ...errorAdornment
      }}
      {...otherProps}
    />
  )
})
