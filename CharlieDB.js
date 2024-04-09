const ORM = {
    select: function (query, table, whereCOL, whereVAL) {
        var result;

        if (whereCOL && whereVAL) {
            result = `SELECT ${query} FROM ${table} WHERE ${whereCOL} = '${whereVAL}'`
        } else {
            result = `SELECT ${query} FROM ${table}`
        }
       
        return result
    }, 
    insert: function (table, columnNames) {
        let no_of_columns = '';
        for (let i = 0; i < columnNames.length; i++) {
           const each = columnNames[i];
            no_of_columns += '?,'
        }
        no_of_columns = no_of_columns.slice(0, -1)
        
        //no_of_columns += no_of_columns.charAt(no_of_columns.lastIndexOf(',')).replace(',', '')
        var result = `INSERT INTO ${table} (${columnNames}) VALUES (${no_of_columns})`
        return result
    },
    update: function (table, col, val, whereCOL, whereVAL) {
        let result;
        if (whereCOL && whereVAL) {
            result = `UPDATE ${table} SET ${col} = '${val}' WHERE ${whereCOL} = '${whereVAL}'`
        } else {
            result = `UPDATE ${table} SET ${col} = '${val}'`
        }
        
        return result
    },
    delete: function (table, whereCOL, whereVAL) {
        let result = `DELETE FROM ${table} WHERE ${whereCOL} = '${whereVAL}'`
        return result
    }
}
module.exports = ORM;
