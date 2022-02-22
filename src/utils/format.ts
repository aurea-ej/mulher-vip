import React from 'react'
import numeral from 'numeral'
import * as dateFns from 'date-fns'

export const formatToRealStr = (amount: number, fromCents = true) => {
  const valueToFormat = fromCents ? numeral(amount * 100).divide(100) : numeral(amount * 100)
  
  return `R$ ${valueToFormat.format('0,0.00')}`
}

export const useDeviceDetect = () => {
  const [isMobile, setMobile] = React.useState(false)

  React.useEffect(() => {
    const userAgent =
      typeof window.navigator === 'undefined' ? '' : navigator.userAgent
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    )
    setMobile(mobile)
  }, [])

  return { isMobile }
}

export const formatDateTime = (date: Date | number, separator?: string) => {
  const format = separator ? `dd/MM/yyyy [${separator}] HH:mm` : 'dd/MM/yyyy'

  return dateFns.format(date, format)
}

