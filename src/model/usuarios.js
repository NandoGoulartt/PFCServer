import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: String,
    required: true,
    unique: true,
  },
  pwd: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
  },
  status: {
    type: String,
    required: true,
    enum: ['Ativo', 'Inativo'],
  }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
