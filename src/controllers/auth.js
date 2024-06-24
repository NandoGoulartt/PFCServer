import Usuario from "../model/usuarios.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd) {
    return res.status(400).json({
      message: "É obrigatório fornecer o email e a senha para fazer login.",
    });
  }
  try {
    const usuario = await Usuario.findOne({ email: email });

    if (!usuario) {
      return res.status(404).json({
        message: "Nenhum usuário com esse email foi encontrado.",
      });
    }

    const validPwd = await bcrypt.compare(pwd, usuario.pwd);
    if (!validPwd) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    if (usuario.status == 'Inativo') {
      return res.status(401).json({
        message: "Usuário Inativo.",
      });
    }

    const roles = usuario.level === 'admin' ? ['admin'] : ['user'];

    const token = jwt.sign(
      { userId: usuario.id, email: usuario.email, roles }, "palavraSecreta",
      { expiresIn: "1h" }
    );

    res.json({ token, message: "Logado com sucesso." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Ocorreu um erro durante o login." });
  }
}

export default {
  login,
};
