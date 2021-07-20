export default function tempo(req, res) {
  const date = new Date()

  res.json({
    data: date
  })
}