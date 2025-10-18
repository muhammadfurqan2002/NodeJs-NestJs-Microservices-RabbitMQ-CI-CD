
require("dotenv").config()
const { countPostsByUser, averagePostsUsers } = require("./concepts/aggregation")
const { createUsersTable, insertUser, getAllUsers, updateUser, deleteUser} = require("./concepts/basic-queries")
const { getUsersWhere, getUsersSorted, getUsersPaginated } = require("./concepts/filter-db")
const { getUsersWithPosts, getAllUsersPosts } = require("./concepts/joins")
const { createPostTbale, insertNewPost } = require("./concepts/relation-ships")


async function testBasicQueries() {
    try {
        // // await createUsersTable();
        // await insertUser("furqan",'furqan@gmail.com')
        // await insertUser("muneeb",'muneeb@gmail.com')
        // await insertUser("haseeb",'haseeb@gmail.com')
        // await insertUser("fatima",'fatima@gmail.com')
        // await insertUser("fiza",'fiza@gmail.com')
        // await insertUser("Abdulrehman",'abdulrrehman@gmail.com')
        // await getAllUsers()
        // await updateUser('furqan@gmail.com',"furqan.b025@gmail.com")
        // await deleteUser("furqan.b025@gmail.com")
        await filterUser()
    } catch (e) {
        console.log("Error", e)
    }
}


async function filterUser() {
    try{
        // await getUsersWhere(`username LIKE 'f%'`)
        // await getUsersSorted("username")
        // await getUsersSorted("createdAt","DESC")
        // await getUsersPaginated(2,1)
    }catch(e){
        console.log(e)
    }
}


async function testRelationQueries() {
    try{
        // await createPostTbale();
        // await insertNewPost("This is my 2nd post","nothing special",5)
        // await getUsersWithPosts()
        // await getAllUsersPosts()
        // await countPostsByUser()
        await averagePostsUsers()
    }catch(e){
        console.log(e);
        
    }
}

async function testAllQueries() {
    // await testBasicQueries()
    await testRelationQueries()
}


testAllQueries()