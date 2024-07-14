import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import AuthRoutes from './routes/auth.js';
import tenderRoutes from './routes/tender.js';
import adminRoutes from './routes/admin.js';
import industryTypeRoute from './routes/industryTypes.js';
import { mongoConnect } from './utils/database.js';
import session from 'express-session';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* setup */
app.set('views engine', 'ejs')
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: process.env.SESSION_SECRET, // Utilisez un secret unique pour votre application
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.DEV === "dev" } // Mettez `secure` à true en production si vous utilisez HTTPS
}));

app.use(AuthRoutes)
app.get('/industryTypes', industryTypeRoute)
app.get('/tenders', tenderRoutes)
app.use(adminRoutes)
app.use(industryTypeRoute)
app.use(tenderRoutes)

mongoConnect(() => {
  console.log("App connected to dicko.dev")
  app.listen(3000)
})