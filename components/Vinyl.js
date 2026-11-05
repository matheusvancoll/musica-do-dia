// Disco de vinil em CSS. `cover` (opcional) vira o rótulo central.
export default function Vinyl({ cover, className = '' }) {
  return (
    <div className={`vinyl ${className}`} aria-hidden="true">
      <div className="vinyl__label" style={cover ? { backgroundImage: `url(${cover})` } : undefined} />
      <div className="vinyl__hole" />
    </div>
  )
}
