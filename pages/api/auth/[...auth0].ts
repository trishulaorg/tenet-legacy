import type { NextApiRequest, NextApiResponse } from 'next'
import { getInstance } from '../../../libs/auth0'
const audience = process.env['AUTH0_AUDIENCE']

function getUrls(req: NextApiRequest) {
  const host = req.headers['host']
  const protocol = process.env['VERCEL_URL'] ? 'https' : 'http'
  const redirectUri = `${protocol}://${host}/api/auth/callback`
  const returnTo = `${protocol}://${host}`
  return {
    redirectUri,
    returnTo,
  }
}

export default getInstance().handleAuth({
  async callback(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { redirectUri } = getUrls(req)
      await getInstance().handleCallback(req, res, { redirectUri: redirectUri })
    } catch (error: any) {
      res.status(error.status || 500).end(error.message)
    }
  },

  async login(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { redirectUri, returnTo } = getUrls(req)

      await getInstance().handleLogin(req, res, {
        authorizationParams: {
          audience: audience!,
          redirect_uri: redirectUri,
        },
        returnTo: returnTo,
      })
    } catch (error: any) {
      res.status(error.status || 400).end(error.message)
    }
  },

  async logout(req: NextApiRequest, res: NextApiResponse) {
    const { returnTo } = getUrls(req)
    await getInstance().handleLogout(req, res, {
      returnTo: returnTo,
    })
  },
})
