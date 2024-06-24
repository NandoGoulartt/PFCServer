import Lancamento from "../model/lancamentos.js";

const lancamentoGet = async (req, res) => {
  try {
    const lancamento = await Lancamento.find().sort({ due_date: 1 });
    res.status(200).json(lancamento);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar Lançamentos', error });
  }
};

const lancamentoVencidosGet = async (req, res) => {
  try {
    const currentDate = new Date();

    const lancamentos = await Lancamento.find({
      due_date: { $lte: currentDate },
      status: { $ne: 'Paga' }
    })
      .sort({ due_date: 1 });

    res.status(200).json(lancamentos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar Lançamentos', error });
  }
};

const lancamentoPost = async (req, res) => {
  const { type, categories, status, description, value, due_date, payment_date, account, comments } = req.body;

  try {
    const lancamentoUsuario = new Lancamento({ type, status, categories, description, value, due_date, payment_date, account, comments });
    await lancamentoUsuario.save();
    res.status(201).json(lancamentoUsuario);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar Lançamento', error });
  }
};

const lancamentoPut = async (req, res) => {
  const { id } = req.params;
  const { type, categories, status, description, value, due_date, payment_date, account, comments } = req.body;

  try {
    const lancamentoAtualizado = await Lancamento.findByIdAndUpdate(
      id,
      { type, categories, status, description, value, due_date, payment_date, account, comments },
      { new: true }
    );

    if (!lancamentoAtualizado) {
      return res.status(404).json({ message: 'Lançamento não encontrado' });
    }

    res.status(200).json(lancamentoAtualizado);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar Lançamento', error });
  }
};

const lancamentoDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const lancamentoDeletado = await Lancamento.findByIdAndDelete(id);

    if (!lancamentoDeletado) {
      return res.status(404).json({ message: 'Lançamento não encontrado' });
    }

    res.status(200).json({ message: 'Lançamento deletado com sucesso' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao deletar Lançamento', error });
  }
};

export default {
  lancamentoGet,
  lancamentoPost,
  lancamentoPut,
  lancamentoDelete,
  lancamentoVencidosGet
};