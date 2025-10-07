import { Dimensions, PixelRatio } from 'react-native';

let { width: W, height: H } = Dimensions.get('window');

// keep W/H fresh on any resize/orientation
const onChange = ({ window }) => {
  console.log('window changed', window);
  W = window.width;
  H = window.height;
};
const subscription = Dimensions.addEventListener('change', onChange);
// (no explicit cleanup needed; module lives for app lifetime)

/** parse "20" or "20%" or 20 */
const toNum = (v) => (typeof v === 'number' ? v : parseFloat(String(v).replace('%', '')));

/** EXACT drop-in replacements (use current window) */
export const wp = (percent) =>
  PixelRatio.roundToNearestPixel((W * toNum(percent)) / 100);

export const hp = (percent) =>
  PixelRatio.roundToNearestPixel((H * toNum(percent)) / 100);

/** Portrait-normalized versions:
 * always use the short side as "width", long side as "height",
 * so sizes feel the same in portrait & landscape.
 */
export const wpPortrait = (percent) =>
  PixelRatio.roundToNearestPixel((Math.min(W, H) * toNum(percent)) / 100);

export const hpPortrait = (percent) =>
  PixelRatio.roundToNearestPixel((Math.max(W, H) * toNum(percent)) / 100);

/** helpers */
export const getWidth = () => W;
export const getHeight = () => H;
export const isPortrait = () => H >= W;

/** Optional: font size that ignores user font scaling (consistent visual size) */
export const sp = (percent, fontScale = PixelRatio.getFontScale()) =>
  PixelRatio.roundToNearestPixel(((H * toNum(percent)) / 100) / fontScale);
