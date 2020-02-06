import React from 'react'
import {Carousel} from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import v4 from 'uuid/v4'

const carousel = ({imageUrls, showThumbs = false, dynamicHeight = false}) => {
  return (
    <Carousel showThumbs={showThumbs} dynamicHeight={dynamicHeight}>
      {imageUrls.map((src, i) => (
        <img key={v4()} src={src} alt={`Photo ` + (i + 1)} />
      ))}
    </Carousel>
  )
}

export default carousel
