import { FaFile, FaFolder, FaTerminal, FaCode, FaCube } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PDFViewer from './PDFViewer';
import ProjectContent from './ProjectContent';
import Guestbook from './Guestbook';

const FileIconInline = ({ name, type, language, onClick, initialX, initialY, onDrag, containerRef, isSelected, onSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: initialX || 0, y: initialY || 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragDidOccur, setDragDidOccur] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const clickTimerRef = useRef(null);
  const tooltipTimerRef = useRef(null);
  const [uiScale, setUiScale] = useState({
    iconSize: 40,
    appIconContainer: 'w-10 h-10',
    appIconSize: 20,
    githubContainer: 'w-10 h-10',
    githubIconSize: 'w-5 h-5',
    textSize: 'text-xs',
    textMaxWidth: 'max-w-24'
  });

  // Scale icons based on screen size
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width >= 2560) {
        // 4K+
        setUiScale({
          iconSize: 56,
          appIconContainer: 'w-14 h-14',
          appIconSize: 28,
          githubContainer: 'w-14 h-14',
          githubIconSize: 'w-7 h-7',
          textSize: 'text-sm',
          textMaxWidth: 'max-w-32'
        });
      } else if (width >= 1920) {
        // Large desktop
        setUiScale({
          iconSize: 48,
          appIconContainer: 'w-12 h-12',
          appIconSize: 24,
          githubContainer: 'w-12 h-12',
          githubIconSize: 'w-6 h-6',
          textSize: 'text-xs',
          textMaxWidth: 'max-w-28'
        });
      } else if (width >= 1440) {
        // Standard large
        setUiScale({
          iconSize: 44,
          appIconContainer: 'w-11 h-11',
          appIconSize: 22,
          githubContainer: 'w-11 h-11',
          githubIconSize: 'w-6 h-6',
          textSize: 'text-xs',
          textMaxWidth: 'max-w-24'
        });
      } else {
        // Standard
        setUiScale({
          iconSize: 40,
          appIconContainer: 'w-10 h-10',
          appIconSize: 20,
          githubContainer: 'w-10 h-10',
          githubIconSize: 'w-5 h-5',
          textSize: 'text-xs',
          textMaxWidth: 'max-w-24'
        });
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragDidOccur(false);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    setDragDidOccur(true);

    let newX = e.clientX - dragStart.x;
    let newY = e.clientY - dragStart.y;

    // Constrain to container bounds
    if (containerRef?.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const iconWidth = 100; // approximate icon width
      const iconHeight = 80; // approximate icon height

      newX = Math.max(0, Math.min(containerRect.width - iconWidth, newX));
      newY = Math.max(0, Math.min(containerRect.height - iconHeight, newY));
    }

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (onDrag) {
      onDrag(name, position);
    }
  };

  const handleClick = () => {
    if (dragDidOccur) return;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      onSelect?.(name);
      setShowTooltip(true);

      // Hide tooltip after 1 second
      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
      tooltipTimerRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, 1000);
    }, 250);
  };

  const handleDoubleClick = (e) => {
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
    }
    if (tooltipTimerRef.current) {
      clearTimeout(tooltipTimerRef.current);
      tooltipTimerRef.current = null;
    }
    setShowTooltip(false);
    onSelect?.(null); // Clear selection on double-click
    if (!isDragging && !dragDidOccur && onClick) {
      onClick();
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
    if (initialX !== undefined && initialY !== undefined) {
      setPosition({ x: initialX, y: initialY });
    }
  }, [initialX, initialY]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
      if (tooltipTimerRef.current) {
        clearTimeout(tooltipTimerRef.current);
      }
    };
  }, []);

  // Reset tooltip when selection changes
  useEffect(() => {
    if (!isSelected) {
      setShowTooltip(false);
      if (tooltipTimerRef.current) {
        clearTimeout(tooltipTimerRef.current);
      }
    }
  }, [isSelected]);

  const getIcon = () => {
    if (type === 'folder') {
      return <FaFolder className="text-orange-500" size={uiScale.iconSize} />;
    }
    if (name.endsWith('.sh')) {
      return <FaTerminal className="text-green-700" size={uiScale.iconSize} />;
    }
    if (name.endsWith('.md')) {
      // Project files get app-style icons
      if (name.includes('seeva') || name.includes('ccux') || name.includes('alertframe')) {
        const colors = {
          'seeva-ai-assistant.md': 'bg-orange-50 border-orange-300',
          'ccux.md': 'bg-orange-100 border-orange-400',
          'alertframe.md': 'bg-blue-50 border-blue-300'
        };
        const color = colors[name] || 'bg-stone-100 border-stone-400';

        return (
          <div className={`${uiScale.appIconContainer} rounded-lg ${color} border-2 flex items-center justify-center shadow-sm`}>
            <FaCube className="text-orange-500" size={uiScale.appIconSize} />
          </div>
        );
      }
      // Open source files get GitHub-style icons with stars
      if (name.includes('epicenter') || name.includes('cocoindex') || name.includes('codebuff')) {
        return (
          <div className={`${uiScale.githubContainer} rounded-lg bg-stone-800 border-2 border-stone-700 flex items-center justify-center shadow-sm`}>
            <svg className={`${uiScale.githubIconSize} text-white`} fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </div>
        );
      }
      return <FaCode className="text-stone-600" size={uiScale.iconSize} />;
    }
    return <FaFile className="text-stone-600" size={uiScale.iconSize} />;
  };

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      className={`absolute flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-stone-50 transition-colors ${isDragging ? 'cursor-grabbing' : 'cursor-default'} ${isSelected ? 'ring-2 ring-orange-400/60 ring-offset-2' : ''}`}
      style={{ left: position.x, top: position.y }}
    >
      <div className="flex flex-col items-center gap-2 select-none">
        {getIcon()}
        <div className="flex flex-col items-center">
          <span className={`${uiScale.textSize} text-stone-700 font-mono ${uiScale.textMaxWidth} truncate text-center`}>
            {name}
          </span>
          {language && (
            <span className={`${uiScale.textSize} font-mono text-stone-500 mt-0.5`}>
              {language.split(',')[0].trim()}
            </span>
          )}
        </div>
      </div>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-1 px-2 py-1 bg-stone-800 text-white text-xs rounded whitespace-nowrap pointer-events-none z-50 shadow-lg"
          >
            Double click to open
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function WindowContent({ file, onFileOpen, selectedIcon, onIconSelect }) {
  const [filePositions, setFilePositions] = useState({});
  const containerRef = useRef(null);
  const [contentScale, setContentScale] = useState({
    prose: 'prose',
    padding: 'p-8',
    maxWidth: 'max-w-3xl',
    shellText: 'text-sm',
    shellPadding: 'p-4',
    linkPadding: 'px-6 pb-4 pt-3',
    linkText: 'text-sm'
  });

  // Scale content based on screen size
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width >= 2560) {
        // 4K+
        setContentScale({
          prose: 'prose prose-lg',
          padding: 'p-12',
          maxWidth: 'max-w-5xl',
          shellText: 'text-base',
          shellPadding: 'p-6',
          linkPadding: 'px-8 pb-6 pt-4',
          linkText: 'text-base'
        });
      } else if (width >= 1920) {
        // Large desktop
        setContentScale({
          prose: 'prose prose-lg',
          padding: 'p-10',
          maxWidth: 'max-w-4xl',
          shellText: 'text-base',
          shellPadding: 'p-5',
          linkPadding: 'px-7 pb-5 pt-4',
          linkText: 'text-sm'
        });
      } else if (width >= 1440) {
        // Standard large
        setContentScale({
          prose: 'prose',
          padding: 'p-9',
          maxWidth: 'max-w-3xl',
          shellText: 'text-sm',
          shellPadding: 'p-5',
          linkPadding: 'px-6 pb-4 pt-3',
          linkText: 'text-sm'
        });
      } else {
        // Standard
        setContentScale({
          prose: 'prose',
          padding: 'p-8',
          maxWidth: 'max-w-3xl',
          shellText: 'text-sm',
          shellPadding: 'p-4',
          linkPadding: 'px-6 pb-4 pt-3',
          linkText: 'text-sm'
        });
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  if (file.isPDF) {
    return <PDFViewer />;
  }

  if (file.isGuestbook) {
    return <Guestbook />;
  }

  if (file.type === 'folder') {
    const githubLinks = {
      'projects': 'https://github.com/stars/thisisharsh7/lists/projects-i-built',
      'open-source': 'https://github.com/stars/thisisharsh7/lists/open-source-contributions'
    };

    const handleItemClick = (child) => {
      // Open all files in windows (no redirect)
      if (file.name === 'projects') {
        onFileOpen(child);
      } else {
        // For open-source or other folders, open the file normally
        onFileOpen(child);
      }
    };

    const handleDrag = (name, position) => {
      setFilePositions(prev => ({
        ...prev,
        [name]: position
      }));
    };

    const handleDeselectInFolder = (e) => {
      if (e.target === e.currentTarget && onIconSelect) {
        onIconSelect(null);
      }
    };

    // Default grid positions
    const getDefaultPosition = (index) => {
      const cols = 4;
      const row = Math.floor(index / cols);
      const col = index % cols;
      return {
        x: 30 + col * 140,
        y: 20 + row * 120
      };
    };

    return (
      <div className="h-full flex flex-col">
        <div ref={containerRef} className="flex-1 relative overflow-auto p-6" onMouseDown={handleDeselectInFolder}>
          {file.children?.map((child, index) => {
            const defaultPos = getDefaultPosition(index);
            const position = filePositions[child.name] || defaultPos;

            return (
              <FileIconInline
                key={child.name}
                name={child.name}
                type={child.type}
                language={child.language}
                onClick={() => handleItemClick(child)}
                initialX={position.x}
                initialY={position.y}
                onDrag={handleDrag}
                containerRef={containerRef}
                isSelected={selectedIcon === child.name}
                onSelect={onIconSelect}
              />
            );
          })}
        </div>

        {githubLinks[file.name] && (
          <div className={`${contentScale.linkPadding} border-t border-stone-200`}>
            <a
              href={githubLinks[file.name]}
              target="_blank"
              rel="noopener noreferrer"
              className={`${contentScale.linkText} text-stone-600 hover:text-stone-800 underline`}
            >
              See all on GitHub →
            </a>
          </div>
        )}
      </div>
    );
  }

  // Project files with screenshots use ProjectContent component
  if (file.name.endsWith('.md') && file.screenshots) {
    return <ProjectContent file={file} />;
  }

  if (file.name.endsWith('.txt') || file.name.endsWith('.md')) {
    return (
      <div className={`${contentScale.padding} ${contentScale.maxWidth} mx-auto`}>
        <div className={`${contentScale.prose} prose-stone`}>
          <div
            className="text-stone-700 font-sans leading-relaxed"
            dangerouslySetInnerHTML={{ __html: file.content }}
          />
        </div>
      </div>
    );
  }

  if (file.name.endsWith('.sh')) {
    return (
      <div className={contentScale.shellPadding}>
        <pre className={`text-green-600 whitespace-pre-wrap font-mono ${contentScale.shellText} leading-relaxed`}>
          {file.content}
        </pre>
      </div>
    );
  }

  return (
    <div className="p-8 text-stone-500">
      <p>Unable to display this file type.</p>
    </div>
  );
}
