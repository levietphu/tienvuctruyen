import React from 'react'
import './home.scss'
import MainLayout from '../../layouts/MainLayout'
import GalleryCarousel from '../../components/home/GalleryCarousel'

const HomePage = () => {
  return (
    <MainLayout>
      <GalleryCarousel />
    </MainLayout>
  )
}

export default HomePage