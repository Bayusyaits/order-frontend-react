import SecureLS from 'secure-ls'
import { UserState } from 'redux/ducks/user'
const ls = new SecureLS({
  encodingType: 'aes',
  isCompression: false,
  encryptionSecret: import.meta.env.VITE_APP_APISECRET,
})

export const hasLoginData = () => !!localStorage.getItem('loginData')
export const getLoginData = () => {
  const ld = localStorage.getItem('loginData')
  if (ld !== null) return JSON.parse(ls.get('loginData'))
}

export const checkLoginData = (loginData: UserState['loginData']) => {
  const date = new Date()
  let step = 2
  try {
    if (
      !loginData ||
      !loginData.loggedIn ||
      (loginData && loginData.expired && loginData.expired < date.getTime() / 1000)
    ) {
      step = 0
    }
  } catch (e) {
    step = -1
  }
  return step
}

export const setLoginData = (
  loginData: UserState['loginData']
) => {
  const date = new Date()
  try {
    if (
      loginData &&
      loginData.expired > date.getTime() / 1000
    ) {
      ls.set('loginData', JSON.stringify(loginData))
    }
  } catch (e) {
    alert('Cannot store Login Data')
  }
}

export const removeLoginData = () => localStorage.removeItem('loginData')
