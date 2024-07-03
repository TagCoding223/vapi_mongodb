const {MongoClient} = require('C:/Users/a1/AppData/Roaming/npm/node_modules/mongodb');

const connectDB = async (uri)=>{
    const client = new MongoClient(uri)
    await client.connect()
    const db = client.db('vapi')
    const collection = db.collection('news')
    console.log("New db Connection created !!!");
    // console.log(collection,db,client);
    // return [collection,db]
    return collection
}

module.exports=connectDB