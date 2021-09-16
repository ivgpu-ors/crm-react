require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const authMiddleware = require('./middleware/auth');

const app = express();
const port = process.env.PORT ?? 8081;

app.use(express.json());
app.use(cookieParser());
app.use(authMiddleware);

app.get('/api-v2/user', (req, res) => {
  res.send(req.sso.user);
});

app.use('/api-v2/crm', require('./routes/crm'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});