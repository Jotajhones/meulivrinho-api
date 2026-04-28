import { supabase } from '../config/supabase.js';

export const livroService = {
    async getAll(page = 1, search = '') {
        const limit = 20;
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        let query = supabase
            .from('livros')
            .select('*', { count: 'exact' })
            .order('titulo', { ascending: true })
            .range(from, to);

        if (search) {
            query = query.or(`titulo.ilike.%${search}%,autor.ilike.%${search}%`);
        }

        const { data, error, count } = await query;
        if (error) throw error;

        return {
            data,
            total: count,
            hasMore: count > to
        };
    },

    async getBySlug(slug) {
        const { data, error } = await supabase
            .from('livros')
            .select('*')
            .eq('slug', slug)
            .single();
        if (error) throw error;
        return data;
    },

    async createLivro(body) {
        const { data, error } = await supabase.from('livros').insert([body]).select();
        if (error) throw error;
        return data;
    },

    async updateLivro(id, body) {
        const { data, error } = await supabase.from('livros').update(body).eq('id', id).select();
        if (error) throw error;
        return data;
    },

    async deleteLivro(id) {
        const { error } = await supabase.from('livros').delete().eq('id', id);
        if (error) throw error;
        return true;
    }
};