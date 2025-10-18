const db = require("../db/db");


async function createUsersTable() {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
    `;

    try {
        await db.query(createTableQuery)
        console.log("user table created successfully")
    } catch (e) {
        console.log("Error while creating user table", e);
    }
}


async function insertUser(email, password) {
    const insertUser = `
    INSERT INTO users(username,email)
    VALUES($1,$2)
    RETURNING *
    `
    try {
        const res = await db.query(insertUser, [email, password])
        console.log(res.rows[0]);

        return res.rows[0]
    } catch (e) {
        console.log("Error while inserting user table", e);

    }
}

async function getAllUsers() {
    const query=`
    SELECT * FROM users
    `
    try{
        const res=await db.query(query)
        console.log(res.rows);
        
        return res.rows;
    }catch(e){
        console.log(e)
    }
}

async function updateUser(username,email) {
    const query=`
    UPDATE users SET email=$2 WHERE username=$1
    RETURNING *
    `
    try{
        const res=await db.query(query,[username,email]);
        console.log(res.rows[0])
        return res.rows[0];
    }catch(e){
        console.log(e)
    }
}


async function deleteUser(email) {
    const query=`
    DELETE FROM users WHERE email=$1
    RETURNING *
    `
    try{
        const res=await db.query(query,[email])
        console.log(res.rows[0])
        return res.rows[0]
    }catch(e){
        console.log(e);
    }
}
module.exports = {
    createUsersTable,
    insertUser,
    getAllUsers,
    updateUser,
    deleteUser
}