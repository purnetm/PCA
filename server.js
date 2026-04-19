// Vite dev server launcher — replaces old static file server
import { createServer } from 'vite'

const server = await createServer({ server: { port: 3000 } })
await server.listen()
server.printUrls()
