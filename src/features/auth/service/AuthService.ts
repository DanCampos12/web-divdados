import ApiService from '@/core/services/ApiService'
import { User, UserEntity } from '@/models'
import { AxiosResponse } from 'axios'
import { v4 as newId } from 'uuid'

type SignInResponse = {
  user: User;
  idToken: string;
}

type SignUpResponse = {
  user: User;
  idToken: string;
}

export class AuthService extends ApiService {
  static async signInWithCustomToken (idToken: string): Promise<AxiosResponse<SignInResponse>> {
    // return this.httpService.post(`/user-auth/${idToken}`)
    console.log('signInWithCustomToken', idToken)
    return new Promise((resolve) => setTimeout(() => {
      resolve({
        config: {},
        headers: {},
        data: {
          user: UserEntity.parse({
            id: newId(),
            age: 21,
            sex: 'M',
            name: 'Danilo',
            surname: 'Rodrigues',
            email: 'danilo.rodrigues@gmail.com'
          }),
          idToken: idToken
        },
        status: 200,
        statusText: 'success'
      })
    }, 1000))
  }

  static async signInWithEmailAndPassoword ({ email, password }:
    { email: string, password: string }): Promise<AxiosResponse<SignInResponse>> {
    // return this.httpService.post('/user-auth', { email, password })
    console.log('signInWithEmailAndPassoword', { email, password })
    return new Promise((resolve) => setTimeout(() => {
      resolve({
        config: {},
        headers: {},
        data: {
          user: UserEntity.parse({
            id: newId(),
            age: 21,
            sex: 'M',
            name: 'Danilo',
            surname: 'Rodrigues',
            email: 'danilo.rodrigues@gmail.com'
          }),
          idToken: newId()
        },
        status: 200,
        statusText: 'success'
      })
    }, 1000))
  }

  static async refreshToken (idToken: string): Promise<AxiosResponse<string>> {
    // return this.httpService.post(`/user-auth/refresh-token/${idToken}`)
    console.log('refreshToken', idToken)
    return new Promise((resolve) => setTimeout(() => {
      resolve({
        config: {},
        headers: {},
        data: newId(),
        status: 200,
        statusText: 'success'
      })
    }, 200))
  }

  static async signUp (user: UserEntity): Promise<AxiosResponse<SignUpResponse>> {
    // return this.httpService.post('/user', user)
    console.log('signUp', user)
    return new Promise((resolve) => setTimeout(() => {
      resolve({
        config: {},
        headers: {},
        data: {
          user: UserEntity.parse({
            ...user,
            ...{
              id: newId(),
              password: '',
              confirmPassword: ''
            }
          }),
          idToken: newId()
        },
        status: 200,
        statusText: 'success'
      })
    }, 1000))
  }
}
