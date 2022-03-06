import Lottie from 'react-lottie'
import { useHistory } from 'react-router'
import { useIsMobile } from '../../hooks'
import { Container } from '../../components'
import AddIcon from '@mui/icons-material/Add'
import { useModal } from '../../hooks/useModal'
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import { Box, Stack, Typography } from '@mui/material'
import TimelineIcon from '@mui/icons-material/Timeline'
import adminAnimation from '../../assets/lottie/admin.json'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { InsertItemModal, UpdateItemModal, DeleteItemModal, AlterBannerModal } from './components'

const DEFAULT_OPTIONS = {
  loop: true,
  autoplay: true,
  animationData: adminAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

export const Admin: React.FC = () => {
  const history = useHistory()
  const isMobile = useIsMobile()
  const [insertItemIsOpen, toggleInsertItem] = useModal()
  const [updateItemIsOpen, toggleUpdateItem] = useModal()
  const [alterBannerIsOpen, toggleAlterBanner] = useModal()
  const [deleteItemIsOpen, toggleDeleteItemIsOpen] = useModal()

  return (
    <Container>
      <Stack
        spacing={3}
        alignItems='center'
        justifyContent='center'
        direction={isMobile ? 'column' : 'row'}
        sx={{ width: '100vw', paddingX: 5, marginTop: 5 }}
      >
        <Stack
          spacing={2}
          justifyContent='center'
          sx={{
            padding: 2,
            height: '500px',
            borderRadius: 5,
            bgcolor: 'white',
            width: isMobile ? '75vw' : '50%',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, .2)',
            borderLeft: `${isMobile ? '40px' : '80px'} solid #a9cf46`,
          }}
        >
          <Stack justifyContent='space-between' sx={{ height: '60%' , marginLeft: 3, }}>
            <Stack onClick={toggleInsertItem}>
              <Typography sx={{ display: 'flex', color: '#9CADBF', alignItems: 'center', cursor: 'pointer' }}>
                <AddIcon sx={{ marginRight: 1 }} />
                <b>INSERIR</b>
              </Typography>
            </Stack>
            <Stack onClick={toggleUpdateItem}>
              <Typography sx={{ display: 'flex', color: '#9CADBF', alignItems: 'center', cursor: 'pointer' }}>
                <SyncAltIcon sx={{ marginRight: 1 }} />
                <b>ATUALIZAR</b>
              </Typography>
            </Stack>
            <Stack onClick={toggleDeleteItemIsOpen}>
              <Typography sx={{ display: 'flex', color: '#9CADBF', alignItems: 'center', cursor: 'pointer' }}>
                <DeleteForeverIcon sx={{ marginRight: 1 }} />
                <b>DELETAR</b>
              </Typography>
            </Stack>
            <Stack onClick={()=>history.push('/admin/vendas')}>
              <Typography sx={{ display: 'flex', color: '#9CADBF', alignItems: 'center', cursor: 'pointer' }}>
                <TimelineIcon sx={{ marginRight: 1 }} />
                <b>ACOMPANHAR PEDIDOS</b>
              </Typography>
            </Stack>
            <Stack onClick={toggleAlterBanner}>
              <Typography sx={{ display: 'flex', color: '#9CADBF', alignItems: 'center', cursor: 'pointer' }}>
                <AddPhotoAlternateIcon sx={{ marginRight: 1 }} />
                <b>IMAGENS DO BANNER</b>
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Box sx={{ width: isMobile ? '80%' : '30%' }}>
          <Lottie options={DEFAULT_OPTIONS} />
        </Box>
      </Stack>
      <InsertItemModal closeModal={toggleInsertItem} isOpen={insertItemIsOpen} />
      <AlterBannerModal closeModal={toggleAlterBanner} isOpen={alterBannerIsOpen} />
      <UpdateItemModal closeModal={toggleUpdateItem} isOpen={updateItemIsOpen} />
      <DeleteItemModal closeModal={toggleDeleteItemIsOpen} isOpen={deleteItemIsOpen} />
    </Container>
  )
}
