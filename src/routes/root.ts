import type { FastifyPluginAsync } from 'fastify'

const route: FastifyPluginAsync = async fastify => {
  fastify.get('/', () => {
    return { message: 'Hello World!' }
  })
}

export default route
