// this is second connect file to implement close connection
// when you ovserve api logs and database logs then you really understand who to implement connection

const path = require('path');
const connectDB = require("../db/connect");
const { title } = require('process');
require('C:/Users/a1/AppData/Roaming/npm/node_modules/dotenv').config()

// try to define connection globally
// let collectionMain
// (async () => {
//     collectionMain = await connectDB(process.env.DB_URI)
// })()

// home page
const homePage = async (req, res) => {
    // res.status(200).send("hello");
    res.status(200).sendFile(path.resolve(__dirname, "../static/index.html"))
}

// All news response page
const allNews = async (req, res) => {
    const client = await connectDB(process.env.DB_URI)
    const db = client.db('vapi')
    try {
        const collection = db.collection('news')
        const data = await collection.find().sort({ news_id: 1 }).project({ _id: 0 }).toArray()
        // const data = await collectionMain[0].find().sort({ news_id: 1 }).project({ _id: 0 }).toArray()
        // const data = await collection.aggregate([{$project:{_id:0}},{$sort:{news_id:1}}]).toArray()
        console.log(data);
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
    } finally {
        // await collectionMain[1].close()
        if(client.close()){
            console.log("Connection Close");
        }

    }

}

// specific news
const idNews = async (req, res) => {
    const client = await connectDB(process.env.DB_URI)
    const db = client.db('vapi')
    try {
        const collection = db.collection('news')
        // console.log(typeof(req.params.num_id));
        const id = Number.parseInt(await req.params.num_id)

        const query = { news_id: id }
        // const data = await collection.find({price :{$gt:price}}).toArray()
        const data = await collection.find(query).project({ _id: 0 }).toArray()
        // const data = await collectionMain[0].find(query).project({ _id: 0 }).toArray()

        console.log(data);
        res.status(200).send(data)
    } catch (error) {
        console.log(error);
    } finally {
        client.close()
    }
}

// create a news
const postNews = async (req, res) => {
    const client = await connectDB(process.env.DB_URI)
    const db = client.db('vapi')
    try {
        const collection = db.collection('news')
        const nextIdObj = await collection.find().project({ news_id: 1, _id: 0 }).sort({ "news_id": -1 }).limit(1).toArray();
        // console.log(nextIdObj);
        const nextId = await nextIdObj[0].news_id + 1;
        // console.log(nextId);

        const d = new Date()
        const data = {
            news_id: nextId,
            title: req.body.title,
            news_link: req.body.news_link,
            image_link: req.body.image_link,
            news_host: req.body.news_host,
            posted_in: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
        }

        const result = await collection.insertOne(data)
        console.log(result);
        // res.status(200).send(result)
        res.status(200).send({ "status": `Insertion successfully done !!!`, "acknowledged": true, "news_id": nextId })
    } catch (error) {
        console.log(error);
    } finally {
        client.close()
    }
}


// update news
const updateNews = async (req, res) => {
    const client = await connectDB(process.env.DB_URI)
    const db = client.db('vapi')
    try {
        const collection = db.collection('news')
        const d = new Date()
        const result = await collection.updateOne({ news_id: req.body.id }, {
            $set: {
                title: req.body.title,
                news_link: req.body.news_link,
                image_link: req.body.image_link,
                news_host: req.body.news_host,
                posted_in: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
            }
        })
        console.log(result);
        if (result.matchedCount == 0) {
            res.status(200).send({ result: result, status: "No match found !!!" })
        } else {
            res.status(200).send({ result: result, status: "Updation successfully done !!!" })
        }
    } catch (error) {
        console.log(error);
    } finally {
        client.close()
    }
}

// delete news
const deleteNews = async (req, res) => {
    const client = await connectDB(process.env.DB_URI)
    const db = client.db('vapi')
    try {
        const collection = db.collection('news')
        const result = await collection.deleteOne({ news_id: req.body.id });
        console.log(result);
        if (result.deletedCount == 0) {
            res.status(200).send({
                result: result,
                status: "News id not match !!!"
            })
        } else {
            res.status(200).send({
                result: result,
                status: "News successfully deleted !!!"
            })
        }
    } catch (error) {
        console.log(error);
    } finally {
        client.close()
    }
}
module.exports = { homePage, allNews, idNews, postNews, updateNews, deleteNews }