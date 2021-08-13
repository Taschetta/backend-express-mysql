
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
  
})