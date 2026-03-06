import React, { useState } from 'react';
import PaletteGenerator from './components/palette-generator.jsx';
import PaletteViewer from './components/palette-viewer.jsx';
import { type Color } from './types.js';

const App: React.FC = () => {
  const [colors, setColors] = useState<Color[]>([]);

  return (
    <div className="container">
      <h1 id="title">MatchMaker</h1>
      <h3><i>Make palettes from images</i></h3>
      <br/><br/>
      
      <main>
        <PaletteGenerator onPaletteGenerated={setColors} />
        
        {colors.length > 0 && (
          <>
            <div id="divider"></div>
            <PaletteViewer colors={colors} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;