import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox'

export type CheckboxProps = {
  /**
   * This prop represent the label of the checkbox input
   */
  label?: string
  /**
 * A custom component to override the default label
 */
  labelComponent?: JSX.Element
} & MuiCheckboxProps

export function CheckBox(props: React.PropsWithChildren<CheckboxProps>) {
  const { label, labelComponent, ...rest } = props

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <MuiCheckbox
        {...rest}
      />
      {labelComponent || (<Typography>{label}</Typography>)}
    </Box>
  )
}
