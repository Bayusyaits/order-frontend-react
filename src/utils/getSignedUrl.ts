import { ajax } from 'rxjs/ajax'
import { from } from 'rxjs'

const getSignedUrlEndpoint = `${import.meta.env.REACT_APP_SERVER_HOST}/get-signed-url`

interface Options {
  action: 'read' | 'write' | 'delete'
  bucketType?: 'private' | 'public' | 'legacy'
  filePath?: string // 
  URI?: string // 
}

const getSignedURL = ({ action, bucketType, filePath, URI }: Options) => {
  const body: any = {
    action,
  }

  if (bucketType && filePath && action === 'write') {
    // To upload a new file
    if (!filePath.includes('/')) {
      throw new Error('File path must include a "/". Files should not be placed in the bucket root')
    }
    body.bucketType = bucketType
    body.filePath = filePath
  } else if (URI && action !== 'write') {
    // To download or delete a file
    if (!URI.startsWith('gs://')) {
      throw new Error('Incorrect Cloud Storage URI format. URI must start with "gs://"')
    }

    body.URI = URI
    body.bucketType = 'private'
    body.filePath = URI.replace(`${import.meta.env.REACT_APP_PRIVATE_BUCKET}/`, '')
  } else {
    throw new Error('Invalid function parameters')
  }

  return ajax({
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    url: getSignedUrlEndpoint,
    body: JSON.stringify(body),
  })
}

getSignedURL.putFile = function putFile(signedURL: string, file: File) {
  return ajax({
    method: 'put',
    url: signedURL,
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  })
}

getSignedURL.getFile = (signedUrl: string, nameFile = `file-${new Date().getTime()}`) =>
  from(
    fetch(signedUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }
        return res.blob()
      })
      .then((blob) => new File([blob], nameFile, { type: blob.type })),
  )

export default getSignedURL
