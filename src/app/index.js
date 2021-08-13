import { makeApp } from '@packages/router'

import * as usuarios from './usuarios/index.js'

export const app = makeApp({
  '/usuarios': usuarios.router,
  '/': {
    get: () => ({
      success: true,
      message: 'API de Ejemplo'
    })
  }
})