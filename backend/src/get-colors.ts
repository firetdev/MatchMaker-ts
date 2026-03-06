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
  let oldCenters: Color[] = [];
  let groups: Color[][] = [];
  for (let i = 0; i < num; i += 1) {
    let a = Math.floor(Math.random() * clrs.length);
    let newColor = clrs[a];
    for (let e = 0; e < centers.length; e++) {
      while (isSimilar(centers[e], newColor)) {
        a = Math.floor(Math.random() * clrs.length);
        newColor = clrs[a];
      }
    }
    centers.push(newColor);
    groups.push([]);
  }

  let iterations = 0;
  const maxIterations = 100;

  while (iterations < maxIterations) {
    iterations++;
    groups = centers.map(() => []);

    for (let u = 0; u < 3; u += 1) {
      for (let i = 0; i < clrs.length; i += 1) {
        let prevDist = 10000000;
        let point = 0;  // Index of center point which color is closest to

        for (let e = 0; e < centers.length; e += 1) {
          const dist = distance(centers[e], clrs[i]);

          if (dist < prevDist) {
            prevDist = dist;
            point = e;
          }
        }

        groups[point].push(clrs[i]);
      }

      for (let i = 0; i < centers.length; i += 1) {
        const totals = {
          r: 0,
          g: 0,
          b: 0
        };

        for (let e = 0; e < groups[i].length; e += 1) {
          totals.r += groups[i][e].r;
          totals.g += groups[i][e].g;
          totals.b += groups[i][e].b;
        }

        oldCenters = centers.map(c => ({ ...c }));

        if (groups[i].length > 0) {
          centers[i].r = totals.r / groups[i].length;
          centers[i].g = totals.g / groups[i].length;
          centers[i].b = totals.b / groups[i].length;
        }
        for (let e = 0; e < centers.length; e += 1) {
          if (Math.abs(centers[i].r - oldCenters[i].r) > 1 || Math.abs(centers[i].g - oldCenters[i].g) > 1 || Math.abs(centers[i].b - oldCenters[i].b) > 1)
            break;
        }
      }
    }
  }

  return centers;
}