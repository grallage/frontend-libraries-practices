import jwt_decode from 'jwt-decode'

const debug = false
/**
 *
 * IMPORTANT: This library doesn't validate the token, any well formed JWT can be decoded.
 * You should validate the token in your server-side logic by using something like
 * express-jwt, koa-jwt, Owin Bearer JWT, etc.
 * @param token jwt token
 * @param offset number
 * @returns
 */
export const isJwtExpired = (token: string, offset: number = 60) => {
  // offset by 60 seconds, so we will check if the token is "almost expired".
  if (offset < 0) offset = 0
  const currentTime = Math.round(Date.now() / 1000 + offset)
  const decoded: any = jwt_decode(token)
  console.log(decoded)

  if (debug) {
    console.log(
      `## Current time + ${offset} seconds: ${new Date(currentTime * 1000)}`
    )
    console.log(`## Token lifetime: ${new Date(decoded['exp'] * 1000)}`)
  }

  if (decoded['exp']) {
    const adjustedExpiry = decoded['exp']

    if (adjustedExpiry < currentTime) {
      console.log('## Token expired')
      return true
    }
    if (debug) {
      console.log('## #Token has not expired yet')
    }
    return false
  }
  if (debug) {
    console.log('## Token["exp"] does not exist')
  }

  return true
}
