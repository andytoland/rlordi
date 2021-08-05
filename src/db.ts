import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'test',
    password: 'test',
    database: 'rakennuslordi',
    connectionLimit: 1
});

//gets data from databse
export async function doReadQuery(query: string): Promise<any> {
    let conn;
    let result = {}
    try {
        conn = await pool.getConnection();
        result = await conn.query(query);
        console.log(JSON.stringify(result));
    } catch (err) {
        console.log(err); //[ {val: 1}, meta: ... ]
        throw err;
    } finally {
        if (conn)  conn.end();
        return result; // return has to be here because finally executes last
    }
}

//insert data to database. Returns true if successful, false if not
export async function doInsertQuery(query: string): Promise<boolean> {
    let conn;
    let result = {"affectedRows": 1}
    let returnValue = false
    try {
        conn = await pool.getConnection();
        result = await conn.query(query)
        console.log(JSON.stringify(result));
        if( result && result.affectedRows !== undefined &&result.affectedRows > 0) {
            console.log("inserted data successfully");
            returnValue = true;
        }
    } catch (err) {
        console.log(err); //[ {val: 1}, meta: ... ]
        throw err;
    } finally {
        if (conn)  conn.end();
        return returnValue; // return has to be here because finally executes last
    }
}
