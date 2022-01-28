import React, { useEffect, useState } from 'react'
import 'firebase/auth'
import 'firebase/database'
import { Slide } from './components'
import { Close } from '@mui/icons-material'
import { useIsMobile } from '../../hooks/useIsMobile'
import { getUserInfos } from '../../hooks/useUseInfo'
import { Container, CardItem } from '../../components'
import { useUserStore } from '../../store/user/reducer'
import { getProducts } from '../../hooks/useGetProducts'
import { useItemsStore } from '../../store/items/reducer'
import { useAccountStore } from '../../store/account/reducer'
import { CircularProgress, Grid, Stack, Typography } from '@mui/material'
import { useSelectedFilterStore } from '../../store/selectedFilter/reducer'
import { useHaveFilteredItemsStore } from '../../store/haveFilteredItems/reducer'

export const Home: React.FC = () => {
  const isMobile = useIsMobile()
  const { storeState: { user } } = useUserStore()
  const [isLoading, setIsLoading] = useState<boolean>()
  const { storeState: { haveFilteredItems } } = useHaveFilteredItemsStore()
  const { storeState: { items }, operations: { updateItems } } = useItemsStore()
  const { storeState: { account }, operations: { updateAccount } } = useAccountStore()
  const { storeState: { filter }, operations: { resetSelectedFilter } } = useSelectedFilterStore()

  const clearFilter = () => {
    resetSelectedFilter()
    getProducts(updateItems)
  }

  useEffect(()=>{
    getProducts(updateItems)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(()=>{
    if(!user || !account) {
      getUserInfos(updateAccount)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if (isLoading) {
    <Stack alignItems='center' justifyContent='center' sx={{ height: 'calc(90vh - 48px)' }}>
      <CircularProgress color='secondary' />
    </Stack>
  }

  return (
    <Container>
      <Stack
        mb={5}
        direction={isMobile ? 'column' : 'row'}
        alignItems='center'
        justifyContent='center'
        sx={{
          width: '100vw',
          height: '40vh',
        }}>
        <Slide />
      </Stack>
      {filter && (
        <Stack alignItems='flex-end' direction='row' sx={{ width: '100%' }}>
          <Typography variant='h6'
            sx={{
              paddingX: 2,
              paddingY: 1,
              display: 'flex',
              color: 'white',
              cursor: 'pointer',
              flexWrap: 'noWrap',
              bgcolor: '#a9cf46',
              alignItems: 'center',
              borderRadius: '30px',
              boxShadow: '0px 0px 10px rgba(169, 207, 70, .5)',
            }}>
              Filtro: {filter}
            <Stack alignItems='center' onClick={clearFilter}><Close /></Stack>
          </Typography>
        </Stack>
      )}
      {items && haveFilteredItems && (
        <Grid container>
          {items.map((item, key) => {
            return item.isAvailable ? 
              (
                <Grid md={isMobile ? 1 : 3} lg={isMobile ? 1 : 3} xs={isMobile ? 1 : 3} item>
                  <CardItem key={key} item={item} />
                </Grid>
              ) : null
          }
          )}
        </Grid>
      )}
      {!items && <div>Sem itens</div>}
    </Container>
  )
}
