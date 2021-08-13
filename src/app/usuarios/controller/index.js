
export const useController = ({ table }) => ({

  async findMany(filters) {
    let result
    result = await table.findMany(filters)
    return result
  },

  async findOne(filters) {
    let result
    result = await table.findOne(filters)
    return result
  },

  async insertOne(item) {
    let result
    result = await table.insertOne(item)
    return result
  },

  async updateOne(item) {
    let result
    result = await table.updateOne(item)
    return result
  },

  async removeOne(filters) {
    let result
    result = await table.removeOne(filters)
    return result
  },
  
})