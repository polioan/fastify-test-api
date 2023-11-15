import { defineEnvSchema } from '@polioan/zod-env'
import { config } from 'dotenv'
import { z } from 'zod'

config({})

export const env = defineEnvSchema({
  schema: z.object({
    NODE_ENV: z.enum(['production', 'development']),
    PORT: z.coerce.number(),
  }),
})
