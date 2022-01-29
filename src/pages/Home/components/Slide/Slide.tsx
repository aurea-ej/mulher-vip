import { Box, Stack } from '@mui/material'
import { CarouselCard } from './components'
import { Carousel } from 'react-responsive-carousel'
import banner from '../../../../assets/images/banner.png'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export const Slide: React.FC = () => {

  const teste = [{ item: 'a' }, { item: 'b' }, { item: 'b' }]
  
  return (
    <Stack sx={{ textAlign: 'center', width: '100vw', height: '40vh', marginTop: 3 }} direction='row'>
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
            <Box
              sx={{
                width: '100vw',
                height: '40vw',
                backgroundSize: 'cover',
                backgroundImage: `url(${banner})`,
              }}
            />
          </CarouselCard>
        ))}
      </Carousel>
    </Stack>
  )
}