const db = require("../db/db")


async function getUsersWithPosts() {
    const query = `
    SELECT users.id, users.username, posts.title
    FROM users
    INNER JOIN posts ON users.id=posts.user_id 
    `
    try {
        const res = await db.query(query);
        console.log(res.rows);
        return res.rows;
    } catch (e) {
        console.log(e);
    }
}


async function getAllUsersPosts() {
    const query=`
    SELECT users.id,users.username,posts.title
    FROM users
    LEFT JOIN posts ON users.id=posts.user_id
    `
    try {
        const res = await db.query(query);
        console.log(res.rows);
        return res.rows;
    } catch (e) {
        console.log(e);
    }
}


module.exports = {
    getUsersWithPosts,
    getAllUsersPosts
}