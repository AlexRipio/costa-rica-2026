export function AdSpace({ compact = false }: { compact?: boolean }) {
  return (
    <aside className={`future-ad-space ${compact ? 'future-ad-space-compact' : ''}`} aria-label="Espacio publicitario reservado">
      <span>Espacio reservado</span>
      <strong>Recomendaciones que de verdad usaríamos</strong>
      <p>Aquí podrán aparecer seguros, alojamientos o recursos del viaje, siempre claramente identificados.</p>
    </aside>
  )
}
