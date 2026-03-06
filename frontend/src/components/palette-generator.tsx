import React, { useState, useRef, type ChangeEvent } from 'react';
import { type Color } from '../types.js';

const API_URL = 'http://localhost:3000/api/palette';

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

  const extractPalette = async () => {
    const fileInput = document.getElementById('image1') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (!file) {
      alert('Please choose an image first.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('numColors', numColors.toString());

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();

      onPaletteGenerated(data.palette);
    } catch (err) {
      console.error('Palette generation failed:', err);
    }
  };

  return (
    <div id="part1">
      <img ref={imgRef} className="imagedisplay" alt="Preview" width="480" style={{ display: fileName ? 'block' : 'none' }} />
      
      <div className="controls">
        <label>Number of colors: </label>
        <input 
          type="number" 
          value={numColors} 
          onChange={(e) => setNumColors(parseInt(e.target.value))} 
        />
        <br/><br/>
        
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