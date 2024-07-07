import {MongoClient} from 'mongodb';
const connectionURI = process.env.DB_URI //"mongodb+srv://dickoallassanedev:mS7bTmtAZGEFkvAo@cluster0.euhsukz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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