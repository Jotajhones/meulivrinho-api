import express from 'express';
import cors from 'cors';
import { supabase } from './config/supabase.js';

const app = express();
app.use(cors());
app.use(express.json());

// Rota para listar os últimos 20 livros (Requisito do MVP)
app.get('/livros', async (req, res) => {
    const { data, error } = await supabase
        .from('livros')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

    if (error) {
        console.error("Erro no Supabase:", error); // Isso vai nos dizer o motivo real
        return res.status(400).json({ error: error.message });
    }
    return res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 API rodando em http://localhost:${PORT}`));