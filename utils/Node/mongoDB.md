# Mongo DB

## Create cloud account
- go to https://www.mongodb.com/
- click on get mongoDB
- signup to mongodb Atlast
- get to the page with dashboard
- create a new cluster with choose free tiers and
- add a least user with read and writte access (save the password as it will be needed)
- go to secure and add you IP address so the PC can connect to the node feature
- wait for the setur to finish
- add a connection to you cluster which will be a application with driver 3.6

Debo info:
username: dickoallassanedev
password: mS7bTmtAZGEFkvAo


## Setup

### Create mongoDB cloud account

### Install MongoDB driver
```bash
  npm install --save mongodb
```

## MVC

### Create Mongo Clients
in utils/database
```js
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (callback) => {
  MongoClient.connect("connexion_url_generated"/*ex: mongodb+srv:/ */).then(client =>
    _db = client.db()
    console.log("connected")
    /* result is a client */
    callback()
  )
  .catch(error => {
    console.log(error)
  }) 
}
const getDb = () => {
  if(_db) {
    return _db;
  }
  throw 'No database found! _db is not defined'
}
module.mongoConnect = mongoConnect;
module.getDb = getDb
```

```js
mongoConnect(() => {
  app.listen(3000)
})
```

### Models


#### Create / Save
```js
const mongoConnect = require('mongodb')
const getDb = require('../utils/database').getDb;
class Product {
  constructor(id, title) {
    this.id = id
    this.title = title
  }
  save() {
    const db = getDb()
    return db.collection('products').insertOne(
      {
        name: this.title
      }
    ).then(result => {console.log(result)}).catch(err => {console.log(err)})
    
  }
}
```

#### Fetch / Get

```js
const mongodb = require('mongodb')
class Product {
  /* ... */
  static fetchAll() {
    return db.collection('product').find(
      /* return a cursor */
    ).toArray().then(result => {
      return products
    }).catch(err => {
      console.log()
    })
  }

  static findById() {
    const db = getDb()
    return db.collection('products').findOne({
      _id: new mongodb.ObjectId(prodId)
    }).then(product => {
      return product
    }).catch()
  }

  /* static mean you can Product.deleteById and not product.deleteById */
  static deleteById() {
    const db = getDb();
    return db.collection('products').deleteOne({
      _id: new mongodb.ObjectId(this.id)
    }).then().catch()
  }

}
```


#### Update
```js
db.collection('products').updateOne({
  _id: new mongodb.ObjectId(this._id)
  /* this object is for the condition so we cannot put the data to update in it */
}, {
  /* updated data should be put in set keyword */
  $set: this
  /* set: {title: this.title ...}*/
})
```

