import { Fragment, type CSSProperties } from 'react'

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
      <Fragment key={`${word}-${index}`}>
        <span className="living-word" style={{ '--word-index': index } as CSSProperties}>
          {word}
        </span>{' '}
      </Fragment>
    ))

  const accentWords = accent.trim().split(' ')
  const accentLead = accentWords.slice(0, -1).join(' ')
  const accentFocus = accentWords.at(-1)

  return (
    <p className="living-statement">
      {words(before)}
      <strong>
        {accentLead && <>{accentLead}{' '}</>}
        <span className="living-accent-focus">{accentFocus}</span>
      </strong>{' '}
      {words(after)}
    </p>
  )
}
