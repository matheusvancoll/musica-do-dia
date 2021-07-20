import ConnectDatabase from '../../../utils/MongoConnection'

export default async function insertNewMusicList(req, res) {
  
  if (req.method === "POST") {

    const { nameMusic, author, year, album, dayMusic, amountView } = req.body

    if (!nameMusic || !author || !year || !album || !dayMusic || !amountView) {
      res.status(400).json({message: "Missing body data"})
      return
    }

    const { db } = await ConnectDatabase()
    const dataNewMusic =  await db.collection('music_day').insertOne({
      nameMusic,
      author,
      year,
      dayMusic,
      amountView,
    })

    res.status(200).json(dataNewMusic)
  } else {
    res.status(400).json({message: "Wrong request method"})
  }

}