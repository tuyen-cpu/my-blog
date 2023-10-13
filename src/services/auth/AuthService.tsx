import axios from 'axios'
import { SignInRequest, SignUpForm, UserLogin } from '@/model/user.model'
import { handleError } from '@/utils/fn'
import { getLocalStorage, saveLocalStorage } from '@/utils/local-storage'

const URL = 'http://localhost:8080'
axios.interceptors.request.use(config => {
  const userLocalStorage = (getLocalStorage('user') as UserLogin )
  if(userLocalStorage && userLocalStorage.accessToken){
    config.headers.Authorization = userLocalStorage.accessToken
  }
  return config;
});
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
    const response = await axios.post(`${URL}/auth/sign-in`, requestData,{withCredentials:true})
    return response.data
  } catch (err: any) {
    handleError(err)
  }
}
const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${URL}/auth/me`,{withCredentials:true})
    return response.data
  } catch (err: any) {
    handleError(err)
  }
}


export { signUp, signIn, getCurrentUser }
