const db = require("../db/db")



async function getUsersWhere(condition) {
    const query = `
        SELECT * FROM users
        WHERE ${condition}
    `;
    try {
        const res = await db.query(query);
        console.log(res.rows);
        return res.rows;
    } catch (e) {
        console.log(e);
    }
}
async function getUsersSorted(column,order="ASC") {
    const query = `
        SELECT * FROM users
        ORDER BY ${column} ${order}
    `;
    try {
        const res = await db.query(query);
        console.log(res.rows);
        return res.rows;
    } catch (e) {
        console.log(e);
    }
}
async function getUsersPaginated(limit,offset) {
    const query = `
        SELECT * FROM users
        LIMIT $1 OFFSET $2
    `;
    try {
        const res = await db.query(query,[limit,offset]);
        console.log(res.rows);
        return res.rows;
    } catch (e) {
        console.log(e);
    }
}


module.exports = {
    getUsersWhere,
    getUsersSorted,
    getUsersPaginated
}