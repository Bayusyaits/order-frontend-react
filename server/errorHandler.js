// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = (err, req, res, next) => {
  console.log('Caught by error handler')
  console.log(err)

  const code = err.code || 500
  let message
  if (!err) {
    message = 'Internal server error'
  } else if (typeof err.message === 'string') {
    message = err.message
  } else if (typeof err === 'string') {
    message = err
  } else {
    message = JSON.stringify(err)
  }

  res.status(code).json({ message, data: err.data })
}
