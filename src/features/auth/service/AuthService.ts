import ApiService from '@/core/services/ApiService'
import { ChangePasswordDTO, UpdatePreferenceDTO, User, UserEntity } from '@/models'
import { AxiosResponse } from 'axios'

type SignUpResponse = {
  user: User;
  idToken: string;
}

type SignInResponse = {
  user: User;
  idToken: string;
}

export class AuthService extends ApiService {
  static async signUp (user: UserEntity): Promise<AxiosResponse<SignUpResponse>> {
    return this.httpService.post('/v1/users', user)
  }

  static async signIn ({ email, password }: { email: string, password: string }):
    Promise<AxiosResponse<SignInResponse>> {
    return this.httpService.post('/v1/users/auth/sign-in', { email, password })
  }

  static async refreshToken ({ id, idToken }: { id: string; idToken: string }):
    Promise<AxiosResponse<SignInResponse>> {
    return this.httpService.post(`/v1/users/${id}/auth/refresh-token`, { id, idToken })
  }

  static async putUser (user: UserEntity): Promise<AxiosResponse<User>> {
    return this.httpService.put(`/v1/users/${user.id}`, user)
  }

  static async changePassword (changePasswordDTO: ChangePasswordDTO): Promise<AxiosResponse<SignInResponse>> {
    return this.httpService.put(`/v1/users/${changePasswordDTO.userId}/auth/change-password`, changePasswordDTO)
  }

  static async updatePreferences (updatePreferenceDTO: UpdatePreferenceDTO): Promise<AxiosResponse<User>> {
    return this.httpService.put(`/v1/users/${updatePreferenceDTO.userId}/preferences`, updatePreferenceDTO)
  }
}
