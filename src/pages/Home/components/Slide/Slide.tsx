import { Box, Stack } from '@mui/material'
import { CarouselCard } from './components'
import { getStorage, ref, listAll, StorageReference, getDownloadURL } from 'firebase/storage'
import { Carousel } from 'react-responsive-carousel'
import banner from '../../../../assets/images/banner.png'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { useEffect, useState } from 'react'

export const Slide: React.FC = () => {
  const [bannerImages, setBannerImages] = useState<string[]>([])
  const teste = [{ item: 'a' }, { item: 'b' }, { item: 'b' }]

  const storage = getStorage()

  useEffect(()=>{
    const listRef = ref(storage, 'bannerImages/')
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          const bannerImagesTemp: string[] = []
          getDownloadURL(ref(itemRef))
            .then((downloadURL) => {
              // setBannerImages(bannerImagesTemp, ...bannerImages)
              bannerImagesTemp.push(downloadURL)
            })
          setBannerImages(bannerImagesTemp)
        })
      })
  },[])

  
  return (
    <Stack sx={{ textAlign: 'center', width: '100vw', height: '40vh', marginTop: 3 }} direction='row'>
      {/* <img style={{ width: '500px', height: '500px' }} src='https://firebasestorage.googleapis.com/v0/b/mulhervipcampos.appspot.com/o/bannerImages%2FCaptura%20de%20Tela%202022-02-23%20a%CC%80s%2015.37.10.png?alt=media&token=0698f608-991e-4600-b52b-fd756e3c97e1' /> */}
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
            {/* <img style={{ width: '500px', height: '500px' }} src='https://firebasestorage.googleapis.com/v0/b/mulhervipcampos.appspot.com/o/bannerImages%2FCaptura%20de%20Tela%202022-02-23%20a%CC%80s%2015.37.10.png?alt=media&token=0698f608-991e-4600-b52b-fd756e3c97e1' /> */}
            <Box
              sx={{
                width: '100vw',
                height: '40vw',
                backgroundSize: 'cover',
                // backgroundImage: `url(${banner})`,
                // backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/mulhervipcampos.appspot.com/o/bannerImages%2FCaptura%20de%20Tela%202022-02-23%20a%CC%80s%2015.37.10.png?alt=media&token=0698f608-991e-4600-b52b-fd756e3c97e1)`,
                backgroundImage: `url(${item})`,
              }}
            />
          </CarouselCard>
        ))}
      </Carousel>
    </Stack>
  )
}
