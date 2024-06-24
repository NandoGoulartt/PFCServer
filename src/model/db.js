import { connect } from "mongoose"

export const db = async () => {
  try {
    await connect(
      ''
    )
    console.log("Conectado no mongo!")
  } catch (error) {
    console.log(`Erro: ${error}`)
  }

}
