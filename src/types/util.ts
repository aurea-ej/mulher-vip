import { SvgIconProps } from '@mui/material'

export type FirstReturn<T> = T extends (param: any) => infer RETURN ? RETURN : any
export interface SvgProps {
  color?: string
  width?: number
  height?: number
  className?: string
}

export interface GenericIconProps extends Omit<SvgIconProps, 'color'> {
  opacity?: number
  color?: string
}

export interface ApiFail<TFailCode> {
  code: TFailCode
  message: string
  statusCode: number
  status: 'fail'
  data: any
}

export interface ApiError<TErrorCode> {
  code: TErrorCode
  message: string
  statusCode: number
  status: 'error'
  data: any
}

export type RequestFail<TFailCode, TErrorCode> = ApiFail<TFailCode> | ApiError<TErrorCode>

export type ConnectedOperations<TRawOperations> = {
  [K in keyof TRawOperations]: FirstReturn<TRawOperations[K]>
}

export interface ModalProps {
  isOpen: boolean,
  closeModal: () => void
}

export type PropsOf<T> = T extends React.ComponentType<infer Props> ? Props : never