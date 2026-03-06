import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allows your React app to ping this API
app.use(express.json()); // Lets Express read JSON in request bodies

// A test route to make sure things are working
app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'MatchMaker API is humming along!' });
});

// A placeholder for your future "Projects" or "Profiles" endpoint
app.get('/api/projects', (req: Request, res: Response) => {
  res.json([
    { id: 1, name: 'Project Alpha', description: 'A cool TypeScript app' },
    { id: 2, name: 'Project Beta', description: 'Looking for a React dev' }
  ]);
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});