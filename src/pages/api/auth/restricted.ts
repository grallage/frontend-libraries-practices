import type { NextApiRequest, NextApiResponse } from 'next'

import { unstable_getServerSession } from 'next-auth/next'

import { authOptions } from './[...nextauth]'

export default async function protectedHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Server Side fetch data
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    return res.send({
      content:
        'This is protected content. You can access this content because you are signed in.',
    })
  }

  res.send({
    error: 'You must be sign in to view the protected content on this page.',
  })
}

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   const session = await unstable_getServerSession(req, res, authOptions)

//   if (session) {
//     res.send({
//       content:
//         'This is protected content. You can access this content because you are signed in.',
//     })
//   } else {
//     res.send({
//       error:
//         'You must be signed in to view the protected content on this page.',
//     })
//   }
// }
