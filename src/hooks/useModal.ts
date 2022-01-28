import { useState, useCallback } from 'react'

export const useModal = (): [boolean, () => void] => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = useCallback(() => {
    setIsOpen(!isOpen)
  }, [setIsOpen, isOpen])

  return [isOpen, toggle]
}