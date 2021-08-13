

export const configTable = ({ database }) => ({ name: table }) => {
  return {
    
    async findMany(filters = {}) {
      filters = formatFilters(filters)  
      return await database.query(`SELECT * FROM ?? ${filters}`, [ table ])
    },
  
    async findOne(filters) {
      let result
      
      filters = formatFilters(filters)
      result = await database.query(`SELECT * FROM ?? ${filters} LIMIT 1`, [ table ])
      
      return result[0]
    },
  
    async insertOne(item) {
      let result
      
      result = await database.query('INSERT INTO ?? (??) VALUES (?)', [
        table,
        Object.keys(item),
        Object.values(item),
      ])

      return await this.findOne({ id: result.insertId })
    },
  
    async insertMany(items = []) {
      let result
      result = items.map(item => this.insertOne(item))
      result = await Promise.all(result)
      return result
    },

    async updateOne({ id, ...item }) {
      let result

      result = await database.query('UPDATE ?? SET ? WHERE `id` = ? LIMIT 1', [
        table,
        item,
        id,
      ])

      return await this.findOne({ id })
    },

    async updateMany(items = []) {
      let result
      result = items.map(item => this.updateMany(item))
      result = await Promise.all(result)
      return result
    },

    async removeOne(filters) {
      let result
      
      filters = formatFilters(filters)
      result = await database.query(`DELETE FROM ?? ${filters} LIMIT 1`, [ table ])
      
      return result.affectedRows
    },

    async removeMany(filters) {
      let result
      
      filters = formatFilters(filters)
      result = await database.query(`DELETE FROM ?? ${filters}`, [ table ])
      
      return result.affectedRows
    }

  }
  
  function formatFilters(filters = {}) {
    filters = Object.entries(filters)

    if(!filters.length) return ''
    
    filters = filters.map(([column, value]) => database.format('?? = ?', [column, value]))
    filters = filters.join(' AND ')

    return `WHERE ${filters}`
  }  
}