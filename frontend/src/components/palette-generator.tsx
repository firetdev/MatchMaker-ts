import React, { useState, useRef, type ChangeEvent } from 'react';
import { type Color } from '../types.js';

interface Props {
  onPaletteGenerated: (colors: Color[]) => void;
}

const PaletteGenerator: React.FC<Props> = ({ onPaletteGenerated }) => {
  const [numColors, setNumColors] = useState(16);
  const [fileName, setFileName] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      if (imgRef.current) imgRef.current.src = url;
    }
  };

  const extractPalette = () => {
    // Logic from your original main.js would go here.
    // For now, we'll simulate finding 5 colors.
    const dummyPalette = [{ r: 255, g: 0, b: 0 }, { r: 0, g: 255, b: 0 }, { r: 0, g: 0, b: 255 }, { r: 255, g: 0, b: 255 }];
    onPaletteGenerated(dummyPalette);
  };

  return (
    <div id="part1">
      <img ref={imgRef} className="imagedisplay" alt="Preview" style={{ display: fileName ? 'block' : 'none' }} />
      
      <div className="controls">
        <label>Number of colors: </label>
        <input 
          type="number" 
          value={numColors} 
          onChange={(e) => setNumColors(parseInt(e.target.value))} 
        />
        <br /><br />
        
        <input type="file" id="image1" className="file" accept="image/*" onChange={handleFileChange} />
        <label htmlFor="image1" className="button">Choose file</label>
        <span className="filename">{fileName}</span>
        
        <button className="button" onClick={extractPalette} style={{ marginLeft: '10px' }}>
          Generate Palette
        </button>
      </div>
    </div>
  );
};

export default PaletteGenerator;