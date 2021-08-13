/**
 * @param {Object} config
 * @param {import("express")} config.express
 */
export const configRouter = ({ express, handler }) => (routes = {}) => {
  const router = express.Router()
  
  addRoutes(routes)

  return router

  function addRoutes(routes) {
    Object.entries(routes).forEach(([route, value]) => {
      return (value.name == 'router')
        ? addRouter(route, value)
        : addMethods(route, value)
    })

    function addRouter(route, newRouter) {
      router.use(route, newRouter)
    }

    function addMethods(route, value) {
      Object.entries(value).forEach(([method, callback]) => {
        router[method](route, handler(callback))
      })
    }
  }
}