import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const connectionURI = process.env.DB_URI //
const dbName = process.env.DB_NAME //"DI_dev"
let _db;
const mongoConnect = (callback) => {
    MongoClient.connect(connectionURI).then(client => {
        _db = client.db(dbName)
        console.log("Database connected to dicko.dev")
        callback()
    }).catch(err => {
        console.log("Db couldn't connect to dicko.dev",err)
    })
}

const getDb = () => {
    if(_db) {
        return _db
    }
    throw new Error("Db doesn't exist: connexion to dicko.dev probably failed")
}

export {mongoConnect, getDb}