import express from 'express';
import cors from 'cors';
import livroRoutes from './routes/livroRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(express.json());

const allowedOrigins = [
  'https://meulivrinho.art.br',
  'https://www.meulivrinho.art.br',
  'https://meulivrinho-web.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Acesso não autorizado por política de CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Delegando as rotas para o roteador específico
app.use('/livros', livroRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 API rodando na porta ${PORT}`));