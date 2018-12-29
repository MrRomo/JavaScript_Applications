const express = require('express')
const router = express.Router()
const pool = require('../database') //hace referencia a la base de datos

const passport = require('passport')

const { isLoggedIn, isNotLoggedIn } = require('../lib/auth')

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin')
})
router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next)
})
router.get('/signup', isNotLoggedIn, isNotLoggedIn, (req, res) => {
    res.render('auth/signup')
})
router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/profile', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM links')
    res.render('profile', { links })
})

router.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})



module.exports = router