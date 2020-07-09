import './utils/modulesAlias'

import http from 'http'
import { createApiServer } from './app'
import umzug from 'drivers/umzug'

const PORT = process.env.NODE_HODGEPODGE_PORT || 3000

async function main() {
  await umzug.umzugUp()

  const app = await createApiServer()
  const server = http.createServer(app.callback())
  server.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`)
  })
}

main()
