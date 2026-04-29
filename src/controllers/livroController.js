import { livroService } from '../services/livroService.js';

export const livroController = {
    async index(req, res) {
        try {
            const { page, search, sort } = req.query;

            const result = await livroService.getAll(Number(page) || 1, search, sort);

            return res.json(result);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar livros', details: error.message });
        }
    },

    async show(req, res) {
        try {
            const { slug } = req.params;
            const livro = await livroService.getBySlug(slug);
            return res.json(livro);
        } catch (error) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
    },

    async store(req, res) {
        try {
            const novoLivro = await livroService.createLivro(req.body);
            return res.status(201).json(novoLivro);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao cadastrar livro', details: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const livroAtualizado = await livroService.updateLivro(id, req.body);
            return res.json(livroAtualizado);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao atualizar livro' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            await livroService.deleteLivro(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao deletar livro' });
        }
    }

};