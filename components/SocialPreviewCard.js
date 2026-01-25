import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function SocialPreviewCard({ isVisible, preview, position }) {
  const [show, setShow] = useState(false);
  const [uiScale, setUiScale] = useState({
    width: 'w-80',
    imageHeight: 'h-44',
    iconSize: 48,
    padding: 'p-3',
    titleSize: 'text-sm',
    urlSize: 'text-xs',
    descSize: 'text-xs'
  });

  // Scale preview card based on screen size
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width >= 2560) {
        // 4K+
        setUiScale({
          width: 'w-96',
          imageHeight: 'h-56',
          iconSize: 64,
          padding: 'p-4',
          titleSize: 'text-base',
          urlSize: 'text-sm',
          descSize: 'text-sm'
        });
      } else if (width >= 1920) {
        // Large desktop
        setUiScale({
          width: 'w-88',
          imageHeight: 'h-52',
          iconSize: 56,
          padding: 'p-3.5',
          titleSize: 'text-sm',
          urlSize: 'text-xs',
          descSize: 'text-xs'
        });
      } else {
        // Standard
        setUiScale({
          width: 'w-80',
          imageHeight: 'h-44',
          iconSize: 48,
          padding: 'p-3',
          titleSize: 'text-sm',
          urlSize: 'text-xs',
          descSize: 'text-xs'
        });
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShow(true), 400); // 400ms delay like browsers
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="absolute z-50 pointer-events-none"
          style={{
            bottom: '40px',
            right: position === 'right' ? '0' : 'auto',
            left: position === 'left' ? '0' : 'auto'
          }}
        >
          <div className={`bg-white rounded-lg shadow-2xl border border-stone-200 overflow-hidden ${uiScale.width}`}>
            {/* Preview Image/Screenshot */}
            <div className={`${uiScale.imageHeight} bg-gradient-to-br from-stone-100 to-stone-200 relative overflow-hidden`}>
              {preview.image ? (
                <img
                  src={preview.image}
                  alt={preview.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full flex items-center justify-center ${preview.gradient}`}>
                  <preview.icon size={uiScale.iconSize} className="opacity-20" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className={`${uiScale.padding} bg-white`}>
              <div className={`font-medium ${uiScale.titleSize} text-stone-900 mb-1 truncate`}>
                {preview.title}
              </div>
              <div className={`${uiScale.urlSize} text-stone-500 truncate`}>
                {preview.url}
              </div>
              {preview.description && (
                <div className={`${uiScale.descSize} text-stone-600 mt-2 line-clamp-2`}>
                  {preview.description}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
