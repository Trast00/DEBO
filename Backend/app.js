import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import AuthRoutes from './routes/auth.js';
import tenderRoutes from './routes/tender.js';
import { mongoConnect } from './utils/database.js';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* setup */
app.set('view engine','ejs') 
// how to install ejs?
// npm install ejs

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', (req, res, next) => {

  console.log((req.oidc && req.oidc.isAuthenticated()) ? 'Logged in' : 'Logged out')
  if (req.oidc && req.oidc.isAuthenticated()) {
    req.userId = req.oidc.user.sid
  }
  /*
  console.log(req.oidc.user)
  {
    sid: 'pf_vuE7gTQAtjKOu9iltZiH2UIOGuZ8d',
    nickname: 'dicko.tester',
    name: 'dicko.tester@gmail.com',
    picture: 'https://s.gravatar.com/avatar/015f22e65286f76971f877b0004cde27?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fdi.png',
    updated_at: '2024-07-06T22:56:28.833Z',
    email: 'dicko.tester@gmail.com',
    email_verified: true,
    sub: 'auth0|667ac6a742af15aa920c997d'
  }
  */
  next()
})

app.use(AuthRoutes)
app.use(tenderRoutes)



mongoConnect(() => {
  console.log("App connected to dicko.dev")
  app.listen(3000)
})