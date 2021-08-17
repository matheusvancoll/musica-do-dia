import ConnectDatabase from '../../../utils/MongoConnection'

export default async function insertHintMusic(req, res) {
  
  if (req.method === "POST") {

    const { musicHint } = req.body

    // Verifica se os campos estão vazios
    if( !musicHint) {
      res.status(400).json({message: "Missing body data"})
      return
    }

    // Conecta ao DB e insere os valores indicados
    const { db } = await ConnectDatabase()
    const dataHintMusic = await db.collection('music_hint').insertOne({
      musicHint
    })
    console.log("Info registrada com sucesso")

    res.status(200).json(dataHintMusic)
  } else {
    res.status(400).json({ message: "Wrong request method"})
  }

}
