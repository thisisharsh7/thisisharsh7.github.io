import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { AnimatePresence, motion } from 'framer-motion';
import { FaFile, FaFolder, FaFilePdf, FaCode, FaTerminal } from 'react-icons/fa';
import MenuBar from '../components/MenuBar';
import FileIcon from '../components/FileIcon';
import Window from '../components/Window';
import WindowContent from '../components/WindowContent';
import Toolbar from '../components/Toolbar';
import { filesystem } from '../constants/filesystem';
import { getMenuBarHeight } from '../utils/constants';

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState([]);
  const [windowZIndex, setWindowZIndex] = useState(10);
  const [iconPositions, setIconPositions] = useState({});
  const [mouseY, setMouseY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [desktopPadding, setDesktopPadding] = useState(24);
  const hasAutoOpened = useRef(false);

  // Helper function to get file icon
  const getFileIcon = (item, size = 32) => {
    if (item.type === 'folder') {
      return <FaFolder className="text-orange-500" size={size} />;
    }
    if (item.name.endsWith('.pdf')) {
      return <FaFilePdf className="text-red-600" size={size} />;
    }
    if (item.name.endsWith('.sh')) {
      return <FaTerminal className="text-green-700" size={size} />;
    }
    if (item.name.endsWith('.md')) {
      return <FaCode className="text-stone-600" size={size} />;
    }
    if (item.name.endsWith('.txt')) {
      return <FaFile className="text-stone-500" size={size} />;
    }
    return <FaFile className="text-stone-600" size={size} />;
  };

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Update desktop padding to match responsive menu bar height
  useEffect(() => {
    const updateDesktopPadding = () => {
      setDesktopPadding(getMenuBarHeight(window.innerWidth));
    };

    updateDesktopPadding();
    window.addEventListener('resize', updateDesktopPadding);
    return () => window.removeEventListener('resize', updateDesktopPadding);
  }, []);

  // Auto-open key files on initial load (desktop only)
  useEffect(() => {
    // Prevent running more than once
    if (hasAutoOpened.current) return;
    if (typeof window === 'undefined') return;

    // Only auto-open on desktop, not mobile/tablet
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    // Mark as opened immediately to prevent re-runs
    hasAutoOpened.current = true;

    // Create all windows at once to avoid race conditions
    setTimeout(() => {
      const readmeFile = filesystem.children.find(f => f.name === 'README.txt');
      const nowFile = filesystem.children.find(f => f.name === 'now.md');
      const projectsFolder = filesystem.children.find(f => f.name === 'projects');

      const initialWindows = [];
      let zIndex = 11;

      if (readmeFile) {
        initialWindows.push({
          id: Date.now(),
          file: readmeFile,
          x: 120,
          y: 90,
          zIndex: zIndex++,
          minimized: false,
          maximized: false,
          originalSize: null
        });
      }

      if (nowFile) {
        initialWindows.push({
          id: Date.now() + 1,
          file: nowFile,
          x: 480,
          y: 120,
          zIndex: zIndex++,
          minimized: false,
          maximized: false,
          originalSize: null
        });
      }

      if (projectsFolder) {
        initialWindows.push({
          id: Date.now() + 2,
          file: projectsFolder,
          x: 840,
          y: 150,
          zIndex: zIndex++,
          minimized: false,
          maximized: false,
          originalSize: null
        });
      }

      setOpenWindows(initialWindows);
      setWindowZIndex(zIndex);
    }, 100);
  }, []); // Empty array - only run once on mount

  // Track mouse position for auto-hiding menu bar
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleFileOpen = (file, x = 100, y = 100) => {
    const existingWindow = openWindows.find(w => w.file.name === file.name);

    if (existingWindow) {
      if (existingWindow.minimized) {
        handleWindowRestore(existingWindow.id);
      } else {
        handleWindowFocus(existingWindow.id);
      }
      return;
    }

    const newWindow = {
      id: Date.now(),
      file,
      x: x + openWindows.length * 30,
      y: y + openWindows.length * 30,
      zIndex: windowZIndex + 1,
      minimized: false,
      maximized: false,
      originalSize: null
    };

    setOpenWindows([...openWindows, newWindow]);
    setWindowZIndex(windowZIndex + 1);
  };

  const handleWindowClose = (windowId) => {
    setOpenWindows(openWindows.filter(w => w.id !== windowId));
  };

  const handleWindowFocus = (windowId) => {
    // Find the current max z-index among all windows
    const maxZIndex = Math.max(...openWindows.map(w => w.zIndex), 10);

    // If we've hit the cap, reorder all windows' z-indices
    if (maxZIndex >= 39) {
      // Sort windows by current z-index
      const sortedWindows = [...openWindows].sort((a, b) => a.zIndex - b.zIndex);

      // Reassign z-indices starting from 10
      let newZIndex = 10;
      const reorderedWindows = openWindows.map(w => {
        const sortedIndex = sortedWindows.findIndex(sw => sw.id === w.id);
        // The focused window gets the highest z-index
        if (w.id === windowId) {
          return { ...w, zIndex: 10 + sortedWindows.length };
        }
        return { ...w, zIndex: 10 + sortedIndex };
      });

      setOpenWindows(reorderedWindows);
      setWindowZIndex(10 + sortedWindows.length);
    } else {
      // Normal case: just increment z-index
      const newZIndex = maxZIndex + 1;
      setOpenWindows(openWindows.map(w =>
        w.id === windowId ? { ...w, zIndex: newZIndex } : w
      ));
      setWindowZIndex(newZIndex);
    }
  };

  const handleWindowMinimize = (windowId) => {
    setOpenWindows(openWindows.map(w =>
      w.id === windowId ? { ...w, minimized: true } : w
    ));
  };

  const handleWindowRestore = (windowId) => {
    // Find the current max z-index among all windows
    const maxZIndex = Math.max(...openWindows.map(w => w.zIndex), 10);

    // Ensure position is within bounds - use responsive menu bar height
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 768;
    const menuBarHeight = getMenuBarHeight(screenWidth);
    const toolbarHeight = 32;
    const win = openWindows.find(w => w.id === windowId);
    const safeX = Math.max(0, Math.min(screenWidth - 200, win?.x || 100));
    const safeY = Math.max(menuBarHeight, Math.min(screenHeight - toolbarHeight - 100, win?.y || 100));

    // If we've hit the cap, reorder all windows' z-indices
    if (maxZIndex >= 39) {
      const sortedWindows = [...openWindows].sort((a, b) => a.zIndex - b.zIndex);
      const reorderedWindows = openWindows.map(w => {
        const sortedIndex = sortedWindows.findIndex(sw => sw.id === w.id);
        if (w.id === windowId) {
          return { ...w, minimized: false, zIndex: 10 + sortedWindows.length, x: safeX, y: safeY };
        }
        return { ...w, zIndex: 10 + sortedIndex };
      });
      setOpenWindows(reorderedWindows);
      setWindowZIndex(10 + sortedWindows.length);
    } else {
      // Normal case
      const newZIndex = maxZIndex + 1;
      setOpenWindows(openWindows.map(w =>
        w.id === windowId ? { ...w, minimized: false, zIndex: newZIndex, x: safeX, y: safeY } : w
      ));
      setWindowZIndex(newZIndex);
    }
  };

  const handleWindowMaximize = (windowId) => {
    setOpenWindows(openWindows.map(w => {
      if (w.id === windowId) {
        if (w.maximized) {
          // Restore to original size
          return {
            ...w,
            maximized: false,
            ...(w.originalSize || {})
          };
        } else {
          // Save current size and maximize
          return {
            ...w,
            maximized: true,
            originalSize: {
              x: w.x,
              y: w.y,
              width: w.width,
              height: w.height
            }
          };
        }
      }
      return w;
    }));
  };

  const handleWindowResize = (windowId, width, height) => {
    setOpenWindows(openWindows.map(w =>
      w.id === windowId ? { ...w, width, height } : w
    ));
  };

  const handleIconDrag = (name, position) => {
    setIconPositions(prev => ({
      ...prev,
      [name]: position
    }));
  };

  // Mobile card view
  if (isMobile) {
    return (
      <>
        <Head>
          <title>Harsh Kumar</title>
          <meta name="description" content="I build software for the web. Currently working on Epicenter and Cognee." />
          <meta name="keywords" content="Harsh Kumar, Software Engineer, Full-Stack Developer, React, Next.js, Node.js, TypeScript, Python" />
          <link rel="canonical" href="https://dev-harsh.vercel.app/" />
          <meta property="og:title" content="Harsh Kumar" />
          <meta property="og:description" content="I build software for the web. Currently working on Epicenter and Cognee." />
          <meta property="og:url" content="https://dev-harsh.vercel.app/" />
          <meta name="twitter:title" content="Harsh Kumar" />
          <meta name="twitter:description" content="I build software for the web." />
        </Head>

        <div className="h-screen w-screen overflow-y-auto overflow-x-hidden bg-stone-50 font-sans">
          {/* Mobile Header */}
          <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-stone-200 px-4 py-3">
            <h1 className="text-lg font-semibold text-stone-800">Harsh Kumar</h1>
          </div>

          {/* Mobile Content - Cards with bottom padding for toolbar */}
          <div className="p-4 space-y-3 pb-20">
            {filesystem.children.map((item) => (
              <button
                key={item.name}
                onClick={() => handleFileOpen(item)}
                className="w-full bg-white rounded-xl p-4 shadow-sm border border-stone-200 hover:shadow-md transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {getFileIcon(item, 32)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-stone-800">{item.name}</div>
                    {item.size && <div className="text-xs text-stone-500 mt-0.5">{item.size}</div>}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Mobile Window - Full Screen */}
          <AnimatePresence>
            {openWindows.filter(w => !w.minimized).map((win) => (
              <motion.div
                key={win.id}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-0 z-50 bg-white flex flex-col"
              >
                {/* Mobile Window Header */}
                <div className="sticky top-0 bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between">
                  <h2 className="text-base font-medium text-stone-800">{win.file.name}</h2>
                  <div className="flex items-center gap-2">
                    {win.file.isPDF && (
                      <a
                        href="/doc/HARSH_KUMAR_2026_resume.pdf"
                        download="Harsh_Kumar_Resume.pdf"
                        className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center hover:bg-orange-200 transition-colors text-orange-600"
                        title="Download PDF"
                      >
                        ↓
                      </a>
                    )}
                    <button
                      onClick={() => handleWindowClose(win.id)}
                      className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center hover:bg-stone-200 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Mobile Window Content */}
                <div className="flex-1 overflow-auto">
                  <WindowContent
                    file={win.file}
                    onFileOpen={(file) => handleFileOpen(file)}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Mobile Toolbar */}
          <Toolbar
            openWindows={openWindows}
            onWindowRestore={handleWindowRestore}
            onWindowFocus={handleWindowFocus}
            activeWindowId={openWindows.find(w => !w.minimized && w.zIndex === Math.max(...openWindows.map(win => win.zIndex)))?.id}
            isMobile={true}
          />
        </div>
      </>
    );
  }

  // Desktop & Tablet view
  return (
    <>
      <Head>
        <title>Harsh Kumar</title>
        <meta name="description" content="I build software for the web. Currently working on Epicenter and Cognee." />
        <meta name="keywords" content="Harsh Kumar, Software Engineer, Full-Stack Developer, React, Next.js, Node.js, TypeScript, Python" />
        <link rel="canonical" href="https://dev-harsh.vercel.app/" />
        <meta property="og:title" content="Harsh Kumar" />
        <meta property="og:description" content="I build software for the web. Currently working on Epicenter and Cognee." />
        <meta property="og:url" content="https://dev-harsh.vercel.app/" />
        <meta name="twitter:title" content="Harsh Kumar" />
        <meta name="twitter:description" content="I build software for the web." />
      </Head>

      <div className="h-screen w-screen overflow-hidden font-sans select-none">
        <MenuBar
          mouseY={mouseY}
          hasMaximizedWindow={openWindows.some(w => w.maximized)}
        />

        {/* Desktop Area */}
        <div className="h-full relative" style={{ paddingTop: `${desktopPadding}px` }}>
          {/* Desktop Icons - Only show on desktop, not tablet */}
          {!isTablet && (
            <div className="relative h-full p-4">
              {filesystem.children.map((item, index) => {
                const defaultPos = item.desktopPosition || { x: 20, y: 20 + index * 80 };
                const pos = iconPositions[item.name] || defaultPos;
                return (
                  <FileIcon
                    key={item.name}
                    name={item.name}
                    type={item.type}
                    x={pos.x}
                    y={pos.y}
                    onClick={() => handleFileOpen(item, 120 + index * 35, 90 + index * 28)}
                    onDrag={handleIconDrag}
                  />
                );
              })}
            </div>
          )}

          {/* Tablet - Show launcher grid */}
          {isTablet && (
            <div className="h-full overflow-auto p-8">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-stone-800 mb-6">Harsh Kumar</h2>
                <div className="grid grid-cols-3 gap-4">
                  {filesystem.children.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleFileOpen(item)}
                      className="bg-white rounded-xl p-6 shadow-sm border border-stone-200 hover:shadow-md transition-all"
                    >
                      <div className="mb-3 flex justify-center">
                        {getFileIcon(item, 48)}
                      </div>
                      <div className="font-medium text-stone-800 text-sm">{item.name}</div>
                      {item.size && <div className="text-xs text-stone-500 mt-1">{item.size}</div>}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Windows */}
          <AnimatePresence>
            {openWindows.map((win) => {
              // Determine window size based on screen size
              const getResponsiveWindowSize = () => {
                if (typeof window === 'undefined') return { width: 800, height: 600 };

                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;

                if (win.maximized) {
                  // Calculate responsive menu bar height
                  const menuBarHeight = getMenuBarHeight(screenWidth);

                  return {
                    width: screenWidth,
                    height: screenHeight - menuBarHeight
                  };
                }

                // Large screens (1920px+): Bigger default windows
                if (screenWidth >= 1920) {
                  return {
                    width: win.width || (win.file.type === 'folder' ? 900 : 1000),
                    height: win.height || (win.file.type === 'folder' ? 650 : 750)
                  };
                }

                // Desktop (1440px-1919px): Standard large
                if (screenWidth >= 1440) {
                  return {
                    width: win.width || (win.file.type === 'folder' ? 800 : 900),
                    height: win.height || (win.file.type === 'folder' ? 600 : 700)
                  };
                }

                // Desktop (1024px-1439px): Standard
                if (screenWidth >= 1024) {
                  return {
                    width: win.width || (win.file.type === 'folder' ? 700 : 800),
                    height: win.height || (win.file.type === 'folder' ? 500 : 600)
                  };
                }

                // Tablet (768px-1023px): Smaller windows, centered
                return {
                  width: Math.min(screenWidth - 40, win.width || 600),
                  height: Math.min(screenHeight - 100, win.height || 500)
                };
              };

              const { width, height } = getResponsiveWindowSize();

              // Position windows - center on tablet, normal on desktop
              const getResponsivePosition = () => {
                if (typeof window === 'undefined') return { x: 100, y: 100 };

                if (win.maximized) {
                  // Calculate responsive menu bar height
                  const menuBarHeight = getMenuBarHeight(window.innerWidth);

                  return {
                    x: 0,
                    y: menuBarHeight
                  };
                }

                // Tablet: Center windows
                if (isTablet) {
                  return {
                    x: (window.innerWidth - width) / 2,
                    y: (window.innerHeight - height) / 2
                  };
                }

                return { x: win.x, y: win.y };
              };

              const { x, y } = getResponsivePosition();

              return (
                <Window
                  key={win.id}
                  title={win.file.name}
                  initialX={x}
                  initialY={y}
                  width={width}
                  height={height}
                  zIndex={win.maximized ? 45 : win.zIndex}
                  onClose={() => handleWindowClose(win.id)}
                  onFocus={() => handleWindowFocus(win.id)}
                  onMinimize={() => handleWindowMinimize(win.id)}
                  onMaximize={() => handleWindowMaximize(win.id)}
                  onResize={(width, height) => handleWindowResize(win.id, width, height)}
                  terminal={win.file.terminal}
                  fileMetadata={win.file}
                  minimized={win.minimized}
                  maximized={win.maximized}
                  isTablet={isTablet}
                >
                  <WindowContent
                    file={win.file}
                    onFileOpen={(file) => handleFileOpen(file, win.x + 50, win.y + 50)}
                  />
                </Window>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Toolbar */}
        <Toolbar
          openWindows={openWindows}
          onWindowRestore={handleWindowRestore}
          onWindowFocus={handleWindowFocus}
          activeWindowId={openWindows.find(w => !w.minimized && w.zIndex === Math.max(...openWindows.map(win => win.zIndex)))?.id}
        />
      </div>
    </>
  );
}
