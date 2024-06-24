import mongoose from 'mongoose';

const lancamentoSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['Despesa', 'Receita']
  },
  categories: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  due_date: {
    type: Date,
    required: true
  },
  payment_date: {
    type: Date,
  },
  account: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Lancada', 'Confirmada', 'Paga', 'Cancelada']
  },
  comments: {
    type: String,
    default: ''
  }
});

const Lancamento = mongoose.model('Lancamento', lancamentoSchema);

export default Lancamento;
