# READ ME

## Description
This is the backend of the DEBO project. It is a RESTful API that provides the necessary endpoints for the frontend to interact with the database.

## Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose

## Endpoints
### GET /tenders
will response with
```js
[
  {
    _id: new ObjectId('668aa1c686f695c7b3b6a305'),
    title: 'Dummy Tender',
    description: 'This is a dummy tender',
    country: 'Nigeria',
    field: 'Agriculture',
    dates: { publish: '2022-07-06', expire: '2022-07-06' },
    buyer: {
      uuid: 'auth0|667ac6a742af15aa920c997d',
      name: 'dicko.tester',
      email: 'dicko.tester@gmail.com'
    },
    pdfUrl: 'https://www.google.com',
    tags: [ 'dummy', 'tender' ],
    budget: { value: 1000000, currency: 'USD' }
  }
]
```
### POST /tenders
will response with
```json
{
  "acknowledged": true,
  "insertedId": "668abe493c660e6c17f8e75a"
}
```
### GET /tenders/:id
will response with
```js
{
  _id: new ObjectId('668aa2b278bf23115b73f656'),
  title: 'Updated Thunder Tender 1',
  description: 'This is a dummy tender',
  country: 'Nigeria',
  field: 'Agriculture',
  dates: { publish: '2022-07-06', expire: '2022-07-06' },
  buyer: {
    uuid: 'auth0|667ac6a742af15aa920c997d',
    name: 'dicko.tester',
    email: 'dicko.tester@gmail.com'
  },
  pdfUrl: 'https://www.google.com',
  tags: [ 'dummy', 'tender' ],
  budget: { value: 1000000, currency: 'USD' }
}
```

### PUT /tenders/:id
will response
```json
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}
```

### DELETE /tenders/:id
will response with
```js
{
  acknowledged: true,
  deletedCount: 1
}
```
will response if not found with
```js
{
  acknowledged: true,
  deletedCount: 0
}
```