import path from 'path';
import { fileURLToPath } from 'url';
import protect from 'static-auth'
import safeCompare from 'safe-compare'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USER_NAME = process.env.USER_NAME || 'admin'
const PASSWORD = process.env.PASSWORD || 'admin'

const app = protect(
  '/',
  (username, password) => safeCompare(username, USER_NAME) && safeCompare(password, PASSWORD),
  {
    directory: `${__dirname}/public`,
    onAuthFailed: (res) => {
      res.end('Authentication failed')
    },
  }
)

export default app