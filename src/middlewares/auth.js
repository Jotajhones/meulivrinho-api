import { supabase } from '../config/supabase.js';

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    // O Supabase valida o JWT automaticamente
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        return res.status(403).json({ error: 'Acesso negado' });
    }

    // Opcional: Validar se o UID do user é o seu UID de Admin
    // if (user.id !== 'SEU_UID_AQUI') return res.status(403).json({ error: 'Não autorizado' });

    req.user = user;
    next();
};

