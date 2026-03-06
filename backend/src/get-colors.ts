import { Color } from './types.js';
import { isSimilar } from './is-similar.js';

function distance(c1: Color, c2: Color): number {
  return Math.sqrt(
    (c1.r - c2.r) ** 2 +
    (c1.g - c2.g) ** 2 +
    (c1.b - c2.b) ** 2
  );
}

export function getColors(clrs: Color[], num: number): Color[] {
  let centers: Color[] = [];
  
  for (let i = 0; i < num; i += 1) {
    let a = Math.floor(Math.random() * clrs.length);
    let newColor = { ...clrs[a] };
    
    let attempts = 0;
    while (centers.some(c => isSimilar(c, newColor)) && attempts < 10) {
      a = Math.floor(Math.random() * clrs.length);
      newColor = { ...clrs[a] };
      attempts++;
    }
    
    centers.push(newColor);
  }

  let iterations = 0;
  const maxIterations = 100;

  while (iterations < maxIterations) {
    iterations++;
    
    const groups: Color[][] = centers.map(() => []);

    for (let i = 0; i < clrs.length; i += 1) {
      let prevDist = Infinity;
      let point = 0;

      for (let e = 0; e < centers.length; e += 1) {
        const dist = distance(centers[e], clrs[i]);
        if (dist < prevDist) {
          prevDist = dist;
          point = e;
        }
      }
      groups[point].push(clrs[i]);
    }

    let hasMoved = false;

    for (let i = 0; i < centers.length; i += 1) {
      if (groups[i].length === 0) continue;

      let totals = { r: 0, g: 0, b: 0 };
      for (let e = 0; e < groups[i].length; e += 1) {
        totals.r += groups[i][e].r;
        totals.g += groups[i][e].g;
        totals.b += groups[i][e].b;
      }

      const newR = totals.r / groups[i].length;
      const newG = totals.g / groups[i].length;
      const newB = totals.b / groups[i].length;

      if (
        Math.abs(centers[i].r - newR) > 1 || 
        Math.abs(centers[i].g - newG) > 1 || 
        Math.abs(centers[i].b - newB) > 1
      ) {
        hasMoved = true;
      }

      centers[i].r = newR;
      centers[i].g = newG;
      centers[i].b = newB;
    }

    if (!hasMoved)
      break; 
  }

  return centers;
}