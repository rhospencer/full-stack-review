const bcrypt = require('bcryptjs')

module.exports = {
    async register(req, res) {
        const db = req.app.get('db')
        const {email, password, name} = req.body

        // Check to see if the user has already registered
        const user = await db.find_email(email)
        // If they have, stop the function
        if (user[0]) return res.status(200).send({message: 'Email already in use'})
        // Salt and has the password
        const salt = bcrypt.genSaltSync(10)
        const hash =  bcrypt.hashSync(password, salt)
        // Store the new user in the DB
        const userId = await db.add_user({name, email})
        db.add_hash({user_id: userId[0].user_id, hash}).catch(err => {
            return res.sendStatus(503)
        })
        // Store the new user in sessions
        req.session.user = {email, name, userId: userId[0].user_id, isAdmin: false}
        // Send the session.user object to the front end
        res.status(201).send({message: 'Registered and Logged In!', user: req.session.user, loggedIn: true})
    },

    async login(req, res) {
        const db = req.app.get('db')
        const {email, password} = req.body

        // Check if user exists (and the hash)
        const user = await db.find_user(email)
        // if user does not exist send appropriate response
        if (!user[0]) return res.status(200).send({message: 'Email not found.'})
        // compare hash password and compare
        const result = bcrypt.compareSync(password, user[0].hash)
        // if hashes don't match, send appropriate response
        if (!result) return res.status(200).send({message: 'Incorrect password!'})
        // if they do match, add user to sessions
        const {name, is_admin:isAdmin, user_id:userId} = user[0]
        req.session.user = {email, name, userId, isAdmin}
        res.status(200).send({message: 'Logged In!', user: req.session.user, loggedIn: true})
        // send session.user back to front end
    },

    async logout(req, res) {
        req.session.destroy()
        res.status(200).send({message: 'Logged Out!', loggedIn: false})
    }
}