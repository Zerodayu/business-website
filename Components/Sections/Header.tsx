"use client";

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image';
import { FaEquals, IoClose } from '@/Components/icons'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from "framer-motion"
import '@/app/globals.css';
import { contactInfo } from '@/app/content/content';

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
  const scrollPositionRef = useRef(0);
  
  // Add effect to disable scrolling when menu is open
  useEffect(() => {
  if (menuOpen) {
    scrollPositionRef.current = window.scrollY;
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
    window.scrollTo(0, scrollPositionRef.current);
  }

  return () => {
    document.body.style.overflow = '';
  };
}, [menuOpen]);
  return (
    <div className="px-10 py-6 relative">
      <div className='fixed top-0 left-0 w-full z-[100] px-6 lg:px-10 py-6 flex flex-row items-center justify-between mix-blend-difference filter grayscale'>
        <a href="/" className='flex items-center cursor-pointer group'>
          <Image
            src="/koysLOGO.svg"
            alt="Logo"
            width={50}
            height={50}
          />
          <div className="font-serif tracking-widest">
            <h1 className="text-lg">koys</h1>
            <h1 className="text-xl">Photography</h1>
          </div>
        </a>

        <AnimatePresence mode="wait">
          {menuOpen ? (
            <motion.button
              key="close"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 90 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-3xl"
              aria-label="Toggle menu"
            >
              <IoClose />
            </motion.button>
          ) : (
            <motion.button
              key="open"
              onClick={() => setMenuOpen(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-3xl"
              aria-label="Toggle menu"
            >
              <FaEquals />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Blurred fullscreen background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 backdrop-blur-md bg-black/50"
              aria-hidden="true"
            />

            {/* Menu content */}
            <div className='fixed inset-0 z-50 flex flex-col items-end justify-center px-10 text-right'>
              <div className='flex flex-col w-full gap-6 text-6xl font-serif tracking-widest'>
                {[
                  { text: "Home", href: "/" },
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
                  { text: "Facebook", href: contactInfo.socialMedia.facebook },
                  { text: "Instagram", href: contactInfo.socialMedia.instagram }
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
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Hero
