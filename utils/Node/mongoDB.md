# Mongo DB


## Setup

### Create mongoDB cloud account

### Install MongoDB driver
```bash
  npm install --save mongodb
```

## MVC

### Create Mongo Clients
```js
  const mongodb = require('mongodb');
  const MongoClient = mongodb.MongoClient;
  MongoClient.connect("url_generated") //ex: mongodb+srv://
```

### Models
