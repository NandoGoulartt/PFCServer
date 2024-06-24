import Categoria from "../model/categorias.js";

const categoriasGet = async (req, res) => {
  try {
    const categoria = await Categoria.find();
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar categorias', error });
  }
};

const categoriasPost = async (req, res) => {
  const { description, type } = req.body;

  try {
    const novoCategoria = new Categoria({ description, type });
    await novoCategoria.save();
    res.status(201).json(novoCategoria);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar categoria', error });
  }
};

const categoriasPut = async (req, res) => {
  const { description, type } = req.body;
  const { id } = req.params;

  try {
    const categoriaAtualizada = await Categoria.findByIdAndUpdate(id, { description, type }, { new: true });
    if (!categoriaAtualizada) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.status(200).json(categoriaAtualizada);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar categoria', error });
  }
};

const categoriasDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const categoriaRemovida = await Categoria.findByIdAndDelete(id);
    if (!categoriaRemovida) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.status(200).json({ message: 'Categoria removida com sucesso', categoria: categoriaRemovida });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar categoria', error });
  }
};

export default {
  categoriasGet,
  categoriasPost,
  categoriasPut,
  categoriasDelete,
};