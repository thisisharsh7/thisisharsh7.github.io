import { useEffect, useRef, useState } from 'react';

export default function Guestbook() {
  const commentsRef = useRef(null);
  const [contentScale, setContentScale] = useState({
    prose: 'prose',
    padding: 'p-8',
    maxWidth: 'max-w-3xl',
    headingSize: 'text-2xl'
  });

  // Responsive scaling matching WindowContent.js pattern
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width >= 2560) {
        // 4K+
        setContentScale({
          prose: 'prose prose-lg',
          padding: 'p-12',
          maxWidth: 'max-w-5xl',
          headingSize: 'text-3xl'
        });
      } else if (width >= 1920) {
        // Large desktop
        setContentScale({
          prose: 'prose prose-lg',
          padding: 'p-10',
          maxWidth: 'max-w-4xl',
          headingSize: 'text-2xl'
        });
      } else if (width >= 1440) {
        // Standard large
        setContentScale({
          prose: 'prose',
          padding: 'p-9',
          maxWidth: 'max-w-3xl',
          headingSize: 'text-2xl'
        });
      } else {
        // Standard
        setContentScale({
          prose: 'prose',
          padding: 'p-8',
          maxWidth: 'max-w-3xl',
          headingSize: 'text-2xl'
        });
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    // Remove existing giscus script if present
    const existingScript = document.querySelector('script[src*="giscus"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Clear container
    if (commentsRef.current) {
      commentsRef.current.innerHTML = '';
    }

    // Create and configure the Giscus script
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'thisisharsh7/thisisharsh7.github.io');
    script.setAttribute('data-repo-id', 'R_kgDOIJbhKw');
    script.setAttribute('data-category', 'Guestbook');
    script.setAttribute('data-category-id', 'DIC_kwDOIJbhK84C26Mg');
    script.setAttribute('data-mapping', 'specific');
    script.setAttribute('data-term', 'guestbook');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', 'light');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    // Append script to the comments container
    if (commentsRef.current) {
      commentsRef.current.appendChild(script);
    }

    return () => {
      // Cleanup on unmount
      const container = commentsRef.current;
      if (container) {
        // Use a more gentle cleanup to avoid React warnings
        const iframe = container.querySelector('iframe.giscus-frame');
        if (iframe) {
          iframe.remove();
        }
      }
    };
  }, []);

  return (
    <div className={`${contentScale.padding} ${contentScale.maxWidth} mx-auto`}>
      <div className={`${contentScale.prose} prose-stone mb-8`}>
        <h2 className={`${contentScale.headingSize} font-medium mb-6 text-stone-800`}>
          Guestbook
        </h2>
        <p className="text-stone-600 mb-4">
          Leave a comment below. Share your thoughts, say hi, or let me know what you're working on.
        </p>
        <p className="text-sm text-stone-500 mb-6">
          Sign in with your GitHub account to leave a comment. Your comment will be visible to everyone.
        </p>
      </div>

      <div ref={commentsRef} className="giscus-container" />
    </div>
  );
}
