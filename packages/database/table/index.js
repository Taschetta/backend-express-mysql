

export const configTable = ({ database }) => ({ name: table }) => {
  return {
    
    async findMany(filters = {}) {
      filters = formatFilters(filters)  
      return await database.query(`SELECT * FROM ?? ${filters}`, [ table ])
    },
  
    async findOne(filters) {
      filters = formatFilters(filters)
      return await database.query(`SELECT * FROM ?? ${filters} LIMIT 1`, [ table ])
    },
  
    async insertOne(item) {
      let result
      
      result = await database.query('INSERT INTO ?? (??) VALUES (?)', [
        table,
        Object.keys(item),
        Object.values(item),
      ])

      result = await database.query('SELECT * FROM ?? WHERE `id` = ?', [
        table,
        result.insertId
      ])

      return result
    },
  
    async insertMany(items = []) {
      let result
      result = items.map(item => this.insertOne(item))
      result = await Promise.all(result)
      return result
    },

  }
  
  function formatFilters(filters = {}) {
    filters = Object.entries(filters)

    if(!filters.length) return ''
    
    filters = filters.map(([column, value]) => database.format('?? = ?', [column, value]))
    filters = filters.join(' AND ')

    return `WHERE ${filters}`
  }  
}