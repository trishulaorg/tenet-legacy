import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Origin',
    process.env.NODE_ENV === 'production'
      ? 'https://coton.app/'
      : process.env.VERCEL_URL ?? 'http://localhost:8080'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  if (req.method === 'OPTIONS') {
    res.end()
    return
  }
  const data = await fetch(
    process.env.API_SERVER_ENDPOINT ? process.env.API_SERVER_ENDPOINT : 'http://api:4000/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: req.headers.authorization ?? 'Bearer INVALID_TOKEN',
      },
      body: JSON.stringify(req.body),
    }
  )
  const json = await data.json()
  res.json(json)
}

export default handler
