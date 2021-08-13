
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
    return {
      success: false,
      message: 'Not Implemented'
    }
  },

  async removeOne({ request   }) {
    return {
      success: false,
      message: 'Not Implemented'
    }
  },
  
})