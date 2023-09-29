import express from 'express';
const app = express();
import path from 'path';
import bodyParser from 'body-parser';
import indexRoutes from './routes/index.js'

//import sequelize from './utils/database.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* setup */
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

/* routes */

app.use('/', indexRoutes)



app.listen(3005)
/*sequelize.sync().then(_ => {
  app.listen(3005)
}).catch(err => {console.log("Sync Error: ", err)})*/
