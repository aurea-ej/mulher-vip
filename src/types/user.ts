export interface User {
    uid: string,
    email: string,
    emailVerified: false,
    isAnonymous: false,
    providerData: [
      {
        providerId: string,
        uid: string,
        displayName: null,
        email: string,
        phoneNumber: null,
        photoURL: null
      }
    ],
  stsTokenManager: {
    refreshToken: string,
    accessToken: string,
    expirationTime: number
  },
  createdAt: string,
  lastLoginAt: string,
  apiKey: string,
  appName: any
}

export interface Account {
  id: string
  cep: string
  city: string
  name: string
  phone: string
  email: string
  address: string
  district: string
  isAdmin: boolean
  birthDate: Date | string | null
  houseNumber: string
}

export interface AccountByProps {
  account: Account
}

export enum AccountFieldsTitle {
  CEP = 'CEP',
  NAME = 'Nome',
  ADDRESS = 'Rua',
  CITY = 'Cidade',
  EMAIL = 'E-mail',
  PHONE = 'Telefone',
  DISTRICT = 'Bairro',
  HOUSE_NUMBER = 'Número da casa'
}
