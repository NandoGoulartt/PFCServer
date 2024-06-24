import Contas from "../model/contas.js";

const contasGet = async (req, res) => {
  try {
    const contas = await Contas.find();
    res.status(200).json(contas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar contas', error });
  }
};

const contasPost = async (req, res) => {
  const { description, comments } = req.body;

  try {
    const novoContas = new Contas({ description, comments });
    await novoContas.save();
    res.status(201).json(novoContas);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar contas', error });
  }
};

const contasPut = async (req, res) => {
  const { id } = req.params;
  const { description, comments } = req.body;

  try {
    const contaAtualizada = await Contas.findByIdAndUpdate(id, { description, comments }, { new: true });
    if (!contaAtualizada) {
      return res.status(404).json({ message: 'Conta não encontrada' });
    }
    res.status(200).json(contaAtualizada);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar conta', error });
  }
};

const contasDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const contaDeletada = await Contas.findByIdAndDelete(id);
    if (!contaDeletada) {
      return res.status(404).json({ message: 'Conta não encontrada' });
    }
    res.status(200).json({ message: 'Conta deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar conta', error });
  }
};
export default {
  contasGet,
  contasPost,
  contasPut,
  contasDelete,
};