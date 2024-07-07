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

app.use(AuthRoutes)
app.use(tenderRoutes)

mongoConnect(() => {
  console.log("App connected to dicko.dev")
  app.listen(3000)
})