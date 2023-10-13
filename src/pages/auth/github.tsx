import Login from '@/components/Auth/Login'
import React, { useEffect } from 'react'
import { getCurrentUser } from '@/services/auth/AuthService'
import { useRouter } from 'next/router'
import { saveLocalStorage } from '@/utils/local-storage'

const GithubPage = (props: any) => {
  const router = useRouter()
  const { token } = router.query
  useEffect(() => {
    if (token) {
      saveLocalStorage('user', { accessToken: token })
    }
  }, [token])

  return 'hihih'
}
export default GithubPage
