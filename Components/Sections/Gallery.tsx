"use client";

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

interface GalleryProps {
  maxRows?: number; // Optional prop to limit number of rows
  centered?: boolean; // Optional prop to center contents
}

const Gallery: React.FC<GalleryProps> = ({ maxRows, centered }) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Get list of images from the gallery folder
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        const imageList: string[] = [];

        // Since we can't directly read directory in browser, we'll try to load images by naming convention
        // Starting with your current images (01.jpg to 04.jpg) and expanding as needed
        let imageIndex = 1;
        let consecutiveFailures = 0;
        const maxConsecutiveFailures = 5; // Stop after 5 consecutive failed attempts

        while (consecutiveFailures < maxConsecutiveFailures) {
          const imageName = `${imageIndex.toString().padStart(2, '0')}.jpg`;
          const imagePath = `/gallery/${imageName}`;

          try {
            // Check if image exists by trying to load it
            await new Promise<void>((resolve, reject) => {
              const img = new Image();
              img.onload = () => resolve();
              img.onerror = () => reject();
              img.src = imagePath;
            });

            imageList.push(imagePath);
            consecutiveFailures = 0; // Reset counter on success
          } catch {
            consecutiveFailures++;
          }

          imageIndex++;
        }

        setImages(imageList);
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  // Calculate how many images to display based on maxRows
  const imagesToShow = maxRows ? Math.min(images.length, maxRows * 3) : images.length;
  const displayImages = images.slice(0, imagesToShow);

  // Handle keyboard events for modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg">Loading gallery...</div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg opacity-70">No images found in gallery</div>
      </div>
    );
  }

  return (
    <>
      <div className="gallery-container">
        {/* Masonry layout using CSS columns */}
        <div className={`columns-2 lg:columns-3 p-4 gap-4 lg:gap-6 ${centered ? 'items-center justify-center' : ''}`}>
          {displayImages.map((imageSrc, index) => {
            // Generate a random delay for each image (between 0 and 0.5s)
            const randomDelay = Math.random() * 0.5;

            return (
              <motion.div
                key={index}
                className="mb-4 lg:mb-6 break-inside-avoid overflow-hidden"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.2 }} // <--- changed here
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 30,
                  delay: randomDelay,
                }}
              >
                <div 
                  className="w-auto h-auto filter lg:grayscale hover:grayscale-0 hover:scale-95 transition-all duration-500"
                  onClick={() => setSelectedImage(imageSrc)}
                >
                  <img
                    src={imageSrc}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full object-cover rounded-xl cursor-pointer"
                    style={{ display: 'block', width: '100%' }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
        {/* Show All link as text */}
        {maxRows && images.length > imagesToShow && (
          <div className="flex justify-center mt-4">
            <motion.a
              href="/gallery"
              className="relative h-6 flex items-center overflow-hidden group text-base font-semibold tracking-wider"
              style={{ minWidth: 100 }}
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <motion.span
                className="absolute left-0 w-full text-center"
                variants={{
                  rest: { y: 0, opacity: 1 },
                  hover: { y: 24, opacity: 0 },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                Show All
              </motion.span>
              <motion.span
                className="absolute left-0 w-full text-center"
                variants={{
                  rest: { y: -24, opacity: 0 },
                  hover: { y: 0, opacity: 1 },
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                Show All
              </motion.span>
            </motion.a>
          </div>
        )}
      </div>

      {/* Modal/Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-500 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              className="absolute -top-10 right-0 text-2xl hover:opacity-50 duration-300 z-10"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Selected gallery image"
              className="max-w-full max-h-[70vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;