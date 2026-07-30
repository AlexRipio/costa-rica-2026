import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'

const source = 'public/brand/v2-logo-white.png'
const background = '#123f35'

async function makeIcon(path, size, markScale = 0.92) {
  const markWidth = Math.round(size * markScale)
  const mark = await sharp(source)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize({ width: markWidth, fit: 'inside', withoutEnlargement: false })
    .png()
    .toBuffer()

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background,
    },
  })
    .composite([{ input: mark, gravity: 'centre' }])
    .png({ compressionLevel: 9 })
    .toFile(path)
}

await Promise.all([
  makeIcon('app/icon.png', 512),
  makeIcon('app/apple-icon.png', 180, 0.82),
  makeIcon('public/favicon-48.png', 48, 0.92),
  makeIcon('public/favicon-96.png', 96, 0.92),
  makeIcon('public/icons/icon-192.png', 192, 0.86),
  makeIcon('public/icons/icon-512.png', 512, 0.86),
  makeIcon('public/icons/icon-maskable-512.png', 512, 0.72),
])

const faviconPng = await sharp('public/favicon-48.png').png().toBuffer()
const icoHeader = Buffer.alloc(22)
icoHeader.writeUInt16LE(0, 0)
icoHeader.writeUInt16LE(1, 2)
icoHeader.writeUInt16LE(1, 4)
icoHeader.writeUInt8(48, 6)
icoHeader.writeUInt8(48, 7)
icoHeader.writeUInt8(0, 8)
icoHeader.writeUInt8(0, 9)
icoHeader.writeUInt16LE(1, 10)
icoHeader.writeUInt16LE(32, 12)
icoHeader.writeUInt32LE(faviconPng.length, 14)
icoHeader.writeUInt32LE(22, 18)
await writeFile('app/favicon.ico', Buffer.concat([icoHeader, faviconPng]))

console.log('Iconos de Viajan2Juntos generados.')
