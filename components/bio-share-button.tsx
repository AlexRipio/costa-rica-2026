'use client'

import { Check, Share2 } from 'lucide-react'
import { useState } from 'react'

export function BioShareButton() {
  const [copied, setCopied] = useState(false)

  const share = async () => {
    const shareData = {
      title: 'Viajan2Juntos',
      text: 'Guías, rutas y descuentos para tu próximo viaje.',
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        return
      }
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      // Closing the system share sheet is an expected interaction, not an error to show.
    }
  }

  return (
    <button className="bio-share-button" type="button" onClick={() => void share()} aria-label="Compartir Viajan2Juntos">
      {copied ? <Check aria-hidden="true" /> : <Share2 aria-hidden="true" />}
    </button>
  )
}
