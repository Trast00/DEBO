import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const connectionURI = process.env.DB_URI //
const dbName = process.env.DB_NAME //"DI_dev"
let _db;
const mongoConnect = (callback) => {
    MongoClient.connect(connectionURI).then(client => {
        _db = client.db(dbName)
        callback()
    }).catch(err => {
        throw new Error("Connexion to dicko.dev failed:", err);
    })
}

const getDb = () => {
    if(_db) {
        return _db
    }
    throw new Error("Db doesn't exist: connexion to dicko.dev probably failed")
}

export {mongoConnect, getDb}