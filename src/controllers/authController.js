import { supabase } from '../config/supabase.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tenta autenticar o usuário com e-mail e senha
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: 'Credenciais inválidas. 🧐' });
    }

    // O Supabase retorna o usuário e uma 'session' que contém o access_token (JWT)
    return res.status(200).json({
      user: data.user,
      token: data.session.access_token // ISSO é o que o seu front-end precisa salvar
    });

  } catch (error) {
    return res.status(500).json({ error: 'Erro interno no servidor de autenticação.' });
  }
};

export const updatePassword = async (req, res) => {
  const { password } = req.body;
  const userId = req.user.id; // Pegamos o ID que o middleware injetou no req

  try {
    const { data, error } = await supabase.auth.admin.updateUserById(
      userId,
      { password: password }
    );

    if (error) throw error;

    return res.status(200).json({ message: 'Senha atualizada com sucesso!' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};