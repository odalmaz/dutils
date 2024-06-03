import { zValidator } from '@hono/zod-validator'
import { ValidationTargets } from 'hono'
import { ZodSchema } from 'zod'

export const cValidator = <T extends ZodSchema, Target extends keyof ValidationTargets>(
  type: Target,
  schema: T
) => {
  return zValidator(type, schema, (result, c) => {
    if (!result.success) {
      const formattedError = result.error.issues.map((issue) => ({
        message: issue.message,
        code: issue.code,
      }))
      return c.json({ success: false, error: formattedError }, 400)
    }
  })
}
