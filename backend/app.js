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
import connectRedis from 'connect-redis';
import redis from 'redis';
import dotenv from 'dotenv';
import cors from 'cors'
import { getPremuimEmails, listPremuimUsers } from './controllers/usersController.js';

dotenv.config();

const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
const app = express();
const allowedOrigins = [
  frontendUrl,
  'https://deboinfo.netlify.app', // Production URL
  /\.--deboinfo\.netlify\.app$/ // Regex to allow all Netlify deploy previews
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.some(pattern => typeof pattern === 'string' ? pattern === origin : pattern.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* setup */
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))


// dev env
/*app.use(session({
  secret: process.env.SESSION_SECRET, // Utilisez un secret unique pour votre application
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.DEV === "dev" } // Mettez `secure` à true en production si vous utilisez HTTPS
}));*/

const RedisStore = connectRedis(session);
const redisClient = redis.createClient();
//-momery unleaked--------- PROD
app.set('trust proxy', 1);

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie:{
      secure: true,
      maxAge:60000
        },
  store: new RedisStore({ client: redisClient }),
  secret: 'secret',
  saveUninitialized: true,
  resave: false
}));

app.use(function(req,res,next){
if(!req.session){
    return next(new Error('Oh no in req.session')) //handle error
}
next() //otherwise continue
});

//app.use(AuthRoutes)

app.get('/industryTypes', industryTypeRoute)
app.get('/tenders', tenderRoutes)
app.use(adminRoutes)
app.use(countryRoutes)
app.use(industryTypeRoute)
app.use(tenderRoutes)
app.use(userPreferencesRoutes)
app.use(userRoutes)
app.use("/", (req, res) => {
  console.log("Redirecting to dev url")

  res.render('dev-auth', { devurl: process.env.DEV_URL, email: "email"});
})

mongoConnect(() => {
  getPremuimEmails().then(data => {
    const list = data.filter(user => new Date(user.premuimEndDate) > new Date )
    console.log(list)
    listPremuimUsers.push(...list)
  })
  .catch(err => {
    console.log(err)
  })
  console.log('Connected to the database')
  app.listen(3000)
  console.log('Runnning on port 3000')
})

export default app;