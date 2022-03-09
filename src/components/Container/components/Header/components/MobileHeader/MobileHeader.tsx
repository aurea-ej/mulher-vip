import { SectionMenu } from '../'
import Logo from '../../../../../../assets/images/logoMulherVip.png'
import {
  Box,
  Link,
  Stack,
  AppBar,
  Avatar,
  Toolbar,
} from '@mui/material'
import { useHistory } from 'react-router'
import FeedIcon from '@mui/icons-material/Feed'
import { useModal } from '../../../../../../hooks/useModal'
import { useAccountStore } from '../../../../../../store/account/reducer'
import { AccountCircle, ShoppingCart } from '@mui/icons-material'
import { Categories, CategoriesTitle } from '../../../../../../types/categories'

export const MobileHeader: React.FC = () => {
  const history = useHistory()
  const { storeState: { account } } = useAccountStore()
  const [openCategories, toggleOpenCategories] = useModal()

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{
        zIndex: 200,
        backgroundColor: 'transparent',
      }}
    >
      <Toolbar
        sx={{
          minHeight: 70,
          maxHeight: 140,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#a9cf46',
          justifyContent: 'center',
          alignItems:'center',
        }}
      >
        <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ width: '100%' }}>
          <Link href='/' sx={{ height: '100%' }}>
            <Avatar
              src={Logo}
              variant='square'
              alt='Logo mulher vip'
              sx={{ height: '80%', width: '40vw' }}
              imgProps={{ style: { objectFit: 'contain' } }}
            />
          </Link>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Stack
              direction='row'
              alignItems='center'
              sx={{ cursor: 'pointer' }}
              onClick={()=>history.push('/purchase')}
            >
              <FeedIcon />
            </Stack>
            <Stack
              direction='row'
              alignItems='center'
              sx={{ cursor: 'pointer' }}
              onClick={()=>history.push('/cart')}
            >
              <ShoppingCart />
            </Stack>
            <Stack
              direction='row'
              alignItems='center'
              sx={{ cursor: 'pointer' }}
              onClick={()=>{
                account && account.isAdmin ?
                  history.push('/admin') :
                  history.push('/account')
              }}
            >
              <AccountCircle />
            </Stack>
            <Stack alignItems='center' onClick={toggleOpenCategories}>
              <Box sx={{ width: '20px', bgcolor: 'white', height: '2px' }}></Box>
              <Box sx={{ width: '20px', bgcolor: 'white', height: '2px', marginY: '3px' }}></Box>
              <Box sx={{ width: '20px', bgcolor: 'white', height: '2px' }}></Box>
            </Stack>
          </Stack>
        </Stack>
      </Toolbar>
      <Stack
        alignItems='center'
        justifyContent='center'
        sx={{
          height: 70,
          paddingX: '2px',
          width: '100vw',
          display: openCategories ? 'flex' : 'none',
          backgroundColor: 'rgba(169, 207, 70, .7)',
        }}
      >
        <Stack justifyContent='space-between' direction='row' sx={{ width: '95%' }}>
          <SectionMenu category={Categories.CLOTHES} title={CategoriesTitle[Categories.CLOTHES]} />
          <SectionMenu category={Categories.ACCESSORIES} title={CategoriesTitle[Categories.ACCESSORIES]} />
          <SectionMenu category={Categories.FOOTWEAR} title={CategoriesTitle[Categories.FOOTWEAR]} />
          <SectionMenu category={Categories.KIDS} title={CategoriesTitle[Categories.KIDS]} />
          <SectionMenu category={Categories.PLUS_SIZE} title={CategoriesTitle[Categories.PLUS_SIZE]} />
        </Stack>
      </Stack>
    </AppBar>
  )
}
