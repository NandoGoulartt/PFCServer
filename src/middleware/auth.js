import jwt from 'jsonwebtoken';

export function middlewareAutenticacao(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ mensagem: "Token não informado!" });
    }

    const authorizationArray = authorization.split(" ");

    if (authorizationArray.length !== 2 || authorizationArray[0] !== "Bearer") {
      return res.status(401).json({ mensagem: "Formato do Token inválido!" });
    }

    const token = authorizationArray[1];

    const decodedToken = jwt.verify(token, "palavraSecreta");

    req.userId = decodedToken.userId;
    req.userRoles = decodedToken.roles;

    next();
  } catch (error) {
    console.error("Erro ao verificar o token:", error);
    return res.status(401).json({ mensagem: "Token de autenticação inválido ou expirado." });
  }
}
