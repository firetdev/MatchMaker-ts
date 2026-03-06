import express, { Request, Response } from 'express';
import { Color } from './types.js';
import { getColors } from './get-colors.js'
import cors from 'cors';
import multer from 'multer';
import sharp from 'sharp';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Set up Multer to keep the uploaded file in memory (RAM) instead of saving to disk
const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/palette', upload.single('image'), async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const numColors = parseInt(req.body.numColors, 10);
    if (!numColors || numColors < 1) {
      return res.status(400).json({ error: 'Please provide a valid number of colors' });
    }

    // Extract raw pixels using Sharp
    const { data, info } = await sharp(req.file.buffer)
      .resize(480)
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Format the data
    const clrs: Color[] = [];
    for (let i = 0; i < data.length; i += info.channels) {
      clrs.push({
        r: data[i],
        g: data[i + 1],
        b: data[i + 2],
      });
    }

    // Create the palette
    const palette = getColors(clrs, numColors); 

    res.json({ palette: palette });

  } catch (error) {
      console.error('Error processing image:', error);
      res.status(500).json({ error: 'Failed to process image' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});