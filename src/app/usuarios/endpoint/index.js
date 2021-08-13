
export const useEndpoint = ({ controller }) => ({

  async findMany({ request }) {
    const items = await controller.findMany(request.query)
    return {
      success: true,
      items,
    }
  },

  async findOne({ request }) {
    const item = await controller.findOne({ id: request.params.id })
    return {
      success: true,
      item,
    }
  },

  async insertOne({ request }) {
    const item = await controller.insertOne(request.body)
    return {
      success: true,
      item,
    }
  },

  async updateOne({ request }) {
    let item 
    
    item = { ...request.body, id: request.params.id, }
    item = await controller.updateOne(item)

    
    return {
      success: true,
      item,
    }
  },

  async removeOne({ request }) {
    let id = request.params.id
    let result = await controller.removeOne({ id })

    return {
      success: true,
      removedId: +id,
      removedCount: result
    }
  },
  
})