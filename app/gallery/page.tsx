import Gallery from '@/Components/Sections/Gallery'
import React from 'react'

const page = () => {
  return (
    <div className="pt-25 flex flex-col items-center justify-center w-full lg:px-4">
        <h1 className="tracking-wide font-serif text-3xl lg:text-5xl pb-2">
          Gallery
        </h1>
        <Gallery />
    </div>
  )
}

export default page