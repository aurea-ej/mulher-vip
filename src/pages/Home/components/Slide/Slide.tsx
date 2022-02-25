import { useMemo } from 'react'
import { CarouselCard } from './components'
import { Avatar, Stack } from '@mui/material'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage'

export const Slide: React.FC = () => {
  const storage = getStorage()

  const bannerImages = useMemo(()=>{
    const listRef = ref(storage, 'bannerImages/')
    const bannerImagesTemp: string[] = []
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(ref(itemRef))
            .then((downloadURL) => {
              bannerImagesTemp.push(downloadURL)
            })
        })
      })
    return bannerImagesTemp
  },[storage])

  if(bannerImages.length > 0) {

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
          {bannerImages.map((item, key) => (
            <CarouselCard key={key}>
              <Avatar
                src={item}
                alt='Banner image'
                variant='square'
                imgProps={{ style: { objectFit: 'contain' } }}
                sx={{
                  width: '100%',
                  height: '100%',
                }}
              />
              {/* <Box
                component={Avatar}
                imgProps={{ style: { objectFit: 'contain' } }}
                sx={{
                  width: '100vw',
                  height: '40vw',
                  backgroundSize: 'cover',
                  backgroundImage: `url(${item})`,
                }}
              /> */}
            </CarouselCard>
          ))}
        </Carousel>
      </Stack>
    )
  } else return null
}
