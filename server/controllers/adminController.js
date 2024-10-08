import { getDb } from "../utils/database.js";


export const getModeratorByCredentials = (req, res, next) => {
  console.log("Admin Controller getModeratorByCredentials")
  const db = getDb();
  const { email, password, credential } = req.session.moderator? req.session.moderator : req.body;
  return db.collection('moderators').findOne({ email: email, password: password, credential: credential})
}