import Fastify from 'fastify'
import AutoLoad from '@fastify/autoload'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { env } from './common/env.js'

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    forceESM: true,
    options: { prefix: '/api' },
  })

  try {
    await fastify.listen({ port: env('PORT'), host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }

  ;(['SIGINT', 'SIGTERM'] satisfies NodeJS.Signals[]).forEach(signal => {
    process.on(signal, async () => {
      await fastify.close()
      process.exit(0)
    })
  })
}

bootstrap()
