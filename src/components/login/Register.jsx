import { FormControl, Button, Alert } from 'react-bootstrap'
import { useState } from 'react'

import RegisterCSS from './Register.module.css'
import { getRefreshToken, register } from '../../api'
import { INVENTORY_UI_URI } from '../../utilities/constant'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [statusCode, setStatusCode] = useState(0)
  const [responseMessage, setResponseMessage] = useState('')
  const [submitDisabled, setSubmitDisabled] = useState(false)

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()

    if (confirmPassword !== password) {
      setResponseMessage("Passwords don't match")
      return
    }

    setResponseMessage('')
    setSubmitDisabled(true)
    try {
      const response = await register(username, password)
      setStatusCode(response.status)
      if (response.status === 201) {
        setSubmitDisabled(false)
        setResponseMessage(`Account ${username} was Created!`)
        const token = await getRefreshToken(username, password)
        window.location.replace(`${INVENTORY_UI_URI}?token=${token}`)
      }
    } catch (error) {
      setStatusCode(error.response.status || 500)
      setResponseMessage(error.response.data.errorMessage || 'An unexpected error occured')
      setSubmitDisabled(false)
    }
  }

  return (
    <form className={RegisterCSS.register_form} onSubmit={handleRegisterSubmit}>
      <FormControl
        className='my-3 p-2'
        type='text'
        placeholder='Username'
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <FormControl
        className='my-3 p-2'
        type='password'
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <FormControl
        className='my-3 p-2'
        type='password'
        placeholder='Conirm Password'
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        required
      />
      {
        responseMessage &&
          <Alert variant={statusCode === 201 ? 'success' : 'danger'}>
            {responseMessage}
          </Alert>
      }
      <br />
      <div className='d-grid gap-2'>
        <Button type='submit' variant='primary' size='lg' disabled={submitDisabled}>
          {submitDisabled ? 'Loading...' : 'CREATE ACCOUNT'}
        </Button>
      </div>
    </form>
  )
}
export default Register
