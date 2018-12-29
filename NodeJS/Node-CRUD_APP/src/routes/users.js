const router = require('express').Router()
const user = require('../models/User')
const passport = require('passport')

router.get('/users/signin', (req, res) => {
    res.render('users/signin')
})
router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
})
)

router.get('/users/signup', (req, res) => {
    res.render('users/signup')
})

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body
    const errors = []
    if (name.length <= 0) {
        errors.push({ text: 'Please insert your name' })
    }
    if (email.length <= 0) {
        errors.push({ text: 'Please insert your email' })
    }
    if (password != confirm_password) {
        errors.push({ text: 'Password does not match' })
    }
    if (password.length < 6) {
        errors.push({ text: 'Password must be at least 6 characters' })
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password })
    } else {
        const emailUser = await user.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'The email is already in use')
            return res.redirect('/users/signup')
        }
        const newUser = new user({ name, email, password })
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save()
        req.flash('success_msg', 'You are registered')
        res.redirect('/users/signin')
    }
})

router.get('/users/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})

module.exports = router
