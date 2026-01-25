import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaMinus, FaExpand, FaCompress, FaDownload, FaShareAlt } from 'react-icons/fa';

export default function Window({
  title,
  onClose,
  children,
  initialX = 100,
  initialY = 100,
  width = 600,
  height = 400,
  zIndex = 10,
  onFocus,
  onMinimize,
  onMaximize,
  onResize,
  terminal = false,
  fileMetadata = {},
  minimized = false,
  maximized = false,
  isTablet = false
}) {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width, height });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState('');
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showIcons, setShowIcons] = useState(false);
  const [copied, setCopied] = useState(false);
  const windowRef = useRef(null);
  const [controlSize, setControlSize] = useState({ button: 'w-3 h-3', icon: 6 });
  const [uiScale, setUiScale] = useState({
    titleBar: 'h-10',
    titleText: 'text-sm',
    terminalBar: 'h-8',
    terminalText: 'text-xs'
  });

  // Scale window UI based on screen size
  useEffect(() => {
    const updateUIScale = () => {
      const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
      if (width >= 2560) {
        // 4K+
        setControlSize({ button: 'w-4 h-4', icon: 8 });
        setUiScale({
          titleBar: 'h-12',
          titleText: 'text-base',
          terminalBar: 'h-10',
          terminalText: 'text-sm'
        });
      } else if (width >= 1920) {
        // Large desktop
        setControlSize({ button: 'w-3.5 h-3.5', icon: 7 });
        setUiScale({
          titleBar: 'h-11',
          titleText: 'text-sm',
          terminalBar: 'h-9',
          terminalText: 'text-xs'
        });
      } else {
        // Standard
        setControlSize({ button: 'w-3 h-3', icon: 6 });
        setUiScale({
          titleBar: 'h-10',
          titleText: 'text-sm',
          terminalBar: 'h-8',
          terminalText: 'text-xs'
        });
      }
    };

    updateUIScale();
    window.addEventListener('resize', updateUIScale);
    return () => window.removeEventListener('resize', updateUIScale);
  }, []);

  const handleDownload = () => {
    if (fileMetadata.downloadUrl) {
      const link = document.createElement('a');
      link.href = fileMetadata.downloadUrl;
      link.download = fileMetadata.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = () => {
    if (fileMetadata.shareUrl) {
      navigator.clipboard.writeText(fileMetadata.shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Update position when initialX or initialY changes (e.g., when maximizing)
  useEffect(() => {
    setPosition({ x: initialX, y: initialY });
  }, [initialX, initialY]);

  // Update size when width or height props change
  useEffect(() => {
    if (!isResizing) {
      setSize({ width, height });
    }
  }, [width, height, isResizing]);

  const handleMouseDown = (e) => {
    // Don't start dragging if clicking on control buttons
    if (e.target.tagName === 'BUTTON') return;
    if (maximized) return; // Don't allow dragging when maximized
    if (isTablet) return; // Don't allow dragging on tablets
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    onFocus?.();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeDirection('');
  };

  const handleResizeStart = (e, direction) => {
    if (maximized) return;
    if (isTablet) return; // Don't allow resizing on tablets
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    });
    onFocus?.();
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
    const handleResize = (e) => {
      if (!isResizing) return;

      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      let newWidth = dragStart.width;
      let newHeight = dragStart.height;

      if (resizeDirection.includes('e')) {
        newWidth = Math.max(400, dragStart.width + deltaX);
      }
      if (resizeDirection.includes('s')) {
        newHeight = Math.max(300, dragStart.height + deltaY);
      }

      setSize({ width: newWidth, height: newHeight });
    };

    const handleResizeEnd = () => {
      if (onResize) {
        onResize(size.width, size.height);
      }
      handleMouseUp();
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleResize);
      window.addEventListener('mouseup', handleResizeEnd);
      return () => {
        window.removeEventListener('mousemove', handleResize);
        window.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [isResizing, dragStart, resizeDirection, onResize, size]);

  // Get minimize animation target (bottom center of screen, where toolbar is)
  const getMinimizeAnimation = () => {
    if (typeof window === 'undefined') return { scale: 0.3, opacity: 0, y: 800 };
    return {
      scale: 0.1,
      opacity: 0,
      x: window.innerWidth / 2 - position.x - width / 2,
      y: window.innerHeight - position.y - 80,
      transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
    };
  };

  // Terminal-style window
  if (terminal) {
    return (
      <motion.div
        ref={windowRef}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={minimized ? getMinimizeAnimation() : { opacity: 1, scale: 1, y: 0, x: 0 }}
        exit={{
          opacity: 0,
          scale: 0.3,
          y: typeof window !== 'undefined' ? window.innerHeight - 100 : 800,
          transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] }
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bg-stone-900 border border-stone-700 rounded-xl shadow-2xl overflow-hidden"
        style={{
          left: position.x,
          top: position.y,
          width: maximized ? width : size.width,
          height: maximized ? height : size.height,
          zIndex,
          cursor: isDragging ? 'grabbing' : 'default',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
          pointerEvents: minimized ? 'none' : 'auto'
        }}
        onClick={onFocus}
      >
        {/* Terminal Title Bar */}
        <div
          className={`${uiScale.terminalBar} bg-stone-800 border-b border-stone-700 flex items-center px-3 ${isTablet ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
          onMouseDown={handleMouseDown}
        >
          <div
            className="flex items-center gap-2 window-controls"
            onMouseEnter={() => setShowIcons(true)}
            onMouseLeave={() => setShowIcons(false)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose?.();
              }}
              className={`${controlSize.button} rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center`}
              aria-label="Close"
            >
              {showIcons && <FaTimes className="text-red-900" size={controlSize.icon} />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMinimize?.();
              }}
              className={`${controlSize.button} rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center`}
              aria-label="Minimize"
            >
              {showIcons && <FaMinus className="text-yellow-900" size={controlSize.icon} />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMaximize?.();
              }}
              className={`${controlSize.button} rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center`}
              aria-label="Maximize"
            >
              {showIcons && (maximized ? <FaCompress className="text-green-900" size={controlSize.icon} /> : <FaExpand className="text-green-900" size={controlSize.icon} />)}
            </button>
          </div>
          <div className={`flex-1 text-center ${uiScale.terminalText} text-stone-400 font-mono select-none`}>
            {title}
          </div>
          <div className="w-16" />
        </div>

        {/* Terminal Content */}
        <div className="h-[calc(100%-2rem)] overflow-auto bg-stone-900 text-green-400 font-mono text-sm p-4 leading-relaxed" style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>

        {/* Resize Handles - only show on desktop when not maximized */}
        {!maximized && !isTablet && (
          <>
            {/* Right edge resize */}
            <div
              onMouseDown={(e) => handleResizeStart(e, 'e')}
              className="absolute right-0 top-8 bottom-8 w-2 cursor-ew-resize hover:bg-orange-400/20 transition-all"
              style={{ zIndex: 100 }}
            />
            {/* Bottom edge resize */}
            <div
              onMouseDown={(e) => handleResizeStart(e, 's')}
              className="absolute left-8 right-8 bottom-0 h-2 cursor-ns-resize hover:bg-orange-400/20 transition-all"
              style={{ zIndex: 100 }}
            />
            {/* Corner resize */}
            <div
              onMouseDown={(e) => handleResizeStart(e, 'se')}
              className="absolute right-0 bottom-0 w-6 h-6 cursor-nwse-resize group"
              style={{ zIndex: 100 }}
            >
              <div className="absolute right-0.5 bottom-0.5 w-1 h-1 rounded-full bg-orange-400/40 group-hover:bg-orange-400/80 transition-colors" />
            </div>
          </>
        )}
      </motion.div>
    );
  }

  // Standard Finder-style window
  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={minimized ? getMinimizeAnimation() : { opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{
        opacity: 0,
        scale: 0.3,
        y: typeof window !== 'undefined' ? window.innerHeight - 100 : 800,
        transition: { duration: 0.3, ease: [0.32, 0.72, 0, 1] }
      }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bg-white rounded-xl shadow-2xl overflow-hidden border border-stone-200"
      style={{
        left: position.x,
        top: position.y,
        width: maximized ? width : size.width,
        height: maximized ? height : size.height,
        zIndex,
        cursor: isDragging ? 'grabbing' : 'default',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        pointerEvents: minimized ? 'none' : 'auto'
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`${uiScale.titleBar} bg-stone-50 border-b border-stone-200 flex items-center px-4 ${isTablet ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
        onMouseDown={handleMouseDown}
      >
        <div
          className="flex items-center gap-2 window-controls"
          onMouseEnter={() => setShowIcons(true)}
          onMouseLeave={() => setShowIcons(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose?.();
            }}
            className={`${controlSize.button} rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow-sm flex items-center justify-center`}
            aria-label="Close"
          >
            {showIcons && <FaTimes className="text-red-900" size={controlSize.icon} />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize?.();
            }}
            className={`${controlSize.button} rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors shadow-sm flex items-center justify-center`}
            aria-label="Minimize"
          >
            {showIcons && <FaMinus className="text-yellow-900" size={controlSize.icon} />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize?.();
            }}
            className={`${controlSize.button} rounded-full bg-green-500 hover:bg-green-600 transition-colors shadow-sm flex items-center justify-center`}
            aria-label="Maximize"
          >
            {showIcons && (maximized ? <FaCompress className="text-green-900" size={controlSize.icon} /> : <FaExpand className="text-green-900" size={controlSize.icon} />)}
          </button>
        </div>
        <div className="flex-1 text-center">
          <div className={`${uiScale.titleText} text-stone-700 font-medium select-none`}>
            {title}
          </div>
        </div>
        <div className="w-16" />
      </div>

      {/* Metadata Bar (if file has metadata) */}
      {(fileMetadata.size || fileMetadata.modified || fileMetadata.language || fileMetadata.isPDF) && (
        <div className="px-4 py-2 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-xs font-mono text-stone-500">
          <div className="flex items-center gap-4">
            {fileMetadata.size && <span>{fileMetadata.size}</span>}
            {fileMetadata.modified && <span>modified {fileMetadata.modified}</span>}
            {fileMetadata.language && <span>{fileMetadata.language}</span>}
          </div>
          {fileMetadata.isPDF && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded text-xs transition-colors"
              >
                <FaDownload size={10} />
                Download
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded text-xs transition-colors"
              >
                <FaShareAlt size={10} />
                {copied ? 'Copied!' : 'Share'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className={`${(fileMetadata.size || fileMetadata.modified || fileMetadata.language || fileMetadata.isPDF) ? 'h-[calc(100%-6rem)]' : 'h-[calc(100%-2.5rem)]'} ${fileMetadata.isPDF ? 'overflow-hidden' : 'overflow-auto'} bg-white`} style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>

      {/* Resize Handles - only show on desktop when not maximized */}
      {!maximized && !isTablet && (
        <>
          {/* Right edge resize */}
          <div
            onMouseDown={(e) => handleResizeStart(e, 'e')}
            className="absolute right-0 top-10 bottom-10 w-2 cursor-ew-resize hover:bg-orange-400/20 transition-all"
            style={{ zIndex: 100 }}
          />
          {/* Bottom edge resize */}
          <div
            onMouseDown={(e) => handleResizeStart(e, 's')}
            className="absolute left-10 right-10 bottom-0 h-2 cursor-ns-resize hover:bg-orange-400/20 transition-all"
            style={{ zIndex: 100 }}
          />
          {/* Corner resize */}
          <div
            onMouseDown={(e) => handleResizeStart(e, 'se')}
            className="absolute right-0 bottom-0 w-6 h-6 cursor-nwse-resize group"
            style={{ zIndex: 100 }}
          >
            <div className="absolute right-0.5 bottom-0.5 w-1 h-1 rounded-full bg-orange-400/40 group-hover:bg-orange-400/80 transition-colors" />
          </div>
        </>
      )}
    </motion.div>
  );
}
