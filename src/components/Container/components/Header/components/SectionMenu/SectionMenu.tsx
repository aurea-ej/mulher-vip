import { useState, useRef, useEffect } from 'react'
import {
  Paper,
  Grow,
  Popper,
  MenuList,
  MenuItem,
  ClickAwayListener,
  Stack,
  Typography,
} from '@mui/material'
import { ArrowDropDown } from '@mui/icons-material'
import { useIsMobile } from '../../../../../../hooks'
import { useItemsStore } from '../../../../../../store/items/reducer'
import { getSectionMenuItem } from '../../../../../../utils/getSectionMenuItem'
import { useSelectedFilterStore } from '../../../../../../store/selectedFilter/reducer'
import { AllItemsByCategories, CategoriesTitle } from '../../../../../../types/categories'
import { useHaveFilteredItemsStore } from '../../../../../../store/haveFilteredItems/reducer'

export interface SectionMenuProps {
  title: string
  category: keyof typeof CategoriesTitle
}

export const SectionMenu: React.FC<SectionMenuProps> = ({ title, category }) => {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()
  const anchorRef = useRef<HTMLButtonElement>(null)
  const { operations: { updateSelectedFilter } } = useSelectedFilterStore()
  const { storeState: { items }, operations: { updateItems } } = useItemsStore()
  const { operations: { updateHaveFilteredItems } } = useHaveFilteredItemsStore()

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const filterItem = (code: keyof typeof AllItemsByCategories) => {
    const filteredItems = items.filter(item => (item.category === category) && (item.code === code))
    if(filteredItems.length > 0){
      updateItems(filteredItems)
      updateSelectedFilter(code)
      updateHaveFilteredItems(true)
      setOpen(false)
      return
    }
    updateSelectedFilter(code)
    updateHaveFilteredItems(false)
    setOpen(false)
  }

  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  return(
    <>
      <Stack
        ref={anchorRef}
        id='composition-button'
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
        direction='row'
        alignItems='center'
        sx={{ cursor: 'pointer' }}
      >
        <Typography sx={{ fontSize: isMobile ? '.8em' : '1em' }}>{title}</Typography>
        {!isMobile && <ArrowDropDown />}
      </Stack>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement='bottom-start'
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id='composition-menu'
                  aria-labelledby='composition-button'
                  onKeyDown={handleListKeyDown}
                >
                  {getSectionMenuItem(category)?.map(item => {
                    return <MenuItem onClick={()=>filterItem(item.value as keyof typeof AllItemsByCategories)}>{item.label}</MenuItem>
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}