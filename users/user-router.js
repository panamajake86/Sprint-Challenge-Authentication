const router = require('express').Router();

const Users = require('./user-model');
const authenticate = require('../auth/authenticate-middleware');

router.get('/', authenticate, async (req, res) => {
    try {
        const user = await Users.find();

        res.json(user);
    } catch (err) {res.status(500).json({ message: "Obvoiusly you're not a golfer", err })}
});

module.exports = router;