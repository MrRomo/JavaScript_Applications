const express = require('express')
const router = express.Router()
const pool = require('../database') //hace referencia a la base de datos
const  {isLoggedIn} = require('../lib/auth')
router.get('/add', isLoggedIn, (req,res) => {
    res.render('links/add')
})
router.post('/add', isLoggedIn, async (req,res) => {
    const {title,url,description} = req.body
    const newLink = {
        title,
        url,
        description
    };
    await pool.query('INSERT INTO links set ?', [newLink])
    req.flash('success', 'Link guardado satisfactoriamente')    
    res.redirect('/links')
})

router.get('/', isLoggedIn, async (res,req)  => {
    const links = await pool.query('SELECT * FROM links')
    req.render('links/list', {links})
    
})

router.get('/delete/:id', isLoggedIn, async (req,res) => {
    const {id} = req.params
    await pool.query('DELETE FROM links WHERE ID = ?', id)  
    req.flash('success', 'Link eliminado satisfactoriamente')    
    res.redirect('/links')
})
router.get('/edit/:id', isLoggedIn, async (req,res) => {
    const {id} = req.params
    const links = await pool.query('SELECT * FROM links WHERE ID = ?', [id])  
    console.log(links[0]);    
    res.render('links/edit',{links: links[0]})
})
router.post('/edit/:id', isLoggedIn, async (req,res) => {
    const {id} = req.params
    const {title,url,description} = req.body
    const newLink = {
        title,
        url,
        description
    };
    console.log(newLink);
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id])  
    req.flash('success', 'Link editado satisfactoriamente')    
    res.redirect('/links')
})

module.exports = router