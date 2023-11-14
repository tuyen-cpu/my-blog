import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import NextLink from 'next/link'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import LoadingButton from '@mui/lab/LoadingButton'
import { Regex } from '@/utils/constant'
import { useRouter } from 'next/router'
import LoadingIcon from '@/components/LoadingIcon'
import { SignInRequest, UserLogin } from '@/model/user.model'
import { popupCenter } from '@/utils/fn'
import GoogleButton from '@/components/Button/GoogleButton'
import { GithubLoginButton } from 'react-social-login-buttons'
import { getCurrentUser, signIn } from '@/services/auth/AuthService'
import { getLocalStorage } from '@/utils/local-storage'


const schema = yup.object().shape({
  email: yup
    .string()
    .matches(Regex.EMAIL, 'Invalid Email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
})

export default function Login() {
  const router = useRouter()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [notify, setNotify] = useState<{ type: 'success' | 'error'; message: string }>({
    type: 'success',
    message: '',
  })
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInRequest>({
    resolver: yupResolver(schema),
    mode: 'all',
  })
  const onSubmit = async (requestData: SignInRequest) => {
    setIsLoading(true)
    try {
      const response = await signIn(requestData)
      console.log(response)
    } catch (error: any) {
      setNotify({ type: 'error', message: error.message })
      setSnackbarOpen(true)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 400)
    }
  }

  useEffect(() => {
  }, [])

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const handleLoginWithGithub = () => {
    const popup = popupCenter(
      'http://localhost:8080/oauth2/authorize/github?redirect_uri=http://localhost:3000/auth/github',
      '',
      600,
      800,
      ()=>{
        const user = getLocalStorage("user") as UserLogin;
        if(user) {
          router.push("/").then((e)=>console.log(e))
        }else{
          alert("authen failed")
        }
      },():boolean=>{
        const user = getLocalStorage("user") as UserLogin;
        return !!user
      }
      )
  }

  return (
    <Container component='main' maxWidth='sm'>
      <CssBaseline />
      <Grid container justifyContent='center' alignItems='center'>
        <Grid item sx={{ borderRadius: 0 }}>
          <Avatar
            alt='Logo'
            src='/images/logo.png'
            style={{ width: '100px', height: '100px', borderRadius: 0 }} // Thay đổi kích thước của Avatar tại đây
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          marginTop: 4,
          padding: 4,
          borderRadius: 2.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '#00000033 0 8px 24px',
        }}
        bgcolor='background.paper'
      >
        <Typography component='h1' variant='h1' sx={{ fontWeight: 'bold' }}>
          YOLO
        </Typography>
        <Typography component='p' variant='body1' sx={{ mt: 1.4, opacity: 0.6 }}>
          Hi, welcome back!
        </Typography>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
          <TextField
            // sx={{ backgroundColor:'background.input',}}
            // sx={{color:'text.primary'}}
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            autoComplete='off'
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            // onChange={() => trigger('chatform')}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            inputProps={{
              maxLength: 30,
            }}
            sx={{ color: 'text.primary' }}
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            // onChange={() => trigger('password')}
          />
          <LoadingButton
            disabled={!isValid}
            type='submit'
            fullWidth
            loading={isLoading}
            loadingIndicator='Loading…'
            variant='contained'
            sx={{
              mt: 3,
              mb: 2,
              py: 1.4,
              color: 'text.custom',
            }}
          >
            Sign In
          </LoadingButton>
          <Divider> <Typography component='p' variant='subtitle2' sx={{ opacity: 0.7 }}>OR</Typography></Divider>

          <Box marginTop={2} display='flex' justifyContent='center' alignItems='center'>
            {/*<GoogleButton onClick={() => popupCenter('/auth/google-signIn', 'Sign in with Google')} />*/}
          </Box>
          <Box marginTop={2} display='flex' justifyContent='center' alignItems='center'>
            <GithubLoginButton onClick={
              handleLoginWithGithub
            } />
          </Box>
          <Grid marginTop={3} container justifyContent='flex-end'>
            <Grid item xs>
              <Link href='/auth/signup' component={NextLink}>
                <Typography component='p' variant='subtitle2'>Forgot password?</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link href='/auth/signup' component={NextLink}>
                <Typography component='p' variant='subtitle2'>{'Don\'t have an account? Sign Up'}</Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          severity={notify.type}
          variant='filled'
          sx={{ width: '100%' }}
          onClose={() => setSnackbarOpen(false)}
        >
          {notify.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}
