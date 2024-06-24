import mongoose from 'mongoose';

const contasSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
});

const Contas = mongoose.model('Conta', contasSchema);

export default Contas;
