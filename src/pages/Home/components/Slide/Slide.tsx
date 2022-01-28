import { CarouselCard } from './components'
import { Avatar, Stack } from '@mui/material'
import { Carousel } from 'react-responsive-carousel'
import banner from '../../../../assets/images/banner.png'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export const Slide: React.FC = () => {

  const teste = [{ item: 'a' }, { item: 'b' }, { item: 'b' }]
  
  return (
    <Stack alignItems='center' sx={{ textAlign: 'center', width: '100vw', height: '100%' }} direction='row'>
      <Carousel
        autoPlay
        swipeable
        stopOnHover
        emulateTouch
        infiniteLoop
        interval={6000}
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        className='carousel'
        showIndicators={false}
      >
        {teste.map(item => (
          <CarouselCard>
            <Avatar imgProps={{ style: { objectFit: 'contain', borderRadius: '5px' } }}
              variant='square'
              alt='Imagem do slider'
              src={banner}
              sx={{
                width: '80%',
                height: '80%',
              }}
            />
          </CarouselCard>
        ))}
      </Carousel>
    </Stack>
  )
}