import React, { useEffect, useRef } from 'react';
import { type Color } from '../types.js';

interface Props {
  colors: Color[];
}

const PaletteViewer: React.FC<Props> = ({ colors }) => {
  const paletteCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = paletteCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const blocksPerRow = 8;
    const blockSize = canvas.width / blocksPerRow;
    const rows = Math.ceil(colors.length / blocksPerRow);
    canvas.height = rows * blockSize;
    if (canvas.height == 0)
      canvas.height = 360;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    colors.forEach((color, i) => {
      const row = Math.floor(i / blocksPerRow);
      const col = i % blocksPerRow;
      ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
      ctx.fillRect(col * blockSize, row * blockSize, blockSize, blockSize);
    });
  }, [colors]);

  return (
    <div id="palpart">
      <canvas ref={paletteCanvasRef} width="256" height="360"></canvas>
      <br/><br/>
    </div>
  );
};

export default PaletteViewer;