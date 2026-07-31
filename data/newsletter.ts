import { Redis } from '@upstash/redis'

const subscribersKey = 'viajan2juntos:subscribers:v1'
const subscriberPrefix = 'viajan2juntos:subscriber:'

export type NewsletterSource = 'costa-rica-packing'

function redis() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN
  if (!url || !token) return null
  return new Redis({ url, token })
}

export async function saveSubscriber(email: string, source: NewsletterSource) {
  const normalizedEmail = email.trim().toLowerCase()
  const client = redis()
  if (!client) return { saved: false, email: normalizedEmail }

  const now = new Date().toISOString()
  await client.sadd(subscribersKey, normalizedEmail)
  await client.hset(`${subscriberPrefix}${normalizedEmail}`, {
    email: normalizedEmail,
    source,
    updatedAt: now,
  })

  return { saved: true, email: normalizedEmail }
}
