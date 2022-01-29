import React, { useEffect } from 'react'
import 'firebase/auth'
import 'firebase/database'
import { Slide } from './components'
import { Close } from '@mui/icons-material'
import { useIsMobile } from '../../hooks/useIsMobile'
import { getUserInfos } from '../../hooks/useUseInfo'
import { Container, CardItem } from '../../components'
import { Grid, Stack, Typography } from '@mui/material'
import { useUserStore } from '../../store/user/reducer'
import { getProducts } from '../../hooks/useGetProducts'
import { useItemsStore } from '../../store/items/reducer'
import { useAccountStore } from '../../store/account/reducer'
import { useSelectedFilterStore } from '../../store/selectedFilter/reducer'
import { useHaveFilteredItemsStore } from '../../store/haveFilteredItems/reducer'

export const Home: React.FC = () => {
  const isMobile = useIsMobile()
  const { storeState: { user } } = useUserStore()
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

  return (
    <Container>
      <Stack
        mb={5}
        alignItems='center'
        justifyContent='center'
        sx={{
          width: '100vw',
          maxHeight: isMobile ? '20vh' : '40vh',
        }}>
        <Slide />
      </Stack>
      {filter && (
        <Stack  alignItems='flex-end' sx={{ width: '100%' }}  direction='row'>
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
                <Grid sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} md={isMobile ? 12 : 3} lg={isMobile ? 12 : 3} xs={isMobile ? 12 : 3} item>
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
