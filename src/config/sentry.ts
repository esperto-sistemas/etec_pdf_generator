import * as Sentry from '@sentry/node'
import { env } from './env'

export function initSentry() {
  if (!env.SENTRY_DSN) {
    console.warn('SENTRY_DSN is not defined. Sentry will not be initialized.')
    return
  }

  Sentry.init({
    dsn: env.SENTRY_DSN,
    environment: env.NODE_ENV,
    tracesSampleRate: 1.0,
  })
}

export function captureError(error: Error) {
  Sentry.captureException(error)
}

export function captureMessage(message: string) {
  Sentry.captureMessage(message)
}
