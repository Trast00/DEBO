# Implement Auth0 in Node.js

## Base config
create auth.js file

**1. inside routes/auth.js**
```js
import { auth } from 'express-openid-connect'
import dotenv from 'dotenv';
/* To get access to enviroment variable */
dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
```

**2. inside app.js**
```js
app.use(AuthRoutes)
```

**3. inside .env**
```env
SECRET=secret /*to generate the secret key use: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))" */
BASEURL=http://localhost:3000
CLIENTID=AxN8vwxG0VxcZrUgCPHhsrPZM2n9341B
ISSUER=https://dev-55mbnrswqskpaqpd.us.auth0.com
```

**4. gitignore env file**


## Step2: New features and data

**new routes created automaticaly**
/login
/logout

**In each req now we have access to**
- req.oidc.user : user info
- req.oidc.isAuthenticated() : check if user is authenticated
- req.oidc.idToken : id token
- req.oidc.accessToken : access token
- req.oidc.idTokenClaims : id token claims
- req.oidc.logout() : logout
- req.oidc.error : error
- req.oidc.signIn() : sign in
- req.oidc.signOut() : sign out

```js
app.get('/', (req, res) => {
  req.oidc.isAuthenticated()
});
```