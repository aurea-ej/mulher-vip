import { AccountByProps } from './user'
import { PaymentMethod } from './payment'
import { Categories, AllItemsByCategories } from './categories'

export interface sizeItem {
  value: number
  label: string
}

export enum SaleStatus {
  IN_PREPARATION = 'IN_PREPARATION',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
}

export enum SaleStatusTitle {
  IN_PREPARATION = 'Em preparação',
  OUT_FOR_DELIVERY = 'Saiu para entrega',
  DELIVERED = 'Entregue',
}

export interface Item {
  id: string
  name: string
  price: string | number
  imageUrl: string
  description: string
  isAvailable: any //change this later
  category: keyof typeof Categories
  code: keyof typeof AllItemsByCategories
  arraySize?: any
  // size?: [boolean, boolean, boolean, boolean, boolean]
}

export interface ItemByProps {
  item: Item
}

export interface CartItem extends Item {
  note: string,
  amount: number,
  selectedSize: keyof typeof Size
}

export interface CartItemByProps {
  item: CartItem
}

export interface CartItemsByProps {
  items: CartItem[]
}

export type Sale = CartItemsByProps & AccountByProps & {
  id: string
  status: keyof typeof SaleStatus
  paymentMethod: keyof typeof PaymentMethod,
}

export interface SaleByProps {
  sale: Sale
}

export interface SalesByProps {
  sales: Sale[]
}

export enum Size {
  P = 'P',
  M = 'M',
  G = 'G',
  TU = 'Tamanho único',
  PS = 'Plus size',
}
