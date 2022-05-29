import AppExceptions from 'App/Exceptions/AppExceptions'
import User from 'App/Models/User'

type SignUpParams = {
  username: string
  email: string
  password: string
}

export default class UsersServices {
  public async signUp({ email, password, username }: SignUpParams) {
    const emailExists = await User.findBy('email', email)
    if (emailExists) {
      throw AppExceptions.badRequest('email already used')
    }
    const usernameExists = await User.findBy('username', username)
    if (usernameExists) {
      throw AppExceptions.badRequest('username already used')
    }

    const user = new User()
    user.email = email
    user.password = password
    user.username = username
    await user.save()

    return user
  }

  public async checkUsername(username: string) {
    const usernameExists = await User.findBy('username', username)
    if (!usernameExists) {
      return false
    }

    return true
  }

  public async checkEmail(email: string) {
    const emailExists = await User.findBy('email', email)
    if (!emailExists) {
      false
    }

    return true
  }

  public async udpatateAvatar(id: number, avatar: string) {
    const user = await User.find(id)

    if (!user) {
      throw AppExceptions.notFound('user not found')
    }

    user.avatar = avatar
    await user.save()

    return user
  }
}
