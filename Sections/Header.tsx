"use client";

import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { FaEquals, IoClose } from '@/Components/icons'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from "framer-motion"
import '@/app/globals.css';

const textVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: { 
      type: "tween", 
      ease: "easeOut", 
      duration: 0.3, 
      delay: i * 0.08
    }
  }),
  exit: { 
    opacity: 0, 
    x: 100, 
    transition: { type: "tween", ease: "easeOut", duration: 0.3 }
  }
}

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="px-10 py-6">
      {/* Fullscreen blur overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-10 backdrop-blur-lg bg-black/40"
          />
        )}
      </AnimatePresence>

      <div className='flex flex-row items-center justify-between w-full mix-blend-difference filter grayscale relative z-20'>
        <Image
          src="/koysLOGO.svg"
          alt="Logo"
          width={50}
          height={50}
        />
        <div className='flex flex-row items-center text-3xl'>
          <AnimatePresence mode="wait" initial={false}>
            {!menuOpen ? (
              <motion.button
                key="open"
                onClick={() => setMenuOpen(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaEquals />
              </motion.button>
            ) : (
              <motion.button
                key="close"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, rotate: 90 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <IoClose />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <div className='items-end text-right relative z-20'>
            <div className='flex flex-col w-full mt-10 gap-6 text-6xl font-serif tracking-widest'>
              {[
                { text: "Gallery", href: "/gallery" },
                { text: "Services", href: "/services" },
                { text: "About", href: "/about" }
              ].map((item, i) => (
                <motion.h1
                  key={item.text}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={textVariants}
                >
                  <a href={item.href} className="group relative inline-block tracking-widest tracking-hover-wider">
                    {item.text}
                    <span className="underline-animate" />
                  </a>
                </motion.h1>
              ))}
            </div>
            <div className='flex flex-col mt-20 gap-4'>
              {[
                { text: "Facebook", href: "https://facebook.com" },
                { text: "Instagram", href: "https://instagram.com" }
              ].map((item, i) => (
                <motion.h1
                  key={item.text}
                  custom={i + 3}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={textVariants}
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-block tracking-hover-wider"
                  >
                    {item.text}
                    <span className="underline-animate" />
                  </a>
                </motion.h1>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Hero