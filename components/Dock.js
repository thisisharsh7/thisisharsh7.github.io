import { motion } from 'framer-motion';
import { FaFile, FaFolder, FaTerminal } from 'react-icons/fa';

export default function Dock({ openWindows, onWindowRestore, onWindowFocus, activeWindowId }) {
  const getIcon = (file) => {
    if (file.terminal) {
      return <FaTerminal className="text-green-700" size={20} />;
    }
    if (file.type === 'folder') {
      return <FaFolder className="text-orange-500" size={20} />;
    }
    return <FaFile className="text-stone-600" size={20} />;
  };

  if (openWindows.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        className="flex items-end gap-2 px-3 py-2 bg-white/80 backdrop-blur-xl border border-stone-200 rounded-2xl shadow-2xl"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {openWindows.map((window) => (
          <motion.button
            key={window.id}
            onClick={() => {
              if (window.minimized) {
                onWindowRestore(window.id);
              } else {
                onWindowFocus(window.id);
              }
            }}
            className={`relative group flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${
              window.id === activeWindowId && !window.minimized
                ? 'bg-orange-100 shadow-sm'
                : 'hover:bg-stone-100'
            }`}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            {getIcon(window.file)}

            {/* Active indicator dot */}
            {!window.minimized && (
              <motion.div
                className="absolute -bottom-1 w-1 h-1 bg-orange-500 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              />
            )}

            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 px-2 py-1 bg-stone-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {window.file.name}
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
