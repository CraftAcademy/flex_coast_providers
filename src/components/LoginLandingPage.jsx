import React from 'react'
import loginImage from '../assets/login-image.jpg'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Authentication from '../modules/Authentication'
import { ReactComponent as ReactLogo } from '../assets/logo_4.svg'

const LoginLandingPage = () => {
  const handleLogin = (event) => {
    event.preventDefault()
    Authentication.signIn(event.target)
  }
  return (
    <div className='login-page'>
      <img src={loginImage} className='login-image' alt='office background' />
      <div className='login-container'>
        <ReactLogo className='login-logo' />
        <h1>Sign in</h1>
        <form onSubmit={handleLogin} className='form-container'>
          <TextField
            name='email'
            label='Email'
            type='email'
            variant='outlined'
            data-cy='email-field'
          />
          <TextField
            name='password'
            label='Password'
            type='password'
            variant='outlined'
            data-cy='password-field'
          />
          <Button
            type='submit'
            variant='outlined'
            color='primary'
            data-cy='login-btn'>
            Login
          </Button>
        </form>
        <p>Copyright © Flex Coast {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}

export default LoginLandingPage
