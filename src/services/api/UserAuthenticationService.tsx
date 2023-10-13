import axios from 'axios'
import { SignInRequest, SignUpForm } from '@/model/user.model'
import { handleError } from '@/utils/fn'

const URL = 'http://localhost:8080'

const signUp = async (user: SignUpForm) => {
  try {
    const response = await axios.post(`${URL}/register`, user)
    return response.data
  } catch (err) {
    handleError(err)
  }
}

const signIn = async (requestData: SignInRequest) => {
  try {
    const response = await axios.post(`${URL}/auth/sign-in`, requestData)
    return response.data
  } catch (err: any) {
    handleError(err)
  }
}

// const UserAuthenticationService = {
//   signUp,
//   signIn,
// }
//
// export default UserAuthenticationService
export  {signUp, signIn } ;