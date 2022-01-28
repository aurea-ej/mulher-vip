import { SectionMenu } from './components'
import Logo from '../../../../assets/images/logoMulherVip.png'
import {

  Link,
  Stack,
  AppBar,
  Avatar,
  Toolbar,
} from '@mui/material'
import { useHistory } from 'react-router'
import { AccountCircle, ShoppingCart } from '@mui/icons-material'
import { useAccountStore } from '../../../../store/account/reducer'
import { Categories, CategoriesTitle } from '../../../../types/categories'


export const Header: React.FC = () => {
  const history = useHistory()
  const { storeState: { account } } = useAccountStore()

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{
        zIndex: 200,
        paddingY: 1,
        backgroundColor: '#a9cf46',
      }}
    >
      <Toolbar
        sx={{
          height: 70,
          display: 'flex',
          backgroundColor: '#a9cf46',
          justifyContent: 'space-between',
        }}
      >
        <Link href='/' sx={{ height: '100%' }}>
          <Avatar
            src={Logo}
            variant='square'
            alt='Logo mulher vip'
            sx={{ height: '80%', width: '100%' }}
            imgProps={{ style: { objectFit: 'contain' } }}
          />
        </Link>
        <Stack direction='row' justifyContent='space-between' sx={{ width: '55%' }}>
          <SectionMenu category={Categories.CLOTHES} title={CategoriesTitle[Categories.CLOTHES]} />
          <SectionMenu category={Categories.ACCESSORIES} title={CategoriesTitle[Categories.ACCESSORIES]} />
          <SectionMenu category={Categories.FOOTWEAR} title={CategoriesTitle[Categories.FOOTWEAR]} />
          <SectionMenu category={Categories.KIDS} title={CategoriesTitle[Categories.KIDS]} />
          <SectionMenu category={Categories.PLUS_SIZE} title={CategoriesTitle[Categories.PLUS_SIZE]} />
        </Stack>
        <Stack direction='row' spacing={2}>
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
            {account && account.isAdmin ? 'Admin' : 'Conta'}
          </Stack>
          <Stack
            direction='row'
            alignItems='center'
            sx={{ cursor: 'pointer' }}
            onClick={()=>history.push('/cart')}
          >
            <ShoppingCart />
            Carrinho
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}