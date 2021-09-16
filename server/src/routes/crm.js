const express = require('express');
const router = express.Router();

const rolesMiddleware = require('../middleware/roles');
const { db } = require('../lib/db.js');

router.use(rolesMiddleware);

router.get('/roles', async (req, res) => {
  const roles = await db.query(`select
    r.id,
    r.name,
    r.\`desc\`,
    count(u.id) as count
from users u
left join role_user ru on ru.user_id = u.id 
left join roles r on r.id = ru.role_id
group by r.id `);

  res.send(roles);
})

router.get('/roles/:role_id/count', async (req, res) => {
  const result = await db.query('select count(user_id) as `count` from role_user where role_id = ?', req.params.role_id);
  res.send(result[0]);
})

module.exports = router;