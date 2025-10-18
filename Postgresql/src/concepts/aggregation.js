const db = require("../db/db")


async function countPostsByUser() {
    const query = `
    SELECT users.username, COUNT(posts.id) as post_count
    FROM users
    LEFT JOIN posts ON users.id=posts.user_id
    GROUP BY users.id,users.username
    `
    try {
        const res = await db.query(query);
        console.log(res.rows);
        return res.rows
    } catch (e) {
        console.log(e);

    }
}
async function averagePostsUsers() {
    const query = `
  SELECT AVG(post_count) AS posts_average
  FROM (
    SELECT users.id, users.username, COUNT(posts.id) AS post_count
    FROM users
    LEFT JOIN posts ON users.id = posts.user_id
    GROUP BY users.id, users.username
  ) AS user_per_count
`;

    try {
        const res = await db.query(query);
        console.log(res.rows);
        return res.rows
    } catch (e) {
        console.log(e);

    }
}


module.exports = {
    countPostsByUser,
    averagePostsUsers

}