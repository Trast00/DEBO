import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import userRoutes from './routes/user.js';
import userPreferencesRoutes from './routes/userPreferences.js';
import tenderRoutes from './routes/tender.js';
import countryRoutes from './routes/country.js';
import adminRoutes from './routes/admin.js';
import industryTypeRoute from './routes/industryTypes.js';
import { mongoConnect } from './utils/database.js';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
const app = express();
app.use(cors({
  origin: frontendUrl,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

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

//app.use(AuthRoutes)

app.get('/industryTypes', industryTypeRoute)
app.get('/tenders', tenderRoutes)
app.use(adminRoutes)
app.use(countryRoutes)
app.use(industryTypeRoute)
app.use(tenderRoutes)
app.use(userPreferencesRoutes)
app.use(userRoutes)

mongoConnect(() => {
  console.log('Connected to the database')
  app.listen(3000)
  console.log('Runnning on port 3000')
})