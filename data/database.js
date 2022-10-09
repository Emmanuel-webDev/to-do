const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

//let mongodbURL = "mongodb://127.0.0.1:27017"



let database;
async function connection(){
 const client =  await MongoClient.connect(process.env.MONGO_URL);
 database = client.db('Todolist')

}

function getdb (){
    if(!database){
        throw{message: 'Database not established'}
    }
    return database;
}

module.exports = {
    connection: connection,
    getdb: getdb
}