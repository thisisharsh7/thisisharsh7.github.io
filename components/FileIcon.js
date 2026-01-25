import { FaFile, FaFolder, FaTerminal, FaCode, FaFilePdf } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function FileIcon({ name, type, onClick, x, y, onDrag }) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [iconSize, setIconSize] = useState(40);

  // Scale icons based on screen size
  useEffect(() => {
    const updateIconSize = () => {
      const width = window.innerWidth;
      if (width >= 2560) {
        setIconSize(56); // 4K+ monitors
      } else if (width >= 1920) {
        setIconSize(48); // Large desktop
      } else if (width >= 1440) {
        setIconSize(44); // Standard large
      } else {
        setIconSize(40); // Standard desktop
      }
    };

    updateIconSize();
    window.addEventListener('resize', updateIconSize);
    return () => window.removeEventListener('resize', updateIconSize);
  }, []);

  const getIcon = () => {
    if (type === 'folder') {
      return <FaFolder className="text-orange-500" size={iconSize} />;
    }
    if (name.endsWith('.pdf')) {
      return <FaFilePdf className="text-red-600" size={iconSize} />;
    }
    if (name.endsWith('.sh')) {
      return <FaTerminal className="text-green-700" size={iconSize} />;
    }
    if (name.endsWith('.md')) {
      return <FaCode className="text-stone-600" size={iconSize} />;
    }
    if (name.endsWith('.txt')) {
      return <FaFile className="text-stone-500" size={iconSize} />;
    }
    return <FaFile className="text-stone-600" size={iconSize} />;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    // Constrain to viewport minus menu bar (24px) and toolbar (32px)
    const menuBarHeight = 24;
    const toolbarHeight = 32;
    const maxY = window.innerHeight - toolbarHeight - 80; // 80 for icon height
    const maxX = window.innerWidth - 80;

    const newX = Math.max(0, Math.min(maxX, e.clientX - dragStart.x));
    const newY = Math.max(menuBarHeight, Math.min(maxY, e.clientY - dragStart.y));

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (onDrag) {
      onDrag(name, position);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  useEffect(() => {
    setPosition({ x, y });
  }, [x, y]);

  const getTextSize = () => {
    if (iconSize >= 56) return 'text-sm'; // 4K+
    if (iconSize >= 48) return 'text-xs'; // Large desktop
    return 'text-xs'; // Standard
  };

  const getMaxWidth = () => {
    if (iconSize >= 56) return 'max-w-28'; // 4K+
    if (iconSize >= 48) return 'max-w-24'; // Large desktop
    return 'max-w-20'; // Standard
  };

  return (
    <button
      onDoubleClick={onClick}
      onMouseDown={handleMouseDown}
      className={`absolute flex flex-col items-center gap-1 p-2 rounded hover:bg-white/40 transition-colors group ${isDragging ? 'cursor-move' : 'cursor-default'}`}
      style={{ left: position.x, top: position.y }}
    >
      <div className="select-none">{getIcon()}</div>
      <span className={`${getTextSize()} text-stone-700 font-mono ${getMaxWidth()} truncate select-none`}>
        {name}
      </span>
    </button>
  );
}
