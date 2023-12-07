import axios from 'axios'
import { registerUrl } from '../utilities/constant'

export function register (username, password) {
  return axios({
    url: `${registerUrl}/accounts`,
    method: 'post',
    data: { username, password }
  })
}

export async function getRefreshToken (username, password) {
  const { data: { refreshToken } } = await axios({
    url: `${registerUrl}/auth/login`,
    method: 'post',
    data: {
      username,
      password,
      type: 'credentials',
      clientType: 'game'
    }
  })

  return refreshToken.value
}
