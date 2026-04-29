import { supabase } from '../config/supabase.js';

export const livroService = {
    
    async getAll(page = 1, search = '', sort = 'recent') {
        const limit = 8;
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        let query = supabase
            .from('livros')
            .select('*', { count: 'exact' });


        if (search) {
            query = query.ilike('titulo', `%${search}%`);
        }


        switch (sort) {
            case 'az':
                query = query.order('titulo', { ascending: true });
                break;
            case 'za':
                query = query.order('titulo', { ascending: false });
                break;
            case 'year':

                query = query.order('ano', { ascending: false });
                break;
            case 'recent':
            default:

                query = query.order('created_at', { ascending: false });
                break;
        }

        const { data, count, error } = await query.range(from, to);

        if (error) throw error;

        return {
            books: data,
            totalPages: Math.ceil(count / limit),
            currentPage: page
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