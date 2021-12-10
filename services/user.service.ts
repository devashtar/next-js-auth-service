type RequestClientType = {
  email: string
  username: string
  password: string
}

type DBUserType = {
  id: string
  email: string
  username: string
  password: string
}

type DBCodesType = {
  userId: string
  code: string
  expires: Date
}

const db = [
  {
    id: 'uuid',
    email: 'test@gmail.com',
    username: 'testname',
    password: '123456789'
  }
] as Array<DBUserType>

const dbCodes = [
  {
    userId: 'uuid',
    code: '111111',
    expires: new Date()
  }
] as Array<DBCodesType>

class UserService {
  async findByEmailAndPassword(
    obj: RequestClientType
  ): Promise<RequestClientType | undefined> {
    try {
      const result = db.find(
        (item) => item.email === obj.email && item.password === obj.password
      )
      return result
    } catch (err) {
      throw new Error('Сервис недоступен!')
    }
  }

  async checkReservedEmail(
    obj: RequestClientType
  ): Promise<RequestClientType | undefined> {
    try {
      const result = db.find((item) => item.email === obj.email)
      return result
    } catch (err) {
      throw new Error('Сервис недоступен!')
    }
  }

  async createUser(obj: RequestClientType): Promise<RequestClientType> {
    try {
      db.push({ ...obj, id: 'uuid' })
      return obj
    } catch (err) {
      throw new Error('Сервис недоступен!')
    }
  }

  async checkFreeUsername(
    username: string
  ): Promise<RequestClientType | undefined> {
    try {
      const result = db.find((item) => item.username === username)
      return result
    } catch (err) {
      throw new Error('Сервис недоступен!')
    }
  }

  async checkCode(code: string): Promise<DBCodesType | undefined> {
    try {
      const result = dbCodes.find((item) => item.code === code)
      return result
    } catch (err) {
      throw new Error('Сервис недоступен!')
    }
  }
}

export default new UserService()
