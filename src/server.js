import express from 'express';
import cors from 'cors';
import { supabase } from './config/supabase.js';

const app = express();
app.use(express.json());

const allowedOrigins = [
  'https://meulivrinho.art.br',
  'https://www.meulivrinho.art.br',
  'https://meulivrinho-web.vercel.app',
  'http://localhost:5173' 
];

app.use(cors({
  origin: function (origin, callback) {

    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS bloqueado por segurança'), false);
    }
    return callback(null, true);
  }
}));

app.get('/livros', async (req, res) => {
    const { data, error } = await supabase
        .from('livros')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

    if (error) {
        console.error("Erro no Supabase:", error); 
        return res.status(400).json({ error: error.message });
    }
    return res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 API rodando na porta ${PORT}`));