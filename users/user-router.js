const router = require('express').Router();

const Users = require('./user-model');
const authenticate = require('../auth/authenticate-middleware');

router.get('/',  async (req, res) => {
    try {
        const user = await Users.find();

        res.status(200).json(user);
    } catch (err) {res.status(500).json({ message: "Obvoiusly you're not a golfer", err })}
});

module.exports = router;