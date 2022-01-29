import Lottie from 'react-lottie'
import { Container } from '../../components'
import AddIcon from '@mui/icons-material/Add'
import { useModal } from '../../hooks/useModal'
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import { Box, Stack, Typography } from '@mui/material'
import TimelineIcon from '@mui/icons-material/Timeline'
import adminAnimation from '../../assets/lottie/admin.json'
import { InsertItemModal, UpdateItemModal } from './components'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

const DEFAULT_OPTIONS = {
  loop: true,
  autoplay: true,
  animationData: adminAnimation,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

export const Admin: React.FC = () => {
  const [insertItemIsOpen, toggleInsertItem] = useModal()
  const [updateItemIsOpen, toggleUpdateItem] = useModal()

  return (
    <Container>
      <Stack
        spacing={3}
        direction='row'
        alignItems='center'
        justifyContent='center'
        sx={{ width: '100vw', paddingX: 5, marginTop: 3 }}
      >
        <Stack
          spacing={2}
          justifyContent='center'
          sx={{
            padding: 2,
            width: '50%',
            height: '500px',
            borderRadius: 5,
            bgcolor: 'white',
            borderLeft: '80px solid #a9cf46',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, .2)',
          }}
        >
          <Stack justifyContent='space-between' sx={{ height: '60%', marginLeft: 3, }}>
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
            <Stack>
              <Typography sx={{ display: 'flex', color: '#9CADBF', alignItems: 'center', cursor: 'pointer' }}>
                <DeleteForeverIcon sx={{ marginRight: 1 }} />
                <b>DELETAR</b>
              </Typography>
            </Stack>
            <Stack>
              <Typography sx={{ display: 'flex', color: '#9CADBF', alignItems: 'center', cursor: 'pointer' }}>
                <TimelineIcon sx={{ marginRight: 1 }} />
                <b>ACOMPANHAR PEDIDOS</b>
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Box sx={{ width: '30%' }}>
          <Lottie options={DEFAULT_OPTIONS} />
        </Box>
      </Stack>

      {/* <Stack
        sx={{
          marginY: 2,
          paddingY: 2,
          paddingX: 4,
          borderRadius: 3,
          boxShadow: '0px 2px 5px rgba(0, 0, 0, .1)',
        }}
      >
        <Typography>Inserir</Typography>
      </Stack>
      <Stack
        sx={{
          marginY: 2,
          paddingY: 2,
          paddingX: 4,
          borderRadius: 3,
          boxShadow: '0px 2px 5px rgba(0, 0, 0, .1)',
        }}
      >
        <Typography>Atualizar</Typography>
      </Stack>
      <Stack
        sx={{
          marginY: 2,
          paddingY: 2,
          paddingX: 4,
          borderRadius: 3,
          boxShadow: '0px 2px 5px rgba(0, 0, 0, .1)',
        }}
      >
        <Typography>Deletar</Typography>
      </Stack>
      <Stack
        sx={{
          marginY: 2,
          paddingY: 2,
          paddingX: 4,
          borderRadius: 3,
          boxShadow: '0px 2px 5px rgba(0, 0, 0, .1)',
        }}
      >
        <Typography>Acompanhar vendas</Typography>
      </Stack> */}
      <InsertItemModal closeModal={toggleInsertItem} isOpen={insertItemIsOpen} />
      <UpdateItemModal closeModal={toggleUpdateItem} isOpen={updateItemIsOpen} />
    </Container>
  )
}
