export function AdSpace({ compact = false }: { compact?: boolean }) {
  return <aside className={`ad-slot-reserved ${compact ? 'ad-slot-reserved-compact' : ''}`} hidden aria-hidden="true" />
}
