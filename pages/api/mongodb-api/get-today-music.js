import ConnectDatabase from '../../../utils/MongoConnection'

export default async function GetMusicList(req, res) {
  
  // Salva a data de hoje
  const date = new Date()
  const formatDate = Intl.DateTimeFormat("pt-BR", { dateStyle: "short" })
  const currentDate = formatDate.format(date)

  // Conecta ao DB e retorna a música de hojes
  const { db } = await ConnectDatabase()
    
  const musicListDay = await db.collection('music_day').findOne({dayMusic: currentDate})

  res.status(200).json({ music: musicListDay})
}
