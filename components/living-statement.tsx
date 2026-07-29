export function LivingStatement({
  before,
  accent,
  after,
}: {
  before: string
  accent: string
  after: string
}) {
  const words = (text: string) =>
    text.split(' ').map((word, index) => (
      <span className="living-word" style={{ '--word-index': index } as CSSProperties} key={`${word}-${index}`}>
        {word}{' '}
      </span>
    ))

  return (
    <p className="living-statement">
      {words(before)}
      <strong>{accent}</strong>{' '}
      {words(after)}
    </p>
  )
}
import type { CSSProperties } from 'react'
