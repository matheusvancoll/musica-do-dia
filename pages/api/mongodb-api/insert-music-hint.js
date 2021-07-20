import ConnectDatabase from '../../../utils/MongoConnection'

export default async function insertHintMusic(req, res) {
  
  if (req.method === "POST") {

    const { musicHint, author } = req.body

    // Verifica se os campos estão vazios
    if( !musicHint || !author) {
      res.status(400).json({message: "Missing body data"})
      return
    }

    // Conecta ao DB e insere os valores indicados
    const { db } = await ConnectDatabase()
    const dataHintMusic = await db.collection('music_hint').insertOne({
      musicHint,
      author
    })

    res.status(200).json(dataHintMusic)
  } else {
    res.status(400).json({ message: "Wrong request method"})
  }

}
