import { getDb } from "../utils/database.js"

export const getUserData = (req, res, next) => {
    console.log("getting user data")
    // if user is not in the database, add user to the database
    return getUserById(req.oidc.user.sid).then(user => {
      if (user) {
        console.log("user is found in the database: ", user)
        return user
      }
      console.log("user not found in the database")
      // user is not in the database
      // check if user is a premuim user, before adding (we need to add him as it have a uuid) to the database
      return addNewUser(req, res, next).then(result => {
        console.log("user added to the database", result)
        return getUserById(req.oidc.user.sid)
      }).catch(err => {
        console.log("user not added to the database", err)
        return null
      })
    }).catch(err => {
      console.log(err)
      return null
    })
}

// will return a async function
const addNewUser = (req, res, next) => {
  return getPremuimUserByEmail(req.oidc.user.email).then(premiumUser => {
    if (!premiumUser) {
      console.log("user is not a premuim user")
      return postUser({
        uuid: req.oidc.user.sid,
        name: req.oidc.user.nickname,
        email: req.oidc.user.email,
        role: "user",
        isPremuim: false,
        premuimEndDate: "",
        preference: {
          searchPeference: {},
          hiddenTender: {},
          viewedTender: {}
        }
      })
    }
    console.log("user is a premuim user")
    return postUser({
      uuid: req.oidc.user.sid,
      name: req.oidc.user.nickname,
      email: req.oidc.user.email,
      role: "user",
      isPremuim: true,
      premuimEndDate: premiumUser.premuimEndDate,
      preference: {
        searchPeference: {},
        hiddenTender: {},
        viewedTender: {}
      }
    })
  }).catch(err => {
    console.log(err)
    return null
  })
}

export const getUserById = (id) => {
  if (!id || typeof id != "string") throw "Auth get user by id: id string is required"
  const db = getDb()
  return db.collection('users').findOne({uuid: id})
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
export const postUser = ({uuid, name, email, role, isPremuim, premuimEndDate, preference}) => {
  const user = {
    uuid,
    name,
    email,
    role,
    isPremuim,
    premuimEndDate,
    preference
  }
  const db = getDb()
  return db.collection('users').insertOne(user)
  /*.then(result => {
    console.log("user created:", result)
    user._id = result.insertedId
    return user
  }).catch(err => {
    console.log(err)
    return null
  })*/
}

export const getPremuimUserByEmail = (email) => {
  if (!email || typeof email != "string") throw "Auth get premuim user by email: email string is required"
  const db = getDb()
  return db.collection('premium_emails').findOne({email})
  /*.then(user => {
    console.log("user is found as non registered premium user in the database")
    return user
  }).catch(err => {
    console.log("user not found in the database", err)
    return null
  })*/
}