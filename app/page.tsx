"use client";

import Image from "next/image";
import Gallery from "@/Components/Sections/Gallery";
import { contactInfo, services } from "@/app/content/content";
import { useEffect, useState } from "react";
import HoverText from "@/Components/HoverText";
import { motion } from "framer-motion";
import InvertHover from "@/Components/InvertHover";
import Link from "next/link";

const coverImages = [
  "/cover1.jpg",
  "/cover2.jpg",
  "/cover3.jpg",
  "/cover4.jpg",
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [showWipe, setShowWipe] = useState(true);

  useEffect(() => {
    const wipeTimeout = setTimeout(() => setShowWipe(false), 1200);
    return () => clearTimeout(wipeTimeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % coverImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 rounded-b-4xl w-full h-[65vh] overflow-hidden">
          {/* Wipe overlay */}
          {showWipe && (
            <motion.div
              initial={{ y: "0%" }}
              animate={{ y: "100%" }}
              transition={{ duration: 1.1, ease: [0.77, 0, 0.175, 1] }}
              className="absolute inset-0 z-30 bg-black"
              style={{
                borderBottomLeftRadius: "2rem",
                borderBottomRightRadius: "2rem",
              }}
            />
          )}
          {coverImages.map((src, idx) => (
            <Image
              key={src}
              src={src}
              alt={`Cover Image ${idx + 1}`}
              fill
              priority={idx === 0}
              style={{
                objectFit: "cover",
                transition: "opacity 2s ease",
                opacity: current === idx ? 1 : 0,
                zIndex: current === idx ? 2 : 1,
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          ))}
        </div>
        <div className="flex w-full items-center justify-center absolute inset-x-0 bottom-0 flex-col lg:flex-row p-4 lg:px-20 lg:py-10 gap-2 lg:gap-4">
          <div>
            <motion.div
              initial={{ y: 90, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="flex-row items-center justify-center"
            >
              <div className="flex items-center gap-4">
                <h1 className="text-3xl lg:text-7xl font-serif tracking-widest text-white flex">
                  {"koys".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        duration: 0.7,
                        ease: "easeInOut",
                        delay: 0.2 + ("Photography".length - 1) * 0.07 + 0.7 + i * 0.07,
                      }}
                      style={{ display: "inline-block" }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </h1>
                <motion.hr
                  className="h-0.5 w-full border-0 bg-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    delay: 0.5 + ("Photography".length - 1) * 0.07 + 0.7 + "koys".length * 0.07,
                    duration: 0.7,
                    ease: [0.77, 0, 0.175, 1],
                  }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            </motion.div>
            <motion.h1 className="text-5xl lg:text-9xl font-serif tracking-widest text-white flex">
              {"Photography".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    ease: "easeInOut",
                    delay: 0.2 + i * 0.07,
                  }}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>
          <motion.p
            className="text-md lg:text-lg"
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 3,
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            Friendly and skilled photographer with a sharp eye for detail and a passion for capturing real, meaningful moments. Experienced in portraits, events, and lifestyle shoots, with a focus on quality and client comfort.
          </motion.p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="w-full mt-20 p-4 lg:p-8 items-center justify-center">
        <h1 className="tracking-wide font-serif text-3xl lg:text-5xl pb-2">
          Selected Works
        </h1>
        <Gallery maxRows={2.5} />
      </section>

      {/* Services Section */}
      <section>
        <div className="flex flex-col w-full my-20 p-4 lg:p-8 items-center justify-center">
          <h1 className="tracking-wide font-serif text-3xl lg:text-5xl pb-6">
            Services
          </h1>
          <div className="flex flex-col items-center text-center w-full">
            {Object.values(services).map((service, index) => (
              <Link href="/services" key={index} className="w-full">
                <motion.div
                  className="w-full relative overflow-hidden py-2 cursor-pointer"
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <InvertHover active={hovered === index} />
                  <h2 className="text-lg w-full relative z-10 mix-blend-difference">
                    {`— ${service.title} —`}
                  </h2>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <div className="w-full px-4 lg:px-8 flex flex-col items-center justify-center">
          <hr className="w-full h-0.5 m-4 border-0 bg-white/50" />
          <h1 className="tracking-wide font-serif text-3xl lg:text-5xl pb-2">
            Contact
          </h1>
          <p className="mb-2 text-center italic">
            If you're interested in working together or have any questions, feel free to reach out!
          </p>
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-center mb-4 opacity-70">
            <p>{contactInfo.name}</p>
            <span className="mx-2 hidden lg:inline">•</span>
            <p>{contactInfo.email}</p>
            <span className="mx-2 hidden lg:inline">•</span>
            <p>{contactInfo.phone}</p>
            <span className="mx-2 hidden lg:inline">•</span>
            <p>{contactInfo.location}</p>
          </div>
          <div className="flex flex-row gap-8 font-semibold tracking-wider items-center justify-center">
            {[
              { label: "Instagram", url: contactInfo.socialMedia.instagram },
              { label: "Facebook", url: contactInfo.socialMedia.facebook },
            ].map(({ label, url }) => (
              <HoverText key={label} label={label} url={url} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
