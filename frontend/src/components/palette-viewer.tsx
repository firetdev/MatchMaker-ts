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

    // Clear and draw the palette blocks
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const blockHeight = canvas.height / colors.length;
    
    colors.forEach((color, i) => {
      ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
      ctx.fillRect(0, i * blockHeight, canvas.width, blockHeight);
    });
  }, [colors]);

  return (
    <div id="palpart">
      <canvas ref={paletteCanvasRef} width="128" height="380"></canvas>
      <br/><br/>
      
      <div className="download-group">
        <button className="button">Download (image)</button>
        <br/>
        <button className="button">Download (rgb)</button>
      </div>
    </div>
  );
};

export default PaletteViewer;