import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MenuBar({ mouseY }) {
  const [time, setTime] = useState('');
  const [barHeight, setBarHeight] = useState('h-6');
  const [fontSize, setFontSize] = useState('text-xs');

  // Scale menu bar based on screen size
  useEffect(() => {
    const updateBarScale = () => {
      const width = window.innerWidth;
      if (width >= 2560) {
        setBarHeight('h-8');
        setFontSize('text-sm');
      } else if (width >= 1920) {
        setBarHeight('h-7');
        setFontSize('text-xs');
      } else {
        setBarHeight('h-6');
        setFontSize('text-xs');
      }
    };

    updateBarScale();
    window.addEventListener('resize', updateBarScale);
    return () => window.removeEventListener('resize', updateBarScale);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      const dateString = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      setTime(`${dateString} ${timeString}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-hide menu bar, show only when mouse is at top (like macOS)
  const shouldShow = mouseY < 10;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ y: -32 }}
          animate={{ y: 0 }}
          exit={{ y: -32 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className={`fixed top-0 left-0 right-0 ${barHeight} bg-white/80 backdrop-blur-xl border-b border-stone-200 flex items-center px-3 text-stone-600 ${fontSize} z-50 font-sans shadow-sm`}
        >
          <div className="flex items-center gap-4">
            <span className="font-medium text-stone-800">Harsh Kumar</span>
          </div>
          <div className="ml-auto flex items-center gap-3 font-mono text-xs">
            <span className="text-stone-700">{time}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
