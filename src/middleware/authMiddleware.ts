import SecureLS from 'secure-ls'
const ls = new SecureLS({
  encodingType: 'aes',
  isCompression: false,
  encryptionSecret: import.meta.env.VITE_APP_APISECRET,
})
const authMiddleware = () => (next: any) => (action: any) => {
  const ld = localStorage.getItem('loginData')
  let loginData = []
  const date = new Date()
  const removeLs = () => {
    localStorage.removeItem('loginData')
  }
  if (ld !== null) {
    loginData = JSON.parse(ls.get('loginData'))
  } else {
    removeLs()
  }
  try {
    if ((loginData.expired < date.getTime() / 1000)) {
      removeLs()
    }
  } catch (e) {
    console.log('err auth', e)
  }
  next(action)
}

export default authMiddleware
