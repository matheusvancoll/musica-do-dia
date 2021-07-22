export default function CardMusic(props) {
  return(
    <div className="dm-card">
      <div className="dm-info-main">
        <h4>Música do dia:</h4>
        <h1>{props.music.name} - {props.music.author}</h1>
      </div>

      <div className="dm-info-generics">
        <h5>Álbum: {props.music.album}</h5>
        <h5>Lançado em: {props.music.year}</h5>
      </div>

      <div className="dm-info-links">
        <a href={props.music.link.youtube} target="_blank" rel="noreferrer">Ouvir no Youtube</a>
        <a href={props.music.link.spotify} target="_blank" rel="noreferrer">Ouvir no Spotify</a>
        <a href={props.music.link.deezer} target="_blank" rel="noreferrer"> Ouvir no Deezer</a>
      </div>
    </div>
  )
}