import React from 'react'
import { motion } from 'motion/react'
import type { Photo, PolaroidVariant } from '~/types'
import { cn } from '~/lib/utils'

interface Props {
  photo: Photo
  index: number
  totalPhotos: number
  rotation: number
  variant: PolaroidVariant
  isVisible: boolean
  isClicked?: boolean
}

// Polaroid variant size mapping
const polaroidVariants: Record<PolaroidVariant, string> = {
  '1x1': 'w-20 h-20',
  '4x5': 'w-20 h-24',
  '4x3': 'w-20 h-16',
  '9x16': 'w-20 h-32',
}

const PolaroidCard: React.FC<Props> = ({ photo, index, totalPhotos, rotation, variant, isVisible, isClicked = false }) => {
  const baseZIndex = totalPhotos - index
  // Calculate move distance based on image position; later images move further
  const moveDistance = index === 0 ? 0 : 25 // First image 20px, second 40px, third 60px...

  // Handle image source: supports both string paths and Astro ImageMetadata objects
  const imgSrc = typeof photo.src === 'string' ? photo.src : photo.src.src
  const imgWidth = typeof photo.src === 'string' ? photo.width : photo.src.width
  const imgHeight = typeof photo.src === 'string' ? photo.height : photo.src.height

  return (
    <motion.div
      className={cn(
        'inline-block relative bg-white border border-gray-200 shadow-lg cursor-pointer',
        'p-1 sm:p-1.5 transition-shadow duration-300 hover:shadow-xl',
        polaroidVariants[variant],
        '-ml-6 sm:-ml-4 -mt-3'
      )}
      style={{
        zIndex: isClicked ? -1 : baseZIndex,
        willChange: 'transform,opacity',
      }}
      initial={'hidden'}
      animate={isClicked ? 'clicked' : isVisible ? 'show' : 'hidden'}
      variants={{
        hidden: { scale: 0, rotate: 0, x: -60, zIndex: totalPhotos - index },
        show: { scale: 1, rotate: rotation, x: 0 },
        clicked: {
          scale: 1,
          rotate: rotation,
          x: 0,
          transition: { duration: 0.1 }, // Snap back quickly
        },
      }}
      viewport={{ once: true }}
      transition={{
        type: 'spring',
        stiffness: 360,
        damping: 20,
        delay: index * 0.05, // Stagger the animation
        duration: 0.8,
      }}
      whileHover={
        isClicked
          ? {}
          : {
              // Disable hover effect when clicked
              x: moveDistance, // Move distance dynamically based on position
              scale: 1.2,
              rotate: 0, // Remove the tilt on hover, returning to horizontal
              transition: {
                type: 'tween',
                stiffness: 1360,
                damping: 20,
                duration: 0.1,
              },
            }
      }
    >
      <div className="w-full h-full bg-gray-100 overflow-hidden">
        <img
          src={imgSrc}
          width={imgWidth}
          height={imgHeight}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          alt={photo.alt}
        />
      </div>
    </motion.div>
  )
}

export default PolaroidCard
