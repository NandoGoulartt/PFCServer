import mongoose from 'mongoose';

const categoriaSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Categoria = mongoose.model('Categoria', categoriaSchema);

export default Categoria;
