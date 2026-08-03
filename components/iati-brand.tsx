import Image from 'next/image'

type IatiBrandProps = {
  className?: string
  compact?: boolean
  label?: string
}

export function IatiBrand({ className = '', compact = false, label = 'Seguro de viaje con' }: IatiBrandProps) {
  return (
    <div className={`iati-brand ${compact ? 'iati-brand-compact' : ''} ${className}`.trim()}>
      <span>{label}</span>
      <span className="iati-brand-logo">
        <Image
          src="/brand/iati-logo-white.png"
          width={120}
          height={66}
          alt="IATI Seguros"
        />
      </span>
    </div>
  )
}
