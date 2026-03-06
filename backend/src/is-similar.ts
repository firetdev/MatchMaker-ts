import { Color } from './types.js';

export function isSimilar(c1: Color, c2: Color): boolean {
  const difference = {
    r: Math.abs(c1.r - c2.r),
    g: Math.abs(c1.g - c2.g),
    b: Math.abs(c1.b - c2.b)
  };

  const total = difference.r + difference.g + difference.b;

  // Any single channel difference too high
  if (difference.r >= 45 || difference.g >= 45 || difference.b >= 45) {
    return false;
  }

  // Colors are identical
  if (total === 0) {
    return true;
  }

  // Similar if total difference small enough
  if (total <= 100) {
    return true;
  }

  return false;
}