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
          src="/brand/iati-logo-official.png"
          width={240}
          height={162}
          alt="IATI Seguros de viaje"
        />
      </span>
    </div>
  )
}
