'use client'

import type { ImgHTMLAttributes } from 'react'

type ProtectedImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  copyrightLabel?: string
}

export function ProtectedImage({
  className = '',
  copyrightLabel = '© Viajan2Juntos',
  ...props
}: ProtectedImageProps) {
  return (
    <img
      {...props}
      className={`protected-image ${className}`.trim()}
      data-copyright={copyrightLabel}
      draggable={false}
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
    />
  )
}
