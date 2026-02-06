import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ImageLightbox from './ImageLightbox';

export default function ProjectContent({ file }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [uiScale, setUiScale] = useState({
    prose: 'prose',
    padding: 'p-8',
    maxWidth: 'max-w-3xl',
    gridCols: 'grid-cols-1 md:grid-cols-2',
    gap: 'gap-4',
    imageHeight: 'h-48',
    buttonPadding: 'px-4 py-2',
    buttonText: 'text-sm'
  });

  // Scale content based on screen size
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width >= 2560) {
        // 4K+
        setUiScale({
          prose: 'prose prose-lg',
          padding: 'p-12',
          maxWidth: 'max-w-5xl',
          gridCols: 'grid-cols-1 md:grid-cols-3',
          gap: 'gap-6',
          imageHeight: 'h-56',
          buttonPadding: 'px-6 py-3',
          buttonText: 'text-base'
        });
      } else if (width >= 1920) {
        // Large desktop
        setUiScale({
          prose: 'prose prose-lg',
          padding: 'p-10',
          maxWidth: 'max-w-4xl',
          gridCols: 'grid-cols-1 md:grid-cols-2',
          gap: 'gap-5',
          imageHeight: 'h-52',
          buttonPadding: 'px-5 py-2.5',
          buttonText: 'text-sm'
        });
      } else if (width >= 1440) {
        // Standard large
        setUiScale({
          prose: 'prose',
          padding: 'p-9',
          maxWidth: 'max-w-3xl',
          gridCols: 'grid-cols-1 md:grid-cols-2',
          gap: 'gap-5',
          imageHeight: 'h-48',
          buttonPadding: 'px-4 py-2',
          buttonText: 'text-sm'
        });
      } else {
        // Standard
        setUiScale({
          prose: 'prose',
          padding: 'p-8',
          maxWidth: 'max-w-3xl',
          gridCols: 'grid-cols-1 md:grid-cols-2',
          gap: 'gap-4',
          imageHeight: 'h-48',
          buttonPadding: 'px-4 py-2',
          buttonText: 'text-sm'
        });
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const gridItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 }
    })
  };

  const hasScreenshots = file.screenshots && file.screenshots.length > 0;

  return (
    <div className={`${uiScale.padding} ${uiScale.maxWidth} mx-auto`}>
      {/* Content */}
      <div className={`${uiScale.prose} prose-stone mb-8`}>
        <div
          className="text-stone-700 font-sans leading-relaxed"
          dangerouslySetInnerHTML={{ __html: file.content }}
        />
      </div>

      {/* Screenshot Gallery */}
      {hasScreenshots && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-stone-800 mb-4">Screenshots</h3>
          <div className={`grid ${uiScale.gridCols} ${uiScale.gap}`}>
            {file.screenshots.map((screenshot, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={gridItemVariants}
                whileHover={{ scale: 1.02, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)' }}
                className="relative cursor-pointer rounded-lg overflow-hidden border border-stone-200 bg-stone-50"
                onClick={() => openLightbox(index)}
              >
                <div className={`relative ${uiScale.imageHeight}`}>
                  <Image
                    src={screenshot.path}
                    alt={screenshot.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 33vw"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    priority={index === 0}
                  />
                </div>
                {screenshot.caption && (
                  <div className="p-3 bg-white">
                    <p className="text-sm text-stone-600">{screenshot.caption}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-stone-200">
        {file.websiteUrl && (
          <a
            href={file.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${uiScale.buttonPadding} bg-stone-200 hover:bg-stone-300 rounded ${uiScale.buttonText} transition-colors text-stone-800`}
          >
            View Site
          </a>
        )}
        {file.githubUrl && (
          <a
            href={file.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${uiScale.buttonPadding} bg-stone-200 hover:bg-stone-300 rounded ${uiScale.buttonText} transition-colors text-stone-800`}
          >
            Source Code
          </a>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && hasScreenshots && (
        <ImageLightbox
          screenshots={file.screenshots}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
