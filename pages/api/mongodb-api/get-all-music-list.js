import ConnectDatabase from '../../../utils/MongoConnection'

export default async function GetMusicList(req, res) {
  
  // Conecta ao DB e retorna a música de hojes
  const { db } = await ConnectDatabase()
    
  const musicListDay = await db.collection('music_day').find({}).toArray()

  res.status(200).json({ music: musicListDay})
}
