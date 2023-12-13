const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const bcrypt = require('bcrypt')

module.exports = {
    create,
    login,
    checkToken
}

async function create(req, res) {
    try {
        const user = await User.create(req.body)
        const token = createJWT(user);
        res.json(token);
    } catch (err) {
        res.status(400).json(err)
    }
}

function createJWT(user) {
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    )
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(404).json({ message: "User not found" })
        const matchedPassword = await bcrypt.compare(req.body.password, user.password);
        if (!matchedPassword) return res.status(400).json({ message: "Password incorrect" })
        const token = createJWT(user)
        return res.status(200).json(token)
    } catch (err) {
        res.status(500).json(err);
    }
}

function checkToken(req, res){
    console.log('req.user', req.user);
    res.json(req.exp);
}