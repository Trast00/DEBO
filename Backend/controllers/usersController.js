import User from "../models/user.js"
import { getDb } from "../utils/database.js"

export const getUser = (req, res, next) => {
    // if user is not in the database, add user to the database
    const uuid = req.params.uuid
    return User.getByUuid(uuid).then(user => {
      // if user not null check if premuim is expired
      if (user && (new Date(user.premuimEndDate)) < (new Date())) {
        user.isPremuim = false
        user.role = "guest"
        user.premuimEndDate = null
        const userUpdated = new User({...user})
        userUpdated.update().then(_ => {
          return res.json(userUpdated)
        }).catch(err => {
          res.status(500).send(err)
          return null
        })
      } else {
        return res.json(user)
      }
    }).catch(err => {
      res.status(500).send(err)
      return null
    })
}

// will return a async function
export const postUser = (req, res, next) => {
  return User.getPremuimStatuByEmail(req.body.user.email).then(premuimUser => {
    const userRole = !premuimUser? "guest": "user"
    return new User({
      uuid: req.body.user.uuid,
      name: req.body.user.nickname,
      email: req.body.user.email,
      role: userRole,
      isPremuim: userRole !== "guest",
      premuimEndDate: premuimUser?.premuimEndDate,
      preference: {
        searchPeference: {},
        hiddenTender: {},
        viewedTender: {},
        savedTender: {}
      }
    }).save()
  }).then(result => {
    return res.json(result)
  }).catch(err => {
    res.status(500).send(err)
    return null
  })
}

// get premuims users
export const getPremuimEmails = (req, res, next) => {
  const db = getDb()
  db.collection('premuim_emails').find().toArray().then(data => {
    return res.json(data)
  }).catch(err => {
    res.status(500).send(err)
    return null
  })
}

// post premuim user
export const postPremuimEmail = (req, res, next) => {
  const { name, email, premuimEndDate, note } = req.body
  const db = getDb()
  const data = {
    name,
    email,
    premuimEndDate,
    note
  }
  // insert/update data to the database if it is not already there
  db.collection('premuim_emails').findOne({email}).then(user => {
    (user? 
      db.collection('premuim_emails').updateOne({email}, {$set: data})
    : db.collection('premuim_emails').insertOne(data)).then(result => {
      db.collection('users').updateOne({email}, {$set: {isPremuim: true, premuimEndDate, role: "user"}}).then(result => {
        //convert result to a json
        result.modifiedCount > 0? res.json(data): res.json({message: "email added as premuim, but user not found"})
      }).catch(err => {
        res.status(500).send(err)
        return null
      })
      //return res.json(result)
    }).catch(err => {
      res.status(500).send(err)
      return null
    })
  }).catch(err => {
    res.status(500).send(err)
    return null
  })

}

/*
User {
  uuid: string
  name: string
  email: string
  role: "guest" || "user" || "tester" || "modetor" || "admin"
  isPremuim: string
  premuimEndDate: string
  preference: {
    searchPeference: {}
    hiddenTender: {}
    viewedTender: {}
  }
}
*/