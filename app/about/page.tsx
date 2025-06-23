import React from 'react'
import { contactInfo } from '../content/content'
import HoverText from '@/Components/HoverText'

const page = () => {
  return (
    <div className="pt-25 flex flex-col items-center justify-center w-full px-8">
      <div>
        <h1 className="tracking-wide font-serif text-3xl lg:text-5xl pb-2 text-center">
          About — Koys Photography
        </h1>
        {/* Row: Description left, Info right */}
        <div className="flex flex-col lg:flex-row flex-wrap justify-center items-start gap-16 mt-10">
          {/* Description on the left */}
          <div className="text-lg text-center lg:text-left flex-1 max-w-md">
            {contactInfo.description}
          </div>
          <div className="flex flex-col text-lg flex-1 min-w-[250px]">
            <div className="flex flex-col gap-4 mb-6">
              <div><strong>Name:</strong> {contactInfo.name}</div>
              <div><strong>Email:</strong> <a href={`mailto:${contactInfo.email}`} className="underline">{contactInfo.email}</a></div>
              <div><strong>Phone:</strong> {contactInfo.phone}</div>
              <div><strong>Location:</strong> {contactInfo.location}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-row pt-8 gap-8 font-semibold tracking-wider items-center justify-center">
          <HoverText label="Instagram" url={contactInfo.socialMedia.instagram} />
          <HoverText label="Facebook" url={contactInfo.socialMedia.facebook} />
        </div>
      </div>
    </div>
  )
}

export default page