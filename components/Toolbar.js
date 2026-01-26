import { FaFile, FaFolder, FaTerminal, FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import SocialPreviewCard from './SocialPreviewCard';

export default function Toolbar({ openWindows, onWindowRestore, onWindowFocus, activeWindowId, isMobile = false }) {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [uiScale, setUiScale] = useState({
    iconSize: 14,
    height: 'h-7',
    textSize: 'text-xs',
    padding: 'px-3 py-1',
    gap: 'gap-2'
  });

  // Scale toolbar based on screen size - slightly taller than menu bar for click targets
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width >= 2560) {
        // 4K+ - h-9 (36px), only 4px taller than MenuBar h-8 (32px)
        setUiScale({
          iconSize: 18,
          height: 'h-9',
          textSize: 'text-sm',
          padding: 'px-4 py-1.5',
          gap: 'gap-3'
        });
      } else if (width >= 1920) {
        // Large - h-8 (32px), only 4px taller than MenuBar h-7 (28px)
        setUiScale({
          iconSize: 16,
          height: 'h-8',
          textSize: 'text-sm',
          padding: 'px-3.5 py-1',
          gap: 'gap-2.5'
        });
      } else {
        // Standard - h-7 (28px), only 4px taller than MenuBar h-6 (24px)
        setUiScale({
          iconSize: 14,
          height: 'h-7',
          textSize: 'text-xs',
          padding: 'px-3 py-1',
          gap: 'gap-2'
        });
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const getIcon = (file) => {
    if (file.terminal) {
      return <FaTerminal className="text-green-700" size={uiScale.iconSize} />;
    }
    if (file.type === 'folder') {
      return <FaFolder className="text-orange-500" size={uiScale.iconSize} />;
    }
    return <FaFile className="text-stone-600" size={uiScale.iconSize} />;
  };

  const minimizedWindows = openWindows.filter(w => w.minimized);

  const socialLinks = [
    {
      id: 'github',
      icon: FaGithub,
      url: 'https://github.com/thisisharsh7',
      label: 'GitHub',
      color: 'text-stone-700 hover:text-stone-900',
      preview: {
        title: 'thisisharsh7 (Harsh Kumar)',
        url: 'github.com/thisisharsh7',
        description: '577 contributions in the last year • Maintainer @ epicenter (YC S25) • Building seeva-ai-assistant, alertframe, snorlax',
        icon: FaGithub,
        gradient: 'bg-gradient-to-br from-stone-800 to-stone-900'
      }
    },
    {
      id: 'linkedin',
      icon: FaLinkedin,
      url: 'https://linkedin.com/in/thisisharsh7',
      label: 'LinkedIn',
      color: 'text-blue-600 hover:text-blue-700',
      preview: {
        title: 'Harsh Kumar | LinkedIn',
        url: 'linkedin.com/in/thisisharsh7',
        description: 'Software Engineer • AI Tools & Open Source • Maintainer @ epicenter (YC S25) • 500+ connections',
        icon: FaLinkedin,
        gradient: 'bg-gradient-to-br from-blue-600 to-blue-700'
      }
    },
    {
      id: 'twitter',
      icon: FaTwitter,
      url: 'https://twitter.com/thisisharsh7',
      label: 'Twitter',
      color: 'text-blue-400 hover:text-blue-500',
      preview: {
        title: 'Harsh Kumar (@thisisharsh7) / X',
        url: 'twitter.com/thisisharsh7',
        description: 'Software Engineer • Building tools that matter • Thoughts on systems, maintenance, and getting things done',
        icon: FaTwitter,
        gradient: 'bg-gradient-to-br from-blue-400 to-blue-500'
      }
    },
    {
      id: 'email',
      icon: FaEnvelope,
      url: 'mailto:harsh@example.com',
      label: 'Email',
      color: 'text-orange-500 hover:text-orange-600',
      preview: {
        title: 'Email Harsh Kumar',
        url: 'harsh@example.com',
        description: 'Get in touch for collaborations, questions, or just to say hi.',
        icon: FaEnvelope,
        gradient: 'bg-gradient-to-br from-orange-500 to-orange-600'
      }
    }
  ];

  // Mobile toolbar - Simplified
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-stone-200 z-40 shadow-lg">
        <div className="flex items-center justify-around py-3 px-4">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} transition-colors`}
              title={link.label}
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    );
  }

  // Desktop toolbar
  return (
    <div className={`fixed bottom-0 left-0 right-0 ${uiScale.height} bg-white/80 backdrop-blur-xl border-t border-stone-200 flex items-center px-3 z-40 shadow-sm`}>
      {/* Left side - Minimized windows */}
      <div className={`flex items-center ${uiScale.gap} overflow-x-auto`}>
        {minimizedWindows.map((window) => (
          <button
            key={window.id}
            onClick={() => onWindowRestore(window.id)}
            className={`flex items-center ${uiScale.gap} ${uiScale.padding} my-1 rounded-lg bg-stone-100 hover:bg-stone-200 transition-colors border border-stone-300 flex-shrink-0`}
          >
            {getIcon(window.file)}
            <span className={`${uiScale.textSize} text-stone-700 font-medium max-w-32 truncate`}>
              {window.file.name}
            </span>
          </button>
        ))}
      </div>

      {/* Right side - Social links */}
      <div className={`ml-auto flex items-center ${uiScale.gap}`}>
        {socialLinks.map((link, index) => (
          <div
            key={link.id}
            className="relative"
            onMouseEnter={() => setHoveredLink(link.id)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} transition-colors block`}
              title={link.label}
            >
              <link.icon size={uiScale.iconSize} />
            </a>

            <SocialPreviewCard
              isVisible={hoveredLink === link.id}
              preview={link.preview}
              position={index >= socialLinks.length / 2 ? 'right' : 'left'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
