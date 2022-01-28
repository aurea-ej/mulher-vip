import React from 'react'
import { Controller, FieldName, Control, ControllerRenderProps, FieldValues } from 'react-hook-form'
import { PropsOf } from '../../types/util'

// TODO: Enforcing base field props is not working

type BaseFieldComponentProps<TFormValues> = ControllerRenderProps<FieldValues, FieldName<TFormValues>>

export type HfFieldProps<TFormValues, TComponent extends React.FC<PropsOf<TComponent> & BaseFieldComponentProps<TFormValues>>> = {
  /**
   * HookForm Control. Check react-hook-form for more details
   */
  control: Control<TFormValues>
  /**
   * Input field name
   */
  name: FieldName<TFormValues>
  /**
   * Component to be rendered within HfField. All the props of this component will be attached to HfField props as well.
   */
  component: TComponent
} & Omit<PropsOf<TComponent>, 'name' | 'control' | 'component' | 'css'>

export function HfField<TFormValues, TComponent extends React.FC<PropsOf<TComponent>>>(props: React.PropsWithChildren<HfFieldProps<TFormValues, TComponent>>) {
  const { component, control, name, ...rest } = props

  const ComponentToRender = component

  return (
    <Controller
      control={control as any}
      name={name}
      render={({ field }) => (
        <ComponentToRender
          {...field as any}
          {...rest}
        />
      )}
    />
  )
}
