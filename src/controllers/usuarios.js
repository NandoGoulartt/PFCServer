import Usuario from "../model/usuarios.js";
import bcrypt from "bcryptjs";

const usuariosGet = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
};

const usuariosPost = async (req, res) => {
  const { name, email, user, pwd, level, status } = req.body;

  try {
    const usuarioExistenteEmail = await Usuario.findOne({ email });
    if (usuarioExistenteEmail) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }
    const usuarioExistente = await Usuario.findOne({ user });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Nome de usuário já existe' });
    }
    const hashedPassword = await bcrypt.hash(pwd, 8);
    const novoUsuario = new Usuario({ name, email, user, pwd: hashedPassword, level, status });
    await novoUsuario.save();
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar usuário', error });
  }
};

const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { name, email, user, pwd, level, status } = req.body;

  try {
    const usuarioExistente = await Usuario.findById(id);
    if (!usuarioExistente) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    usuarioExistente.name = name;
    usuarioExistente.email = email;
    usuarioExistente.user = user;
    usuarioExistente.level = level;
    usuarioExistente.status = status;

    if (pwd) {
      const hashedPassword = await bcrypt.hash(pwd, 8);
      usuarioExistente.pwd = hashedPassword;
    }

    const usuarioAtualizado = await usuarioExistente.save();
    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar usuário', error });
  }
};

const usuariosDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioExistente = await Usuario.findByIdAndDelete(id);
    if (!usuarioExistente) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao excluir usuário', error });
  }
};

export default {
  usuariosGet,
  usuariosDelete,
  usuariosPost,
  usuariosPut
};
