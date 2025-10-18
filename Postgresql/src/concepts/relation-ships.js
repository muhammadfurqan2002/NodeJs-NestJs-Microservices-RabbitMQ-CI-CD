const db = require("../db/db")


async function createPostTbale() {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    content TEXT,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
    `
    try{
        await db.query(createTableQuery);
        console.log("Posts table created")
    }catch(e){
        console.log(e);
        
    }
}

async function insertNewPost(title,content,userId) {
    const query=`
    INSERT INTO posts (title,content,user_id)
    VALUES ($1,$2,$3)
    RETURNING *
    `
    try{
        const res=await db.query(query,[title,content,userId])
        console.log(res.rows[0])
        return res.rows[0];
    }catch(e){
        console.log(e);
        
    }
}
module.exports={
    createPostTbale,
    insertNewPost
}