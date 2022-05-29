import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Log from '@ioc:Adonis/Core/Logger'

export default class Logger {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    Log.info(`-----------------------------------\n`)
    Log.info(`PATH: ${request.url()}`)
    Log.info(`METHOD: ${request.method()}`)
    Log.info(`BODY: ${JSON.stringify(request.all())}`)
    Log.info(`PARAMS: ${JSON.stringify(request.params())}`)
    Log.info(`QS: ${JSON.stringify(request.qs())}`)
    Log.info(`----------------------------------- \n\n`)

    await next()
  }
}
