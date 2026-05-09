import app from './app.js'
import { HOST, PORT} from './src/config/env.js'

app.listen(PORT, () => console.log(`Server starting on ${HOST}:${PORT}`))