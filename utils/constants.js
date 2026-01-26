/**
 * Get the responsive menu bar height based on screen width
 * @param {number} screenWidth - The current screen width in pixels
 * @returns {number} - The menu bar height in pixels (24, 28, or 32)
 */
export const getMenuBarHeight = (screenWidth) => {
  if (screenWidth >= 2560) return 32;  // h-8 for 4K+ screens
  if (screenWidth >= 1920) return 28;  // h-7 for large screens
  return 24;  // h-6 for standard screens
};

/**
 * Get the Tailwind CSS class for responsive menu bar height
 * @param {number} screenWidth - The current screen width in pixels
 * @returns {string} - The Tailwind CSS height class (h-6, h-7, or h-8)
 */
export const getMenuBarHeightClass = (screenWidth) => {
  if (screenWidth >= 2560) return 'h-8';
  if (screenWidth >= 1920) return 'h-7';
  return 'h-6';
};
