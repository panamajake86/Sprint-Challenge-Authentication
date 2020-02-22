const router = require('express').Router();
const bc = require('bcryptjs');

const Users = require('../users/user-model');

router.post('/register', async (req, res) => {
  // implement registration
  const data = req.body;
  data.password = bc.hashSync(data.password, 12);

  try {
    const reg = await Users.add(data);
    res.status(201).json({ message: 'Welcome to the club!', reg });
  } catch (err) {res.status(500).json({ message: 'That rug really tied the room together!', err })}
});

router.post('/login', async (req, res) => {
  // implement login
  const { username, password } = req.body;

  try {
    const log = await Users.findBy({ username });

    if (log && bc.compareSync(password, log.password)) {
      req.session.loggedin = true;
      res.status(200).json({ message: `Hello ${log.username}, glad you could make it!`})
    } else {
      res.status(401).json({ message: 'I can get you a toe, by this afternoon.' })
    }
  } catch (err) {res.status(500).json({ message: 'The Dude abides.', err })}
});

module.exports = router;
