
/**
 * @param {Object} config
 * @param {import("express")} config.express
 */
export const configApp = ({ express, handler }) => (routes = {}) => {
  const app = express()
  
  app.use(express.json())    
  app.use(cors)

  addRoutes(routes)
  
  app.all('*', (req, res) => {
    res
      .status(404)
      .send({
        success: false,
        message: `La ruta ${req.method} ${req.path} no existe`,
      })
  })
  
  return app

  function cors(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next()
  }

  function addRoutes(routes) {
    Object.entries(routes).forEach(([route, value]) => {
      return (value.name == 'router')
        ? addRouter(route, value)
        : addMethods(route, value)
    })

    function addRouter(route, router) {
      app.use(route, router)
    }

    function addMethods(route, value) {
      Object.entries(value).forEach(([method, callback]) => {
        app[method](route, handler(callback))
      })
    }
  }

}