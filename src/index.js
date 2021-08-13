import './config/index.js'
import { app } from './app/index.js'

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Escuchando en puerto ${PORT}`)
})