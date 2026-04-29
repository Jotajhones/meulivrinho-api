import { supabase } from '../config/supabase.js';

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