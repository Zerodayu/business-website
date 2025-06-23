"use client";

import React, { useState } from 'react'
import Link from "next/link";
import { motion } from "framer-motion";
import InvertHover from "@/Components/InvertHover";
import { services } from '../content/content'

const page = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className='w-full min-h-[80vh] pt-30 px-8 flex flex-col items-center justify-center'>
      <h1 className="tracking-wide font-serif text-3xl lg:text-5xl pb-6">
        Services
      </h1>
      <div className="flex flex-col lg:flex-row gap-2 justify-center">
        {Object.values(services).map((service, index) => (
          <div key={index} className="w-full flex flex-col gap-2">
            <h2 className="text-lg text-left font-bold">{service.title}</h2>
            <ul className="list-disc list-inside text-left mb-8">
              {service.items.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Link href="/about" className="w-full">
        <motion.div
          className="w-full relative overflow-hidden py-2 cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <InvertHover active={hovered} />
          <p className="text-md lg:text-lg w-full relative z-10 mix-blend-difference text-center">
            — Contact me / Schedule a meeting —
          </p>
        </motion.div>
      </Link>
    </div>
  )
}

export default page