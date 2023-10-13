export interface JwtUser {
  id?: number,
  firstName?: string,
  lastName?: string,
  email?: string,
  accessToken: string
}

export interface UserLogin{
  id?:number
  username?:string
  email?:string
  roles?:string[]
  accessToken?:string
}
export interface SignInRequest {
  email: string
  password: string
}

export interface SignUpForm {
  firstName: string
  lastName: string
  email: string
  password: string
}