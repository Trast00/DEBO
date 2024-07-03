import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import AuthRoutes from './routes/authRoutes.js';



const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* setup */
app.set('view engine','ejs') 
// how to install ejs?
// npm install ejs

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(AuthRoutes)

app.use('/', (req, res) => {
  console.log(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
  res.render('index')
})

app.listen(3000)