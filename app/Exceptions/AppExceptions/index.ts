type AppExceptionsParams = {
  code: number
  message: String
}

export default class AppExceptions {
  code: number
  message: String

  constructor({ code, message }: AppExceptionsParams) {
    this.message = message
    this.code = code
  }

  static badRequest(message: string) {
    return new AppExceptions({ code: 400, message: message })
  }

  static notFound(type: string) {
    return new AppExceptions({ code: 404, message: `${type}/not-found` })
  }

  static unauthoraized() {
    return new AppExceptions({ code: 401, message: 'unauthoraized' })
  }
}
